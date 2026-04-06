import React from 'react';
import { motion } from 'framer-motion';

const SkeletonBlock = ({ className = '' }) => (
  <motion.div
    className={`bg-white/5 shadow-inner border border-white/5 ${className}`}
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export const DashboardSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <SkeletonBlock className="h-10 w-48 rounded-full" />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((k) => (
          <SkeletonBlock key={k} className="h-32 rounded-[2rem]" />
        ))}
      </div>
      
      <div className="flex items-center gap-4 py-4">
         <SkeletonBlock className="h-8 w-24 rounded-full" />
         <SkeletonBlock className="h-8 w-24 rounded-full" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((k) => (
          <SkeletonBlock key={k} className="h-28 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
};

export const TicketDetailsSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex gap-3">
        <SkeletonBlock className="h-10 w-24 rounded-full" />
        <SkeletonBlock className="h-10 w-24 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SkeletonBlock className="h-80 rounded-3xl" />
        <SkeletonBlock className="h-80 rounded-3xl" />
      </div>

      <SkeletonBlock className="h-48 mt-6 rounded-3xl" />
    </div>
  );
};
