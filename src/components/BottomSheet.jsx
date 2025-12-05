import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart2, Box, ChevronLeft, ChevronRight, Cloud, Code, Columns, Cpu, Database, Eye, FileCode, FileJson, FileText, Folder, GitBranch, Globe, Image, Layout, LayoutGrid, Lightbulb, List, Lock, Server, Settings, Shield, Target, Terminal, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}


const menuItems = [
  // --- SECTION 1: SERVICES & ARCHITECTURE ---
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
           { id: 'gcp', icon: <Globe className="w-5 h-5" />, title: 'Google Cloud', subtitle: 'BigQuery & AI' },
        ]
      },
      {
        id: 'micro',
        icon: <Code className="w-6 h-6" />,
        title: 'Microservices',
        subtitle: 'Containerization and orchestration',
        children: [
            { id: 'k8s', icon: <Server className="w-5 h-5" />, title: 'Kubernetes', subtitle: 'Cluster management' },
            { id: 'docker', icon: <Box className="w-5 h-5" />, title: 'Docker', subtitle: 'Container workflows' },
            { id: 'mesh', icon: <GitBranch className="w-5 h-5" />, title: 'Service Mesh', subtitle: 'Istio & Linkerd' }
        ]
      }
    ]
  },

  // --- SECTION 2: FILE SYSTEM (FILES & FOLDERS) ---
  {
    id: 'project-root',
    icon: <Folder className="w-6 h-6" />,
    title: 'Project Files',
    subtitle: 'Source code and assets',
    children: [
      {
        id: 'src-folder',
        icon: <Folder className="w-6 h-6 text-blue-500" />,
        title: 'src',
        subtitle: 'Source directory',
        children: [
          { 
            id: 'components', 
            icon: <Folder className="w-5 h-5 text-blue-400" />, 
            title: 'components', 
            subtitle: 'UI Building blocks',
            children: [
               { id: 'btn-tsx', icon: <FileCode className="w-4 h-4 text-yellow-500" />, title: 'Button.tsx', subtitle: 'TypeScript Component' },
               { id: 'nav-tsx', icon: <FileCode className="w-4 h-4 text-yellow-500" />, title: 'Navbar.tsx', subtitle: 'TypeScript Component' }
            ]
          },
          { id: 'utils-ts', icon: <FileCode className="w-5 h-5 text-blue-300" />, title: 'helpers.ts', subtitle: 'Utility functions' },
          { id: 'styles-css', icon: <FileCode className="w-5 h-5 text-pink-400" />, title: 'global.css', subtitle: 'Stylesheet' },
        ]
      },
      {
        id: 'assets-folder',
        icon: <Folder className="w-6 h-6 text-green-500" />,
        title: 'assets',
        subtitle: 'Static media',
        children: [
          { id: 'logo-png', icon: <Image className="w-5 h-5 text-purple-500" />, title: 'logo.png', subtitle: 'Brand image' },
          { id: 'hero-jpg', icon: <Image className="w-5 h-5 text-purple-500" />, title: 'background.jpg', subtitle: 'Hero banner' },
        ]
      },
      {
        id: 'config-files',
        icon: <Settings className="w-6 h-6" />,
        title: 'Configuration',
        subtitle: 'Environment setups',
        children: [
          { id: 'pkg-json', icon: <FileJson className="w-5 h-5 text-red-400" />, title: 'package.json', subtitle: 'Dependencies' },
          { id: 'env-file', icon: <FileText className="w-5 h-5 text-gray-500" />, title: '.env.local', subtitle: 'Secrets' },
        ]
      }
    ]
  },

  // --- SECTION 3: MULTIPLE VIEWS & LAYOUTS ---
  {
    id: 'views',
    icon: <Layout className="w-6 h-6" />,
    title: 'Interface Views',
    subtitle: 'Manage layout preferences',
    children: [
      { id: 'kanban', icon: <Columns className="w-6 h-6" />, title: 'Kanban Board', subtitle: 'Drag and drop workflow' },
      { id: 'grid', icon: <LayoutGrid className="w-6 h-6" />, title: 'Grid View', subtitle: 'Card based layout' },
      { id: 'table', icon: <List className="w-6 h-6" />, title: 'List View', subtitle: 'Detailed data rows' },
      { id: 'terminal', icon: <Terminal className="w-6 h-6" />, title: 'Console', subtitle: 'System logs & output' },
    ]
  },

  // --- SECTION 4: STRATEGY & ANALYTICS ---
  {
    id: 'strategy',
    icon: <Target className="w-6 h-6" />,
    title: 'Data Strategy',
    subtitle: 'Data governance and strategy development',
    children: [
      { 
        id: 'security-gov', 
        icon: <Shield className="w-6 h-6" />, 
        title: 'Security Protocols', 
        subtitle: 'Compliance and standards',
        children: [
            { id: 'audit', icon: <Lock className="w-5 h-5" />, title: 'Access Control', subtitle: 'RBAC & IAM' },
            { id: 'pen-test', icon: <Eye className="w-5 h-5" />, title: 'Penetration Testing', subtitle: 'Vulnerability scans' }
        ]
      },
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
git
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed bottom-0 left-0 right-0 z-50",
                  "w-full  mx-auto",
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