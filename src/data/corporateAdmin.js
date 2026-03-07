// Mock data for Corporate Admin features

export const mockBranches = [
  {
    id: 'BR-001',
    name: 'Urban Tadka',
    location: 'Downtown Plaza, Main Street',
    status: 'Active',
    createdAt: '2024-01-15',
    manager: 'Sara Manager',
    phone: '+1-555-0123',
  },
  {
    id: 'BR-002',
    name: 'Sweet Factory',
    location: 'Mall Complex, North Avenue',
    status: 'Active',
    createdAt: '2024-02-20',
    manager: 'John Smith',
    phone: '+1-555-0124',
  },
  {
    id: 'BR-003',
    name: 'PBN Express',
    location: 'Airport Terminal 2',
    status: 'Inactive',
    createdAt: '2024-03-10',
    manager: 'Mike Johnson',
    phone: '+1-555-0125',
  },
];

export const mockExperimentCategories = [
  {
    id: 'CAT-001',
    name: 'Recipe Optimization',
    description: 'Improving existing recipes for better taste and efficiency',
    createdAt: '2024-01-01',
    experimentsCount: 12,
  },
  {
    id: 'CAT-002',
    name: 'Ingredient Substitution',
    description: 'Testing alternative ingredients for cost reduction',
    createdAt: '2024-01-05',
    experimentsCount: 8,
  },
  {
    id: 'CAT-003',
    name: 'Temperature Testing',
    description: 'Optimizing cooking temperatures for consistency',
    createdAt: '2024-01-10',
    experimentsCount: 15,
  },
  {
    id: 'CAT-004',
    name: 'Yield Improvement',
    description: 'Maximizing output from raw materials',
    createdAt: '2024-01-15',
    experimentsCount: 6,
  },
];

export const mockGlobalReports = {
  experimentSuccessRate: {
    current: 78.5,
    previous: 75.2,
    trend: 'up',
    data: [
      { month: 'Jan', rate: 72 },
      { month: 'Feb', rate: 75 },
      { month: 'Mar', rate: 73 },
      { month: 'Apr', rate: 78 },
      { month: 'May', rate: 79 },
      { month: 'Jun', rate: 78.5 },
    ],
  },
  batchFailureRate: {
    current: 12.3,
    previous: 15.8,
    trend: 'down',
    data: [
      { month: 'Jan', rate: 18 },
      { month: 'Feb', rate: 16 },
      { month: 'Mar', rate: 17 },
      { month: 'Apr', rate: 14 },
      { month: 'May', rate: 13 },
      { month: 'Jun', rate: 12.3 },
    ],
  },
  deliveryEfficiency: {
    current: 94.2,
    previous: 91.5,
    trend: 'up',
    data: [
      { month: 'Jan', rate: 89 },
      { month: 'Feb', rate: 91 },
      { month: 'Mar', rate: 90 },
      { month: 'Apr', rate: 93 },
      { month: 'May', rate: 95 },
      { month: 'Jun', rate: 94.2 },
    ],
  },
  supplierQualityIssues: {
    current: 8.7,
    previous: 11.2,
    trend: 'down',
    data: [
      { month: 'Jan', issues: 15 },
      { month: 'Feb', issues: 12 },
      { month: 'Mar', issues: 14 },
      { month: 'Apr', issues: 10 },
      { month: 'May', issues: 9 },
      { month: 'Jun', issues: 8.7 },
    ],
  },
};

export const mockAIActivityLogs = [
  {
    id: 'AI-001',
    eventType: 'Ingredient Alert',
    description: 'Low quality tomatoes detected in Batch #TB-2024-156',
    relatedEntity: 'Inventory',
    entityId: 'INV-007',
    createdAt: '2024-12-15 09:30:00',
    severity: 'High',
  },
  {
    id: 'AI-002',
    eventType: 'Temperature Deviation',
    description: 'Oven temperature exceeded optimal range in Urban Tadka',
    relatedEntity: 'Experiment',
    entityId: 'EXP-045',
    createdAt: '2024-12-15 08:15:00',
    severity: 'Medium',
  },
  {
    id: 'AI-003',
    eventType: 'Delivery Delay Pattern',
    description: 'Recurring delays detected on Route #R-12 during peak hours',
    relatedEntity: 'Delivery',
    entityId: 'DEL-089',
    createdAt: '2024-12-14 16:45:00',
    severity: 'Medium',
  },
  {
    id: 'AI-004',
    eventType: 'Supplier Quality Warning',
    description: 'Quality degradation trend detected for Supplier #SUP-003',
    relatedEntity: 'Supplier',
    entityId: 'SUP-003',
    createdAt: '2024-12-14 14:20:00',
    severity: 'High',
  },
  {
    id: 'AI-005',
    eventType: 'Production Variance',
    description: 'Yield variance exceeds threshold in Sweet Factory',
    relatedEntity: 'Production',
    entityId: 'PROD-234',
    createdAt: '2024-12-14 11:30:00',
    severity: 'Low',
  },
];

export const mockSystemSettings = {
  CRA_AUDIT_MODE: false,
  lastUpdated: '2024-12-15 10:00:00',
  updatedBy: 'Corporate Admin',
};