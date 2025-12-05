import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Lightbulb, BarChart2, ChevronLeft, Server, Shield, Zap, Code, Cloud, Database, Cpu } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. DEFINE HELPER COMPONENTS FIRST (Fixes ReferenceError) ---
const Box = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);

// --- 2. DATA STRUCTURE (Recursive) ---
const menuItems = [
  {
    id: 'arch',
    icon: <Server className="w-6 h-6" />,
    title: 'System Architecture',
    subtitle: 'Scalable system design and planning',
    children: [
      {
        id: 'cloud',
        icon: <Cloud className="w-6 h-6" />,
        title: 'Cloud Infrastructure',
        subtitle: 'AWS, Azure & Google Cloud setup',
        children: [
           { id: 'aws', icon: <Cpu className="w-5 h-5" />, title: 'AWS Solutions', subtitle: 'EC2, Lambda, S3' },
           { id: 'azure', icon: <Database className="w-5 h-5" />, title: 'Azure Managed', subtitle: 'Enterprise integration' },
        ]
      },
      {
        id: 'micro',
        icon: <Code className="w-6 h-6" />,
        title: 'Microservices',
        subtitle: 'Containerization and orchestration',
        children: [
            { id: 'k8s', icon: <Server className="w-5 h-5" />, title: 'Kubernetes', subtitle: 'Cluster management' },
            { id: 'docker', icon: <Box className="w-5 h-5" />, title: 'Docker', subtitle: 'Container workflows' }
        ]
      }
    ]
  },
  {
    id: 'strategy',
    icon: <Target className="w-6 h-6" />,
    title: 'Data Strategy',
    subtitle: 'Data governance and strategy development',
    children: [
      { id: 'gov', icon: <Shield className="w-6 h-6" />, title: 'Governance Protocols', subtitle: 'Compliance and standards' },
      { id: 'opt', icon: <Zap className="w-6 h-6" />, title: 'Optimization', subtitle: 'Workflow efficiency' },
    ]
  },
  {
    id: 'analytics',
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Advanced Analytics',
    subtitle: 'Machine learning and predictive analytics',
    children: [
      { id: 'pred', icon: <BarChart2 className="w-6 h-6" />, title: 'Predictive Modeling', subtitle: 'Forecast future trends' },
    ]
  },
];

const BottomSheet = ({ open, onOpenChange }) => {
  // HISTORY STACK: Stores the path of clicked items. [] = Root.
  const [history, setHistory] = useState([]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  // Reset state when closing
  useEffect(() => {
    if (!open) {
      setTimeout(() => setHistory([]), 300);
    }
  }, [open]);

  // Derived state: What list to show?
  const currentView = history.length === 0 
    ? menuItems 
    : history[history.length - 1].children || [];

  const handleNext = (item) => {
    if (item.children) {
      setDirection(1);
      setHistory([...history, item]);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      setDirection(-1);
      setHistory(history.slice(0, -1)); // Pop last item
    } else {
      onOpenChange(false); // Close sheet
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/30 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => onOpenChange(false)}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed bottom-0 left-0 right-0 z-50",
                  "w-full max-w-[500px] mx-auto",
                  "bg-white rounded-t-[30px]",
                  "shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]",
                  "flex flex-col max-h-[90vh] outline-none overflow-hidden"
                )}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.05}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) onOpenChange(false);
                }}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">Navigation</Dialog.Description>

                {/* HEADER */}
                <div className="flex-none pt-3 px-6 pb-2 z-10 bg-white">
                  <div className="w-full flex justify-center mb-3">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full opacity-50 cursor-grab active:cursor-grabbing" />
                  </div>
                  
                  <button
                    onClick={handleBack}
                    className="flex items-center text-gray-500 font-medium text-[15px] -ml-2 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-0.5" />
                    Back
                  </button>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 overflow-y-auto px-6 pb-10 no-scrollbar relative">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={history.length}
                      custom={direction}
                      variants={{
                        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                      className="w-full"
                    >
                      {currentView.map((item, index) => (
                        <div key={item.id || index}>
                          <button 
                            onClick={() => handleNext(item)}
                            className="group flex items-center w-full py-4 text-left px-3 -mx-3 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all duration-200"
                          >
                            <div className="flex-shrink-0 text-gray-600 mr-4 group-hover:text-blue-600 transition-colors">
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-[16px] font-semibold text-gray-900 leading-tight truncate">
                                {item.title}
                              </h3>
                              {item.subtitle && (
                                <p className="text-[13px] text-gray-400 leading-snug mt-1 line-clamp-2">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            
                            {/* Chevron only shows if nested items exist */}
                            {item.children && (
                              <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-300 ml-2" />
                            )}
                          </button>
                          
                          {/* Separator line */}
                          {index < currentView.length - 1 && (
                            <div className="ml-[52px] h-px bg-gray-100" />
                          )}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default BottomSheet;