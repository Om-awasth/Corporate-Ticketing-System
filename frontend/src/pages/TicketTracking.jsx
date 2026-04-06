import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ticketAPI } from '../services';
import { toast } from 'react-toastify';
import { FiSearch, FiClock, FiFilter, FiActivity, FiArrowUpRight } from 'react-icons/fi';

const TicketTracking = () => {
  const { isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const response = isAdmin ? await ticketAPI.getAllTickets() : await ticketAPI.getMyTickets();
        setTickets(response.data.data || response.data);
      } catch (error) {
        toast.error('Failed to load tracking data');
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return tickets.filter((ticket) => {
      const textMatch =
        ticket.title?.toLowerCase().includes(query.toLowerCase()) ||
        ticket._id?.toLowerCase().includes(query.toLowerCase());
      const statusMatch = status === 'All' ? true : ticket.status === status;
      return textMatch && statusMatch;
    });
  }, [tickets, query, status]);

  const statusTone = {
    Open: 'bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/20',
    'In Progress': 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/20',
    Resolved: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20',
    Closed: 'bg-slate-400/20 text-slate-200 ring-1 ring-slate-300/20',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          <FiActivity className="mr-2 inline" /> Ticket Tracking View
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Track every ticket lifecycle</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
          Search by ticket id/title and monitor progress from Open to In Progress to Resolved in one dedicated tracking view.
        </p>
      </div>

      <div className="glass-panel mb-6 rounded-3xl p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ticket title or ticket id"
              className="soft-input pl-11"
            />
          </div>
          <div className="relative">
            <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="soft-input pl-11">
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel rounded-3xl p-8 text-center text-slate-300">Loading tracking data...</div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel rounded-3xl p-8 text-center text-slate-300">No tickets matched your tracking filters.</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((ticket) => (
            <div key={ticket._id} className="glass-panel rounded-3xl p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Ticket #{ticket._id?.slice(-6)}</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{ticket.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{ticket.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusTone[ticket.status] || 'bg-white/10 text-white'}`}>
                    {ticket.status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-200">
                    {ticket.priority}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><FiClock /> Created: {new Date(ticket.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(ticket.updatedAt || ticket.createdAt).toLocaleString()}</span>
                <span>Owner: {ticket.createdBy?.username || 'Unknown'}</span>
                <Link to={`/tickets/${ticket._id}`} className="inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-100">
                  Open details <FiArrowUpRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketTracking;
