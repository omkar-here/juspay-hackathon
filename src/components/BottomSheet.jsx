import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Lightbulb, BarChart2, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Data Strategy',
    subtitle: 'Data governance and strategy development',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Advanced Analytics',
    subtitle: 'Machine learning and predictive analytics',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Business Intelligence',
    subtitle: 'BI platform implementation and optimization',
  },
];

const BottomSheet = ({ open, onOpenChange }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          /* NO PORTAL: Renders directly in the container */
          <>
            {/* 1. Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="absolute inset-0 bg-black/20 z-40" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            {/* 2. Sheet Content */}
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "absolute bottom-0 left-0 right-0 z-50", 
                  "bg-white rounded-t-[30px] overflow-hidden",
                  "shadow-[0_-5px_40px_-15px_rgba(0,0,0,0.1)] outline-none"
                )}
                // Animation settings
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
                // Drag to dismiss logic
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) onOpenChange(false);
                }}
              >
                {/* Grabber Handle */}
                <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                  <div className="w-10 h-1.5 bg-gray-300 rounded-full opacity-60" />
                </div>

                {/* Header */}
                <div className="flex items-center px-6 pb-2">
                  <button
                    onClick={() => onOpenChange(false)}
                    className="flex items-center text-gray-500 font-medium text-[15px] -ml-2 hover:text-gray-800 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-0.5" />
                    Back
                  </button>
                </div>

                {/* Menu Items */}
                <div className="px-6 pb-12 pt-2">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      <button className="group flex items-center w-full py-4 text-left active:scale-[0.99] active:opacity-70 transition-all">
                        <div className="text-gray-600 mr-4 group-hover:text-blue-600 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[16px] font-semibold text-gray-900 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-[13px] text-gray-400 leading-tight mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 ml-2" />
                      </button>
                      
                      {index < menuItems.length - 1 && (
                        <div className="ml-[40px] h-px bg-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default BottomSheet;