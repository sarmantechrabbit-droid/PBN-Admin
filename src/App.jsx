import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { rolePermissions } from './utils/rolePermissions';
import DashboardLayout from './layouts/DashboardLayout';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ExperimentCreate from './pages/ExperimentCreate';
import ExperimentHistory from './pages/ExperimentHistory';
import InventoryEntry from './pages/InventoryEntry';
import InventoryMonitor from './pages/InventoryMonitor';
import OrderLogging from './pages/OrderLogging';
import DeliveryLogging from './pages/DeliveryLogging';
import AIInsights from './pages/AIInsights';
import AuditViewer from './pages/AuditViewer';
import CustomerFeedback from './pages/CustomerFeedback';
import BranchManagementPage from './pages/BranchManagementPage';
import ExperimentCategoriesPage from './pages/ExperimentCategoriesPage';
import GlobalReportsPage from './pages/GlobalReportsPage';
import AuditModePage from './pages/AuditModePage';
import AIActivityLogsPage from './pages/AIActivityLogsPage';

function getDefaultPage() {
  return 'dashboard';
}

function resolvePageForRole(page, role) {
  const perms = rolePermissions[role] || {};
  const pageGuards = {
    dashboard: true,
    'experiment-create': perms.canCreateExperiment,
    'experiment-history': perms.canViewExperiments,
    'inventory-entry': perms.canAddInventory,
    'inventory-monitor': perms.canViewInventory,
    orders: perms.canViewOrders || perms.canLogOrders,
    deliveries: perms.canViewDeliveries || perms.canLogDeliveries,
    'ai-insights': perms.canViewAIInsights,
    audit: perms.canViewAudit,
    'customer-feedback': perms.canViewCustomerFeedback || perms.canCreateCustomerFeedback,
    'admin/branches': perms.canManageBranches,
    'admin/experiment-categories': perms.canManageExperimentCategories,
    'admin/global-reports': perms.canViewGlobalReports,
    'admin/audit-mode': perms.canManageAuditMode,
    'admin/ai-activity-logs': perms.canViewAIActivityLogs,
  };
  return pageGuards[page] ? page : 'dashboard';
}

function AppContent() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    if (user) {
      setActivePage(getDefaultPage());
    }
  }, [user]);

  function handleNavigate(page) {
    const safe = resolvePageForRole(page, user?.role);
    setActivePage(safe);
  }

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoginPage />
        </motion.div>
      </AnimatePresence>
    );
  }

  const pageProps = { user };

  const pages = {
    dashboard: <Dashboard {...pageProps} />,
    'experiment-create': <ExperimentCreate {...pageProps} />,
    'experiment-history': <ExperimentHistory {...pageProps} />,
    'inventory-entry': <InventoryEntry {...pageProps} />,
    'inventory-monitor': <InventoryMonitor {...pageProps} />,
    orders: <OrderLogging {...pageProps} />,
    deliveries: <DeliveryLogging {...pageProps} />,
    'ai-insights': <AIInsights {...pageProps} />,
    audit: <AuditViewer {...pageProps} />,
    'customer-feedback': <CustomerFeedback {...pageProps} />,
    'admin/branches': <BranchManagementPage {...pageProps} />,
    'admin/experiment-categories': <ExperimentCategoriesPage {...pageProps} />,
    'admin/global-reports': <GlobalReportsPage {...pageProps} />,
    'admin/audit-mode': <AuditModePage {...pageProps} />,
    'admin/ai-activity-logs': <AIActivityLogsPage {...pageProps} />,
  };

  return (
    <DashboardLayout
      user={user}
      onLogout={logout}
      activePage={activePage}
      onNavigate={handleNavigate}
    >
      {pages[activePage] || <Dashboard {...pageProps} />}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
