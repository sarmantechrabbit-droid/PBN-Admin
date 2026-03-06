import { useState } from 'react';
import { Bell, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const roleBadgeColors = {
  Admin: 'bg-primary-light text-primary-text',
  Manager: 'bg-secondary-light text-secondary-text',
  Chef: 'bg-accent-light text-accent-text',
  'Warehouse Staff': 'bg-success-light text-success-text',
  'Delivery Staff': 'bg-warning-light text-warning-text',
  Auditor: 'bg-slate-100 text-slate-700',
};

const mockNotifications = [
  { id: 1, msg: 'EXP-003 failed temperature check', time: '10 min ago', type: 'error' },
  { id: 2, msg: 'INV-007 Black Truffle batch damaged', time: '1 hr ago', type: 'warning' },
  { id: 3, msg: 'DEL-503 route delayed by 22 min', time: '2 hr ago', type: 'warning' },
  { id: 4, msg: 'EXP-004 approved by manager', time: '3 hr ago', type: 'success' },
];

export default function Topbar({ user, onLogout, pageTitle }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const badgeClass = roleBadgeColors[user?.role] || 'bg-slate-100 text-slate-700';

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 shrink-0">
      <div>
        <h2 className="text-base font-semibold text-slate-800 capitalize">
          {pageTitle?.replace(/-/g, ' ') || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition text-slate-500"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-700">Notifications</p>
                </div>
                {mockNotifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50 transition border-b border-slate-50 last:border-0">
                    <p className="text-sm text-slate-700">{n.msg}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.avatar || 'U'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name || 'User'}</p>
              <p className={`text-xs font-semibold px-1.5 py-0.5 rounded-full inline-block ${badgeClass}`}>
                {user?.role || 'Role'}
              </p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{user?.department}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
