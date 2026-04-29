import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import TicketUpdate from '../models/TicketUpdate.js';

dotenv.config();

const users = [
  {
    username: 'admin',
    email: 'admin@helpdesk.com',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    username: 'alice',
    email: 'alice@helpdesk.com',
    password: 'User@12345',
    role: 'employee',
  },
  {
    username: 'bob',
    email: 'bob@helpdesk.com',
    password: 'User@12345',
    role: 'employee',
  },
  {
    username: 'charlie',
    email: 'charlie@helpdesk.com',
    password: 'User@12345',
    role: 'employee',
  },
];

const ticketSeeds = [
  {
    title: 'VPN connection keeps dropping',
    description: 'Remote VPN disconnects every 10 to 15 minutes and interrupts access to internal services.',
    priority: 'High',
    status: 'In Progress',
    ownerEmail: 'alice@helpdesk.com',
    assignedEmail: 'admin@helpdesk.com',
    updates: [
      { status: 'Open', comment: 'Reported by employee after repeated disconnects.' },
      { status: 'In Progress', comment: 'IT is checking VPN gateway logs and client configuration.' },
    ],
  },
  {
    title: 'Laptop battery drains unusually fast',
    description: 'Work laptop loses charge in under an hour even after a full battery calibration.',
    priority: 'Medium',
    status: 'Open',
    ownerEmail: 'bob@helpdesk.com',
    assignedEmail: 'admin@helpdesk.com',
    updates: [
      { status: 'Open', comment: 'Battery health issue logged for hardware review.' },
    ],
  },
  {
    title: 'Email signature missing on mobile',
    description: 'Outlook mobile app is not appending the standard signature on outgoing messages.',
    priority: 'Low',
    status: 'Resolved',
    ownerEmail: 'charlie@helpdesk.com',
    assignedEmail: 'admin@helpdesk.com',
    closedByEmail: 'charlie@helpdesk.com',
    updates: [
      { status: 'Open', comment: 'Signature template issue reproduced on mobile device.' },
      { status: 'Resolved', comment: 'Mobile profile refreshed and signature settings re-synced.' },
    ],
  },
  {
    title: 'Office printer queue stuck',
    description: 'Print jobs remain in queue and do not reach the floor printer during peak hours.',
    priority: 'High',
    status: 'Closed',
    ownerEmail: 'alice@helpdesk.com',
    assignedEmail: 'admin@helpdesk.com',
    closedByEmail: 'alice@helpdesk.com',
    updates: [
      { status: 'Open', comment: 'Multiple print jobs are pending in the queue.' },
      { status: 'In Progress', comment: 'Printer spooler restarted and queue cleared.' },
      { status: 'Resolved', comment: 'Test print succeeded after driver refresh.' },
      { status: 'Closed', comment: 'Employee confirmed the issue is fully resolved.' },
    ],
  },
  {
    title: 'Shared drive access request',
    description: 'New hire needs access to the finance shared drive for monthly reporting work.',
    priority: 'Medium',
    status: 'Open',
    ownerEmail: 'charlie@helpdesk.com',
    assignedEmail: 'admin@helpdesk.com',
    updates: [
      { status: 'Open', comment: 'Access request waiting for approval from finance lead.' },
    ],
  },
];

const seedDemoData = async () => {
  try {
    await connectDB();

    const userMap = new Map();

    for (const seed of users) {
      let user = await User.findOne({ email: seed.email });

      if (user) {
        user.username = seed.username;
        user.role = seed.role;
        user.password = seed.password;
        await user.save();
      } else {
        user = await User.create(seed);
      }

      userMap.set(seed.email, user);
    }

    for (const seed of ticketSeeds) {
      const owner = userMap.get(seed.ownerEmail);
      const assignee = userMap.get(seed.assignedEmail);
      const closer = seed.closedByEmail ? userMap.get(seed.closedByEmail) : null;

      let ticket = await Ticket.findOne({ title: seed.title, createdBy: owner._id });

      if (!ticket) {
        ticket = await Ticket.create({
          title: seed.title,
          description: seed.description,
          priority: seed.priority,
          status: seed.status,
          createdBy: owner._id,
          assignedTo: assignee?._id,
          closedBy: closer?._id,
          closedAt: seed.status === 'Closed' ? new Date() : undefined,
        });
      } else {
        ticket.description = seed.description;
        ticket.priority = seed.priority;
        ticket.status = seed.status;
        ticket.assignedTo = assignee?._id;
        ticket.closedBy = closer?._id;
        ticket.closedAt = seed.status === 'Closed' ? ticket.closedAt || new Date() : undefined;
        await ticket.save();

        await TicketUpdate.deleteMany({ ticketId: ticket._id });
      }

      for (const updateSeed of seed.updates) {
        await TicketUpdate.create({
          ticketId: ticket._id,
          updatedBy: updateSeed.status === 'Closed' && closer ? closer._id : assignee?._id || owner._id,
          status: updateSeed.status,
          comment: updateSeed.comment,
        });
      }
    }

    console.log('Demo data seeded successfully.');
    console.log('Users: admin@helpdesk.com, alice@helpdesk.com, bob@helpdesk.com, charlie@helpdesk.com');
    console.log('Tickets: 5 sample tickets with status history');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed demo data:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDemoData();
