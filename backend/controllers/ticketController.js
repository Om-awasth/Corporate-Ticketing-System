import Ticket from '../models/Ticket.js';
import TicketUpdate from '../models/TicketUpdate.js';
import { predictTicketPriority } from '../utils/mlPriority.js';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
export const createTicket = async (req, res, next) => {
  try {
    // We ignore req.body.priority since our ML model will compute it.
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Please provide title and description' });
    }

    // Predict priority dynamically using the local ML pipeline
    const mlPriority = await predictTicketPriority(title, description);

    const ticket = new Ticket({
      title,
      description,
      priority: mlPriority,
      status: status || 'Open',
      createdBy: req.userId,
    });

    await ticket.save();
    await ticket.populate('createdBy', 'username email');

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tickets (admin only) or my tickets
// @route   GET /api/tickets
// @access  Private
export const getAllTickets = async (req, res, next) => {
  try {
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.userId);

    let query = {};
    if (user.role !== 'admin') {
      query = { createdBy: req.userId };
    } else {
      // Keep closed tickets out of the default admin queue.
      const includeClosed = req.query.includeClosed === 'true';
      if (!includeClosed) {
        query.status = { $ne: 'Closed' };
      }
    }

    const tickets = await Ticket.find(query)
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email')
      .populate('closedBy', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email')
      .populate('closedBy', 'username email');

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
export const updateTicket = async (req, res, next) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Check authorization
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.userId);

    if (user.role !== 'admin' && ticket.createdBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this ticket' });
    }

    // Update fields
    if (req.body.title) ticket.title = req.body.title;
    if (req.body.description) ticket.description = req.body.description;
    if (req.body.priority) ticket.priority = req.body.priority;
    if (req.body.status) {
      const nextStatus = req.body.status;

      // Closure is an employee confirmation step after resolution.
      if (nextStatus === 'Closed') {
        if (user.role === 'admin') {
          return res.status(403).json({ success: false, message: 'Admin cannot close tickets. Employee must confirm closure.' });
        }
        if (ticket.createdBy.toString() !== req.userId) {
          return res.status(403).json({ success: false, message: 'Only ticket owner can close this ticket' });
        }
        if (ticket.status !== 'Resolved') {
          return res.status(400).json({ success: false, message: 'Ticket must be Resolved before it can be Closed' });
        }

        ticket.closedBy = req.userId;
        ticket.closedAt = new Date();
      }

      // Handle Reopen logic
      if (ticket.status === 'Resolved' && nextStatus === 'Open') {
        ticket.isReopened = true;
      }
      // If admin moves it out of Open, clear the reopened flag
      if (nextStatus === 'In Progress' || nextStatus === 'Resolved' || nextStatus === 'Closed') {
        ticket.isReopened = false;
      }

      ticket.status = nextStatus;
    }
    if (req.body.assignedTo) ticket.assignedTo = req.body.assignedTo;

    await ticket.save();
    await ticket.populate('createdBy', 'username email');
    await ticket.populate('assignedTo', 'username email');
    await ticket.populate('closedBy', 'username email');

    // Create update record if status changed
    if (req.body.status) {
      await TicketUpdate.create({
        ticketId: ticket._id,
        updatedBy: req.userId,
        status: req.body.status,
        comment: req.body.comment || '',
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
export const deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Check authorization
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.userId);

    if (user.role !== 'admin' && ticket.createdBy.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this ticket' });
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Ticket deleted',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my tickets
// @route   GET /api/tickets/my-tickets
// @access  Private
export const getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.userId })
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email')
      .populate('closedBy', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};
