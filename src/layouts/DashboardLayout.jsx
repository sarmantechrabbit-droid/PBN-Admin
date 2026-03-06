import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { getNavItems } from '../utils/rolePermissions';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function DashboardLayout({ user, onLogout, activePage, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = getNavItems(user?.role);

  const pageLabel = navItems.find((n) => n.key === activePage)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        activePage={activePage}
        onNavigate={onNavigate}
        navItems={navItems}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar user={user} onLogout={onLogout} pageTitle={pageLabel} />
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
