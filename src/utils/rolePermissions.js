export const ROLES = {
  CORPORATE_ADMIN: 'Corporate Admin',
  UNIT_MANAGER: 'Unit Manager',
  CHEF: 'Chef',
  ORDER_LOGGER: 'Order Logger',
  QUALITY_REVIEWER: 'Quality Reviewer',
  FEEDBACK_COLLECTOR: 'Customer Feedback Collector',
  CRA_AUDITOR: 'CRA Auditor',
};

export const rolePermissions = {
  'Corporate Admin': {
    canViewDashboard: true,
    canViewExperiments: false,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: false,
    canAddInventory: false,
    canViewOrders: false,
    canLogOrders: false,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: true,
    canAssignChefs: false,
    canEdit: false,
    canManageBranches: true,
    canManageExperimentCategories: true,
    canViewAIActivityLogs: true,
    canManageAuditMode: true,
    canViewCustomerFeedback: false,
    canApproveExperiment: false,
    canRejectExperiment: false,
    canDeleteExperiment: false,
    canModifyExperiment: false,
    canOverrideReviewer: false,
  },
  'Unit Manager': {
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
    canAssignReviewers: true,
    canConfigureMetadata: true,
    canEdit: true,
    canViewCustomerFeedback: true,
    canApproveExperiment: false,
    canRejectExperiment: false,
    canDeleteExperiment: false,
    canModifyExperiment: false,
    canOverrideReviewer: false,
  },
  'Chef': {
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
    canViewCustomerFeedback: false,
    canApproveExperiment: false,
    canRejectExperiment: false,
    canDeleteExperiment: false,
    canModifyExperiment: true,
    canOverrideReviewer: false,
  },
  'Order Logger': {
    canViewDashboard: true,
    canViewExperiments: false,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: false,
    canAddInventory: false,
    canViewOrders: true,
    canLogOrders: true,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: true,
    canViewCustomerFeedback: false,
    canApproveExperiment: false,
    canRejectExperiment: false,
    canDeleteExperiment: false,
    canModifyExperiment: false,
    canOverrideReviewer: false,
    canDeleteOrderLogs: false,
  },
  'Quality Reviewer': {
    canViewDashboard: true,
    canViewExperiments: true,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: false,
    canAddInventory: false,
    canViewOrders: false,
    canLogOrders: false,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: true,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: false,
    canViewCustomerFeedback: false,
    canApproveExperiment: true,
    canRejectExperiment: true,
    canDeleteExperiment: false,
    canModifyExperiment: false,
    canOverrideReviewer: false,
    canAddReviewerRemarks: true,
  },
  'Customer Feedback Collector': {
    canViewDashboard: true,
    canViewExperiments: false,
    canCreateExperiment: false,
    canSubmitExperiment: false,
    canViewInventory: false,
    canAddInventory: false,
    canViewOrders: true,
    canLogOrders: false,
    canViewDeliveries: false,
    canLogDeliveries: false,
    canViewAIInsights: false,
    canViewAudit: false,
    canViewGlobalReports: false,
    canAssignChefs: false,
    canEdit: true,
    canViewCustomerFeedback: true,
    canCreateCustomerFeedback: true,
    canApproveExperiment: false,
    canRejectExperiment: false,
    canDeleteExperiment: false,
    canModifyExperiment: false,
    canOverrideReviewer: false,
    canDeleteFeedback: false,
  },
  'CRA Auditor': {
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
    canViewCustomerFeedback: true,
    canApproveExperiment: false,
    canRejectExperiment: false,
    canDeleteExperiment: false,
    canModifyExperiment: false,
    canOverrideReviewer: false,
    canViewChronologyTimeline: true,
    canViewVersionHistory: true,
    canViewApprovalRecords: true,
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
  
  if (perms.canViewCustomerFeedback || perms.canCreateCustomerFeedback) {
    items.push({ key: 'customer-feedback', label: 'Customer Feedback' });
  }
  
  if (perms.canViewAudit) {
    items.push({ key: 'audit', label: 'Audit Viewer' });
  }

  if (perms.canManageBranches || perms.canManageExperimentCategories || perms.canViewGlobalReports || perms.canManageAuditMode || perms.canViewAIActivityLogs) {
    if (perms.canManageBranches) {
      items.push({ key: 'admin/branches', label: 'Branch Management' });
    }
    if (perms.canManageExperimentCategories) {
      items.push({ key: 'admin/experiment-categories', label: 'Experiment Categories' });
    }
    if (perms.canViewGlobalReports) {
      items.push({ key: 'admin/global-reports', label: 'Global Reports' });
    }
    if (perms.canManageAuditMode) {
      items.push({ key: 'admin/audit-mode', label: 'CRA Audit Mode' });
    }
    if (perms.canViewAIActivityLogs) {
      items.push({ key: 'admin/ai-activity-logs', label: 'AI Activity Logs' });
    }
  }

  return items;
}

export function canPerformAction(role, action) {
  const perms = rolePermissions[role] || {};
  return perms[action] || false;
}

export function getRoleRestrictions(role) {
  const restrictions = {
    'Corporate Admin': {
      readOnly: false,
      cannotModifyExperiments: true,
      cannotDeleteExperiments: true,
      cannotApproveExperiments: true,
    },
    'Unit Manager': {
      readOnly: false,
      cannotModifyExperiments: true,
      cannotDeleteExperiments: true,
      cannotApproveExperiments: true,
    },
    'Chef': {
      readOnly: false,
      cannotModifyAfterSubmission: true,
      cannotDeleteAfterSubmission: true,
      cannotApproveExperiments: true,
    },
    'Order Logger': {
      readOnly: false,
      cannotModifyExperiments: true,
      cannotDeleteOrderLogs: true,
      cannotApproveExperiments: true,
    },
    'Quality Reviewer': {
      readOnly: false,
      cannotModifyExperiments: true,
      cannotDeleteExperiments: true,
      canApproveExperiments: true,
    },
    'Customer Feedback Collector': {
      readOnly: false,
      cannotModifyExperiments: true,
      cannotDeleteFeedback: true,
      cannotApproveExperiments: true,
    },
    'CRA Auditor': {
      readOnly: true,
      cannotModifyAnything: true,
      cannotDeleteAnything: true,
      cannotApproveAnything: true,
    },
  };
  
  return restrictions[role] || {
    readOnly: false,
    cannotModifyAnything: false,
    cannotDeleteAnything: false,
    cannotApproveAnything: false,
  };
}