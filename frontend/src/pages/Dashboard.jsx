import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ticketAPI } from '../services';
import { toast } from 'react-toastify';
import TicketCard from '../components/TicketCard';
import { DashboardSkeleton } from '../components/SkeletonLoaders';
import { FiActivity, FiCheckCircle, FiClock, FiAlertTriangle, FiPlus, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion(Link);

const Dashboard = ({ viewType = 'auto' }) => {
  const { user, isAdmin } = useAuth();
  const inAdminView = viewType === 'admin' ? true : viewType === 'employee' ? false : isAdmin;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchTickets();
  }, [inAdminView]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = inAdminView
        ? await ticketAPI.getAllTickets()
        : await ticketAPI.getMyTickets();
      setTickets(response.data.data || response.data);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch tickets';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filterStatus === 'All') return true;
    return ticket.status === filterStatus;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
  };

  const statCards = [
    { label: 'Total tickets', value: stats.total, icon: FiActivity, tone: 'from-cyan-500/20 to-blue-500/20', accent: 'text-cyan-200' },
    { label: 'Open', value: stats.open, icon: FiAlertTriangle, tone: 'from-amber-500/20 to-orange-500/20', accent: 'text-amber-200' },
    { label: 'In progress', value: stats.inProgress, icon: FiClock, tone: 'from-violet-500/20 to-fuchsia-500/20', accent: 'text-violet-200' },
    { label: 'Resolved', value: stats.resolved, icon: FiCheckCircle, tone: 'from-emerald-500/20 to-teal-500/20', accent: 'text-emerald-200' },
  ];

  const completionRate = stats.total === 0 ? 0 : Math.round((stats.closed / stats.total) * 100);

  const statusWithCounts = [
    { label: 'All', count: stats.total },
    { label: 'Open', count: stats.open },
    { label: 'In Progress', count: stats.inProgress },
    { label: 'Resolved', count: stats.resolved },
    { label: 'Closed', count: stats.closed },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  if (loading && tickets.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <DashboardSkeleton />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <motion.div variants={itemVariants}>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <FiActivity className="mr-2 inline" /> {inAdminView ? 'Admin workspace' : 'My support workspace'}
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {inAdminView ? 'Command center for support' : 'Track and manage your tickets'}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Welcome back{user?.username ? `, ${user.username}` : ''}. Stay on top of activity with quick filters, live totals, and clear ticket states.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchTickets}
            className="soft-button-secondary self-start"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </motion.button>
          {!inAdminView && (
            <MotionLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              to="/create-ticket"
              className="soft-button-primary self-start"
            >
              <FiPlus /> New ticket
            </MotionLink>
          )}
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, tone, accent }, i) => (
          <motion.div
            key={label}
            className={`glass-panel rounded-3xl bg-gradient-to-br ${tone} p-5`}
            whileHover={{ scale: 1.03, y: -4 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-white">
                <Icon size={18} />
              </div>
              <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent}`}>{label}</div>
            </div>
            <div className="mt-6 text-4xl font-semibold text-white">
              {/* To make it alive, one could extract this to an animated counter component, but for now simple value */}
              {value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap gap-2">
        {statusWithCounts.map(({ label, count }) => (
          <motion.button
            key={label}
            onClick={() => setFilterStatus(label)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
              filterStatus === label
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/30'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {label} <span className="ml-2 rounded-full bg-slate-950/30 px-2 py-0.5 text-xs">{count}</span>
          </motion.button>
        ))}
        </div>

        <motion.div
          className="glass-panel rounded-3xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><FiTrendingUp /> Resolution progress</span>
            <span className="font-semibold text-cyan-200">{completionRate}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">Based on closed tickets out of total tickets in the current list.</p>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} layout className="mt-8">
        {loading ? (
          <div className="glass-panel rounded-3xl p-8 text-center text-slate-300">Refreshing tickets...</div>
        ) : filteredTickets.length === 0 ? (
          <motion.div
            className="glass-panel rounded-3xl p-8 text-center text-slate-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>{filterStatus === 'All' ? 'No tickets yet' : `No ${filterStatus.toLowerCase()} tickets`}</p>
            {!inAdminView && (
              <MotionLink
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                to="/create-ticket"
                className="soft-button-primary mt-4 inline-flex"
              >
                <FiPlus /> Create your first ticket
              </MotionLink>
            )}
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-4">
            <AnimatePresence>
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <TicketCard ticket={ticket} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
