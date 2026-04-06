import TicketUpdate from '../models/TicketUpdate.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

// @desc    Add update to ticket
// @route   POST /api/ticket-updates/:ticketId
// @access  Private
export const addUpdate = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { status, comment } = req.body;
    const user = await User.findById(req.userId);

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Create update
    const update = new TicketUpdate({
      ticketId,
      updatedBy: req.userId,
      status,
      comment,
    });

    await update.save();
    await update.populate('updatedBy', 'username email');

    // Update ticket status if provided
    if (status) {
      if (status === 'Closed') {
        if (user?.role === 'admin') {
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

      ticket.status = status;
      await ticket.save();
    }

    res.status(201).json({
      success: true,
      data: update,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all updates for a ticket
// @route   GET /api/ticket-updates/:ticketId
// @access  Private
export const getUpdates = async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    const updates = await TicketUpdate.find({ ticketId })
      .populate('updatedBy', 'username email')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: updates,
    });
  } catch (error) {
    next(error);
  }
};
