import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import { FiArrowRight, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success('Login successful!');
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
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={itemVariants} className="glass-panel hidden rounded-[2rem] p-8 lg:flex lg:flex-col lg:justify-between">
          <motion.div>
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Secure access
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white drop-shadow-md">
              Welcome back to the helpdesk workspace.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Log in to monitor tickets, respond faster, and keep every support request moving.
            </p>
          </motion.div>

          <motion.div className="mt-10 grid gap-4" variants={containerVariants}>
            {[
              ['Fast triage', 'See open issues instantly.'],
              ['Role-aware', 'Employee and admin views stay focused.'],
              ['Always on', 'Designed for daily internal support.'],
            ].map(([title, body], i) => (
              <motion.div
                key={title}
                variants={itemVariants}
                custom={i}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition-all hover:bg-slate-900/60"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="flex items-center gap-2 text-white">
                  <FiLock className="text-cyan-300" /> {title}
                </div>
                <p className="mt-1 text-sm text-slate-400">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-cyan-400/5 blur-2xl"></div>
          <div className="mb-8 relative z-10">
            <h2 className="text-3xl font-semibold tracking-tight text-white">Sign in</h2>
            <p className="mt-2 text-sm text-slate-400">Access your dashboard and ongoing support queues.</p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="relative z-10">
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
                    placeholder="Enter your password"
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="soft-button-primary mt-2 w-full"
                >
                  {loading ? 'Logging in...' : 'Login'} <FiArrowRight />
                </motion.button>
              </Form>
            )}
          </Formik>

          <motion.p variants={itemVariants} className="mt-6 text-center text-sm text-slate-400 relative z-10">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
              Register here
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
