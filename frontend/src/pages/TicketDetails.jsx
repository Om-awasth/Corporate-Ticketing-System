import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ticketAPI, ticketUpdateAPI } from '../services';
import { FiArrowLeft, FiClock, FiMessageCircle, FiRefreshCw, FiSave } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { TicketDetailsSkeleton } from '../components/SkeletonLoaders';
import MagneticWrapper from '../components/MagneticWrapper';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('Open');
  const [comment, setComment] = useState('');

  const loadTicketDetails = async () => {
    try {
      setLoading(true);
      const [ticketRes, updatesRes] = await Promise.all([
        ticketAPI.getTicketById(id),
        ticketUpdateAPI.getUpdates(id),
      ]);

      const ticketData = ticketRes.data.data || ticketRes.data;
      setTicket(ticketData);
      setStatus(ticketData.status || 'Open');
      setUpdates(updatesRes.data.data || updatesRes.data || []);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load ticket details';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicketDetails();
  }, [id]);

  const handleSave = async () => {
    if (!ticket) return;

    try {
      setSaving(true);
      await ticketAPI.updateTicket(ticket._id, {
        status,
        comment,
      });

      toast.success('Ticket updated successfully');
      setComment('');
      await loadTicketDetails();
      
      if (status === 'Resolved' || status === 'Closed') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#10b981', '#f43f5e'],
          disableForReducedMotion: true
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update ticket';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const statusTone = {
    Open: 'bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/20',
    'In Progress': 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-300/20',
    Resolved: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20',
    Closed: 'bg-slate-400/20 text-slate-200 ring-1 ring-slate-300/20',
  };

  const getAllowedStatuses = () => {
    if (ticket?.status === 'Closed') {
      return ['Closed'];
    }

    if (isAdmin) {
      return ['Open', 'In Progress', 'Resolved'];
    } else {
      // Employees cannot select In Progress or Resolved. 
      // They can only maintain the current status or close a resolved ticket.
      const allowed = [ticket?.status || 'Open'];
      const isOwner = ticket?.createdBy?._id === user?.id;
      
      if (isOwner && ticket?.status === 'Resolved') {
        allowed.push('Closed');
        allowed.push('Open'); // Allow reopening
      }
      
      return [...new Set(allowed)];
    }
  };

  if (loading && !ticket) {
    return <TicketDetailsSkeleton />;
  }

  if (!ticket) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 text-center text-slate-300">Ticket not found.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <button onClick={() => navigate(-1)} className="soft-button-secondary">
          <FiArrowLeft /> Back
        </button>
        <button onClick={loadTicketDetails} className="soft-button-secondary">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel rounded-3xl p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Ticket #{ticket._id?.slice(-6)}</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">{ticket.title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">{ticket.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusTone[ticket.status] || 'bg-white/10 text-white'}`}>
              {ticket.status}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-200">
              {ticket.priority} priority
            </span>
            {ticket.isReopened && (
              <span className="rounded-full border border-rose-500/30 bg-rose-500/15 px-3 py-1 text-sm font-semibold text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse">
                REOPENED
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-2 text-sm text-slate-400">
            <div>Created by: {ticket.createdBy?.username || 'Unknown'}</div>
            <div>Created at: {new Date(ticket.createdAt).toLocaleString()}</div>
            <div>Last update: {new Date(ticket.updatedAt || ticket.createdAt).toLocaleString()}</div>
            {ticket.closedBy ? <div>Closed by: {ticket.closedBy?.username || 'Unknown'}</div> : null}
            {ticket.closedAt ? <div>Closed at: {new Date(ticket.closedAt).toLocaleString()}</div> : null}
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">Update ticket</h2>
          <p className="mt-2 text-sm text-slate-400">Change ticket status and add a progress note.</p>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-200">Status</label>
            {getAllowedStatuses().length === 1 ? (
              <div className="soft-input flex items-center bg-slate-900/50 text-slate-400 cursor-not-allowed border-white/5 shadow-none">
                {status}
              </div>
            ) : (
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="soft-input">
                {getAllowedStatuses().map((value) => {
                  let displayValue = value;
                  if (value === 'Closed' && ticket?.status !== 'Closed') displayValue = 'Close Ticket (Resolved)';
                  if (value === 'Open' && ticket?.status === 'Resolved' && !isAdmin) displayValue = 'Reopen Ticket (Issue remains)';
                  return (
                    <option key={value} value={value}>
                      {displayValue}
                    </option>
                  );
                })}
              </select>
            )}
            <p className="mt-2 text-xs text-slate-400">
              Admin resolves issues. Ticket owner (employee) confirms final closure after it is Resolved.
            </p>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-200">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="soft-input min-h-28 resize-y"
              placeholder="Add work notes, actions taken, or resolution details"
            />
          </div>

          <MagneticWrapper className="mt-4 w-full" strength={0.15}>
            <button onClick={handleSave} disabled={saving} className="soft-button-primary w-full">
              <FiSave /> {saving ? 'Saving...' : 'Save Update'}
            </button>
          </MagneticWrapper>

          <Link to="/ticket-tracking" className="soft-button-secondary mt-3 inline-flex w-full justify-center">
            Open tracking view
          </Link>
        </section>
      </div>

      <section className="glass-panel mt-6 rounded-3xl p-6">
        <h2 className="text-xl font-semibold text-white">Update timeline</h2>
        {updates.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">No updates yet.</p>
        ) : (
          <motion.div 
            className="mt-4 space-y-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {updates.map((update, index) => (
              <motion.div 
                key={update._id} 
                className="rounded-2xl border border-white/10 bg-slate-950/45 p-4"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                }}
              >
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className={`rounded-full px-2 py-1 ${statusTone[update.status] || 'bg-white/10 text-slate-200'}`}>
                    {update.status || 'Status unchanged'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400"><FiClock /> {new Date(update.updatedAt).toLocaleString()}</span>
                </div>
                <div className="mt-2 text-sm text-slate-300">By: {update.updatedBy?.username || 'Unknown'}</div>
                {update.comment ? (
                  <p className="mt-2 inline-flex items-start gap-2 text-sm text-slate-300"><FiMessageCircle className="mt-0.5" /> {update.comment}</p>
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default TicketDetails;
