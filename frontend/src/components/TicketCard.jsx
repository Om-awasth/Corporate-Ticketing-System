import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowUpRight } from 'react-icons/fi';

const TicketCard = ({ ticket, onStatusChange }) => {
  const statusColors = {
    Open: 'bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/20',
    'In Progress': 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/20',
    Resolved: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20',
    Closed: 'bg-slate-400/20 text-slate-200 ring-1 ring-slate-300/20',
  };

  const priorityColors = {
    Low: 'text-slate-300',
    Medium: 'text-amber-200',
    High: 'text-rose-200',
  };

  return (
    <Link to={`/tickets/${ticket._id}`} className="block">
    <div className="glass-panel group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Ticket #{ticket._id?.slice(-6)}</div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{ticket.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{ticket.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColors[ticket.status]}`}>
            {ticket.status}
          </span>
          <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold ${priorityColors[ticket.priority]}`}>
            {ticket.priority} priority
          </span>
          {ticket.isReopened && (
            <span className="rounded-full border border-rose-500/30 bg-rose-500/15 px-3 py-1 text-sm font-semibold text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.35)] animate-pulse">
              REOPENED
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <span className="inline-flex items-center gap-2"><FiCalendar /> {new Date(ticket.createdAt).toLocaleDateString()}</span>
          <span className="inline-flex items-center gap-2"><FiUser /> {ticket.createdBy?.username || 'Unknown'}</span>
        </div>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition group-hover:text-cyan-100">
          View details <FiArrowUpRight />
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TicketCard;
