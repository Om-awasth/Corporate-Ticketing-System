import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ticketAPI } from '../services';
import FormInput from '../components/FormInput';
import MagneticWrapper from '../components/MagneticWrapper';
import { FiArrowRight, FiSend, FiClock, FiShield, FiCheckCircle } from 'react-icons/fi';

const ticketSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required')
});

const CreateTicket = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await ticketAPI.createTicket({
        ...values,
        status: 'Open',
      });
      toast.success('Ticket created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="mb-8">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <FiSend className="mr-2 inline" /> New support request
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Create support ticket</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Keep requests concise, clear, and actionable so the support team can respond quickly.
            </p>
          </div>

          <Formik
            initialValues={{
              title: '',
              description: ''
            }}
            validationSchema={ticketSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <FormInput
                  label="Title"
                  name="title"
                  placeholder="Brief title of your issue"
                />

                <FormInput
                  label="Description"
                  name="description"
                  type="textarea"
                  placeholder="Describe the issue in detail..."
                />
                <p className="-mt-3 mb-5 text-right text-xs text-slate-400">
                  {values.description.length} characters
                </p>

                <div className="mb-6 rounded-2xl border border-indigo-300/20 bg-indigo-500/10 p-4 text-sm text-indigo-200">
                  <span className="font-semibold text-indigo-300">✨ AI Priority Assignment: </span>
                  Your ticket's priority (Low, Medium, High) will be automatically evaluated by our intelligent ML model based on the title and description you provide.
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <MagneticWrapper className="flex-1 w-full" strength={0.4}>
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="soft-button-primary w-full"
                    >
                      {loading ? 'Creating...' : 'Create Ticket'} <FiArrowRight />
                    </button>
                  </MagneticWrapper>
                  <MagneticWrapper className="flex-1 w-full" strength={0.4}>
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="soft-button-secondary w-full"
                    >
                      Cancel
                    </button>
                  </MagneticWrapper>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <aside className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white">Before you submit</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            A detailed and well-prioritized request helps your support team respond faster with fewer follow-ups.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-center gap-2 text-cyan-200">
                <FiCheckCircle /> Clear title
              </div>
              <p className="mt-2 text-sm text-slate-400">Summarize the issue in one specific sentence.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-center gap-2 text-emerald-200">
                <FiClock /> Response expectations
              </div>
              <p className="mt-2 text-sm text-slate-400">High priority requests are triaged first for urgent impact.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-center gap-2 text-amber-200">
                <FiShield /> Security & traceability
              </div>
              <p className="mt-2 text-sm text-slate-400">All updates are tracked with ownership and status history.</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
            Tip: Include steps to reproduce and any error messages to reduce resolution time.
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateTicket;
