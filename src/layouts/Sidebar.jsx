import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FlaskConical,
  History,
  PackagePlus,
  Boxes,
  ShoppingCart,
  Truck,
  Sparkles,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
} from 'lucide-react';

const iconMap = {
  dashboard: LayoutDashboard,
  'experiment-create': FlaskConical,
  'experiment-history': History,
  'inventory-entry': PackagePlus,
  'inventory-monitor': Boxes,
  orders: ShoppingCart,
  deliveries: Truck,
  'ai-insights': Sparkles,
  audit: ClipboardList,
};

export default function Sidebar({ collapsed, onToggle, activePage, onNavigate, navItems }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-sidebar text-white shrink-0 overflow-hidden z-20"
      style={{ minWidth: collapsed ? 72 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-hover">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <UtensilsCrossed size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-bold text-white leading-tight whitespace-nowrap">PBN Restaurant</p>
              <p className="text-xs text-gray-400 whitespace-nowrap">Admin System</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = iconMap[item.key] || LayoutDashboard;
          const isActive = activePage === item.key;

          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Tooltip on collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-sidebar-hover text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-[72px] w-7 h-7 rounded-full bg-sidebar-hover border-2 border-sidebar flex items-center justify-center hover:bg-primary transition z-30"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
