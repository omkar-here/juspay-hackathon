import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Lightbulb, BarChart2, ChevronLeft, Server, Shield, Zap, Code } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 1. DATA STRUCTURE: Added 'details' array to each item
const menuItems = [
  {
    id: 'strategy',
    icon: <Target className="w-6 h-6" />,
    title: 'Data Strategy',
    subtitle: 'Data governance and strategy development',
    details: [
      { icon: <Code className="w-5 h-5" />, title: 'Governance Protocols', subtitle: 'Compliance and standards' },
      { icon: <Shield className="w-5 h-5" />, title: 'Security Framework', subtitle: 'End-to-end protection' },
      { icon: <Zap className="w-5 h-5" />, title: 'Optimization', subtitle: 'Workflow efficiency' },
    ]
  },
  {
    id: 'analytics',
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Advanced Analytics',
    subtitle: 'Machine learning and predictive analytics',
    details: [
      { icon: <Server className="w-5 h-5" />, title: 'Predictive Modeling', subtitle: 'Forecast future trends' },
      { icon: <BarChart2 className="w-5 h-5" />, title: 'Real-time Reporting', subtitle: 'Live dashboards' },
    ]
  },
  {
    id: 'bi',
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Business Intelligence',
    subtitle: 'BI platform implementation and optimization',
    details: [
      { icon: <Target className="w-5 h-5" />, title: 'Market Analysis', subtitle: 'Competitor tracking' },
      { icon: <Lightbulb className="w-5 h-5" />, title: 'Consumer Insights', subtitle: 'Behavioral patterns' },
    ]
  },
];

const BottomSheet = ({ open, onOpenChange }) => {
  // 2. STATE: Track which item is currently selected (null = Main View)
  const [selectedItem, setSelectedItem] = useState(null);

  // Reset navigation when sheet closes
  useEffect(() => {
    if (!open) setTimeout(() => setSelectedItem(null), 300);
  }, [open]);

  // 3. HANDLER: Smart Back Button
  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null); // Go back to main list
    } else {
      onOpenChange(false); // Close the sheet
    }
  };

  // 4. ANIMATION VARIANTS (iOS Slide Effect)
  const slideVariants = {
    initial: (isDeep) => ({
      x: isDeep ? '100%' : '-100%', // Slide in from right if going deep, left if going back
      opacity: 0
    }),
    animate: { x: '0%', opacity: 1 },
    exit: (isDeep) => ({
      x: isDeep ? '-100%' : '100%', // Slide out to left if going deep, right if going back
      opacity: 0
    })
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
                  "flex flex-col max-h-[90vh] outline-none overflow-hidden" // overflow-hidden is key for sliding
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
                <Dialog.Description className="sr-only">Navigation options</Dialog.Description>

                {/* STATIC HEADER (Stays put while content slides) */}
                <div className="flex-none pt-3 px-6 pb-2 z-10 bg-white">
                  <div className="w-full flex justify-center mb-3">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full opacity-50 cursor-grab active:cursor-grabbing" />
                  </div>
                  
                  <button
                    onClick={handleBack}
                    className="flex items-center text-gray-500 font-medium text-[15px] -ml-2 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-0.5" />
                    {selectedItem ? 'Back' : 'Close'}
                  </button>
                </div>

                {/* DYNAMIC CONTENT AREA */}
                <div className="flex-1 overflow-y-auto px-6 pb-10 no-scrollbar relative">
                  <AnimatePresence mode="wait" custom={!!selectedItem}>
                    
                    {/* VIEW 1: MAIN MENU */}
                    {!selectedItem ? (
                      <motion.div
                        key="main-menu"
                        custom={false} // Direction indicator
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
                        className="w-full"
                      >
                         {/* <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-2">Services</h2> */}
                        {menuItems.map((item, index) => (
                          <div key={item.id}>
                            <button 
                              onClick={() => setSelectedItem(item)} // CLICK TRIGGER
                              className="group flex items-center w-full py-4 text-left active:scale-[0.98] transition-all"
                            >
                              <div className="flex-shrink-0 text-gray-600 mr-4 group-hover:text-blue-600 transition-colors">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0 pr-2">
                                <h3 className="text-[16px] font-semibold text-gray-900 leading-tight truncate">
                                  {item.title}
                                </h3>
                                <p className="text-[13px] text-gray-400 leading-snug mt-1 line-clamp-2">
                                  {item.subtitle}
                                </p>
                              </div>
                              <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-300 ml-2" />
                            </button>
                            {index < menuItems.length - 1 && <div className="ml-[40px] h-px bg-gray-100" />}
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      /* VIEW 2: DETAILS (NESTED) */
                      <motion.div
                        key="details-view"
                        custom={true} // Direction indicator
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
                        className="w-full"
                      >
                        {/* Title of selected section
                        <div className="mb-6 mt-2">
                           <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                           <p className="text-gray-500 text-sm mt-1">Specific solutions available</p>
                        </div> */}

                        {/* Detail Items */}
                        {selectedItem.details.map((detail, idx) => (
                          <div key={idx} className="mb-4">
                            <div className="flex items-center w-full p-4 bg-gray-50 rounded-2xl">
                              <div className="flex-shrink-0 text-blue-600 mr-4 bg-white p-2 rounded-full shadow-sm">
                                {detail.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-[15px] font-semibold text-gray-900">
                                  {detail.title}
                                </h3>
                                <p className="text-[13px] text-gray-500 mt-0.5">
                                  {detail.subtitle}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

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