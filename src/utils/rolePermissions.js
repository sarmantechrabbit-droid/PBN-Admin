export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  CHEF: 'Chef',
  WAREHOUSE: 'Warehouse Staff',
  DELIVERY: 'Delivery Staff',
  AUDITOR: 'Auditor',
};

export const rolePermissions = {
  Admin: {
    canViewDashboard: true,
    canViewExperiments: true,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: true,
    canAddInventory: false,
    canViewOrders: true,
    canLogOrders: false,
    canViewDeliveries: true,
    canLogDeliveries: false,
    canViewAIInsights: true,
    canViewAudit: true,
    canViewGlobalReports: true,
    canAssignChefs: false,
    canEdit: true,
  },
  Manager: {
    canViewDashboard: true,
    canViewExperiments: true,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: true,
    canAddInventory: false,
    canViewOrders: true,
    canLogOrders: false,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: true,
    canEdit: true,
  },
  Chef: {
    canViewDashboard: true,
    canViewExperiments: true,
    canCreateExperiment: true,
    canSubmitExperiment: true,
    canViewInventory: false,
    canAddInventory: false,
    canViewOrders: false,
    canLogOrders: false,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: true,
  },
  'Warehouse Staff': {
    canViewDashboard: true,
    canViewExperiments: false,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: true,
    canAddInventory: true,
    canViewOrders: false,
    canLogOrders: false,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: true,
  },
  'Delivery Staff': {
    canViewDashboard: true,
    canViewExperiments: false,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: false,
    canAddInventory: false,
    canViewOrders: false,
    canLogOrders: false,
    canViewDeliveries: true,
    canLogDeliveries: true,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: true,
  },
  Auditor: {
    canViewDashboard: true,
    canViewExperiments: true,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: true,
    canAddInventory: false,
    canViewOrders: true,
    canLogOrders: false,
    canViewDeliveries: true,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: true,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: false,
  },
};

export function getNavItems(role) {
  const perms = rolePermissions[role] || {};
  const items = [];

  if (perms.canViewDashboard) items.push({ key: 'dashboard', label: 'Dashboard' });
  if (perms.canViewExperiments && perms.canCreateExperiment) {
    items.push({ key: 'experiment-create', label: 'Create Experiment' });
  }
  if (perms.canViewExperiments) {
    items.push({ key: 'experiment-history', label: 'Experiment History' });
  }
  if (perms.canAddInventory) {
    items.push({ key: 'inventory-entry', label: 'Inventory Entry' });
  }
  if (perms.canViewInventory) {
    items.push({ key: 'inventory-monitor', label: 'Inventory Monitor' });
  }
  if (perms.canLogOrders || perms.canViewOrders) {
    items.push({ key: 'orders', label: 'Orders' });
  }
  if (perms.canLogDeliveries || perms.canViewDeliveries) {
    items.push({ key: 'deliveries', label: 'Deliveries' });
  }
  if (perms.canViewAIInsights) {
    items.push({ key: 'ai-insights', label: 'AI Insights' });
  }
  if (perms.canViewAudit) {
    items.push({ key: 'audit', label: 'Audit Viewer' });
  }

  return items;
}
