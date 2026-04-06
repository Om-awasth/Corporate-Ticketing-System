import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import { FiArrowRight, FiShield, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = values;
      await register({ ...registerData, role: 'employee' });
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Cannot reach server. Please make sure backend and MongoDB are running.';
      toast.error(message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_26%)]" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={itemVariants} className="glass-panel rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-emerald-400/5 blur-2xl"></div>
          <div className="mb-8 relative z-10">
            <div className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              New account
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl drop-shadow-md">
              Create your helpdesk access in seconds.
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Start submitting requests, tracking updates, and keeping your team aligned.
            </p>
          </div>

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="relative z-10">
                <motion.div variants={itemVariants}>
                  <FormInput
                    label="Username"
                    name="username"
                    placeholder="Choose a username"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password (min 6 characters)"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="soft-button-primary mt-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-950/30"
                >
                  {loading ? 'Registering...' : 'Register'} <FiArrowRight />
                </motion.button>
              </Form>
            )}
          </Formik>

          <motion.p variants={itemVariants} className="mt-6 text-center text-sm text-slate-400 relative z-10">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Login here
            </Link>
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel hidden rounded-[2rem] p-8 lg:flex lg:flex-col lg:justify-between">
          <motion.div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Designed for internal teams
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white drop-shadow-sm">
              A cleaner workflow for request intake.
            </h3>
          </motion.div>

          <motion.div className="grid gap-4" variants={containerVariants}>
            {[
              ['Employee-friendly', 'Simple request submission with priority and clear feedback.'],
              ['Admin-ready', 'Prepared for triage, assignment, and status updates.'],
              ['Secure by default', 'JWT auth and protected routes across the app.'],
            ].map(([title, body], i) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition-all hover:bg-slate-900/60 hover:border-emerald-300/20"
                whileHover={{ scale: 1.02, x: -5 }}
              >
                <div className="flex items-center gap-2 text-white">
                  {title === 'Secure by default' ? <FiShield className="text-emerald-300" /> : <FiUsers className="text-cyan-300" />} {title}
                </div>
                <p className="mt-1 text-sm text-slate-400">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
