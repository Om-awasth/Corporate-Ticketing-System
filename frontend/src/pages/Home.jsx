import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCheckCircle,
  FiActivity,
  FiCpu,
  FiUsers,
  FiTrendingUp,
  FiLayers,
  FiTarget,
  FiClock,
  FiBarChart2,
} from 'react-icons/fi';

const MotionLink = motion(Link);

const Home = () => {
  const { isAuthenticated } = useAuth();

  const capabilities = [
    { title: 'Unified request intake', description: 'Collect IT, HR, and operations requests in one streamlined queue.', icon: FiLayers },
    { title: 'Smart routing logic', description: 'Automatically direct tickets by category, urgency, and ownership.', icon: FiTarget },
    { title: 'SLA-led execution', description: 'Set deadlines, watch breach risks, and keep accountability visible.', icon: FiClock },
    { title: 'Operational analytics', description: 'Track throughput, response times, and backlog health in real time.', icon: FiBarChart2 },
  ];

  const useCases = [
    { title: 'IT Service Desk', copy: 'Incident triage, device issues, access requests, and escalation workflows.', icon: FiCpu },
    { title: 'HR Operations', copy: 'Employee lifecycle queries, policy support, and confidential case management.', icon: FiUsers },
    { title: 'Business Support', copy: 'Cross-team requests from finance, facilities, and internal operations.', icon: FiTrendingUp },
  ];

  const impactStats = [
    { label: 'Faster first response', value: '42%' },
    { label: 'SLA compliance uplift', value: '31%' },
    { label: 'Lower operational overhead', value: '27%' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-floaty absolute left-[-80px] top-8 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl mix-blend-screen" />
        <div className="animate-floaty absolute right-[-80px] top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl mix-blend-screen" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_78%)]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={itemVariants}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-md">
              <FiActivity /> Enterprise request orchestration
            </div>

            <h1 className="display-title max-w-3xl text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
              One platform for tickets,
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-200 to-emerald-200 bg-clip-text text-transparent drop-shadow-xl">
                speed, control, and clarity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Build a modern support operation that unifies service requests, enforces priorities, and gives every team real-time visibility.
            </p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isAuthenticated ? (
                <MotionLink
                  to="/dashboard"
                  className="soft-button-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open dashboard <FiArrowRight />
                </MotionLink>
              ) : (
                <>
                  <MotionLink
                    to="/login"
                    className="soft-button-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login <FiArrowRight />
                  </MotionLink>
                  <MotionLink
                    to="/register"
                    className="soft-button-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create account
                  </MotionLink>
                </>
              )}
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Multi-department support', 'IT, HR, and operations in one queue'],
                ['Role-based governance', 'Control access and ownership across teams'],
                ['Live service insights', 'Measure throughput and response quality'],
              ].map(([title, copy]) => (
                <motion.div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-sm transition-all hover:bg-slate-900/60 hover:border-white/20"
                  whileHover={{ y: -4 }}
                >
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <div className="mt-1 text-sm text-slate-400">{copy}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              className="mesh-ring glass-panel rounded-[2rem] p-6 sm:p-8"
              whileHover={{ rotateY: 2, rotateX: 2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Service performance</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">Command snapshot</h3>
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300"
                >
                  live
                </motion.span>
              </div>

              <div className="space-y-3">
                {impactStats.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4 backdrop-blur-md"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.02, x: 5, backgroundColor: 'rgba(15, 23, 42, 0.7)' }}
                  >
                    <div className="text-sm text-slate-400">{item.label}</div>
                    <div className="mt-1 text-4xl font-semibold text-white">{item.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
                Designed to replace fragmented tools with one enterprise-grade workflow.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section variants={itemVariants} className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Core capabilities</p>
            <h2 className="section-heading mt-3 text-white">Built for enterprise ticket management</h2>
            <p className="section-subtitle">
              Your team gets the speed of a modern SaaS interface with the discipline of enterprise operations.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  className="rounded-3xl border border-white/5 bg-slate-950/40 p-5"
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(34, 211, 238, 0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="inline-flex rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">Use cases</p>
            <h2 className="section-heading mt-3">One system, multiple support functions</h2>
            <div className="mt-6 space-y-4">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="rounded-2xl border border-white/5 bg-slate-950/40 p-4"
                    whileHover={{ x: 10, backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Icon className="text-cyan-300" />
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{item.copy}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-amber-300">Business outcomes</p>
            <h2 className="section-heading mt-3">Impact leadership teams can measure</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {impactStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-white/5 bg-slate-950/40 p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 p-5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 text-cyan-200">
                <FiCheckCircle />
                <span className="font-semibold">Designed for modern enterprise teams</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Replace slow email chains and disconnected tools with one clear, accountable support workflow.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[2rem] border-cyan-300/20 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-emerald-500/10 p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200">Start now</p>
              <h2 className="display-title mt-3 text-4xl font-semibold text-white sm:text-5xl">
                Upgrade your support desk into a strategic platform.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                Launch your modern ticketing workspace with real-time visibility, SLA control, and cleaner collaboration.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <MotionLink
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="soft-button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated ? 'Go to dashboard' : 'Create account'} <FiArrowRight />
              </MotionLink>
              <MotionLink
                to={isAuthenticated ? '/create-ticket' : '/login'}
                className="soft-button-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated ? 'Raise a ticket' : 'Login'}
              </MotionLink>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
