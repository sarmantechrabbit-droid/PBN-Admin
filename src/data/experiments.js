export const experiments = [
  {
    id: 'EXP-001',
    name: 'Spiced Lamb Rendang V3',
    recipeVersion: 'v3.2',
    date: '2025-12-01',
    status: 'Approved',
    chef: 'Aryan Malik',
    assignedChef: 'Aryan Malik',
    assignedReviewer: 'Dr. Sarah Chen',
    batchId: 'BATCH-001',
    temperatureLog: 180,
    ingredientLotNumber: 'LOT-2024-001',
    batchNumbers: ['BTH-2201', 'BTH-2202'],
    temperature: 180,
    cookingTime: 240,
    expectedYield: '15kg',
    expectedTexture: 'Tender, pull-apart',
    reviewerRemarks: 'Excellent consistency. Approved for production.',
    successRate: 96,
    chronology: [
      { event: 'Experiment Created', timestamp: '2025-12-01 08:30', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Ingredients Logged', timestamp: '2025-12-01 09:15', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Cooking Parameters Recorded', timestamp: '2025-12-01 12:45', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Experiment Submitted', timestamp: '2025-12-01 14:20', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Reviewer Assigned', timestamp: '2025-12-01 15:00', userRole: 'Unit Manager', user: 'System' },
      { event: 'Review Completed', timestamp: '2025-12-02 10:30', userRole: 'Quality Reviewer', user: 'Dr. Sarah Chen' }
    ],
    versionHistory: [
      { version: 'v1.0', modifiedBy: 'Aryan Malik', changeDescription: 'Experiment created', date: '2025-12-01' },
      { version: 'v2.0', modifiedBy: 'Aryan Malik', changeDescription: 'Metadata added', date: '2025-12-01' },
      { version: 'v3.2', modifiedBy: 'Aryan Malik', changeDescription: 'Submitted for review', date: '2025-12-01' }
    ],
    approvalRecords: [
      { reviewerName: 'Dr. Sarah Chen', decision: 'Approved', remarks: 'Excellent consistency. Approved for production.', date: '2025-12-02' }
    ]
  },
  {
    id: 'EXP-002',
    name: 'Herb Crusted Chicken V1',
    recipeVersion: 'v1.0',
    date: '2025-12-03',
    status: 'Under Review',
    chef: 'Farida Haidari',
    assignedChef: 'Farida Haidari',
    assignedReviewer: 'Marcus Rodriguez',
    batchId: 'BATCH-002',
    temperatureLog: 200,
    ingredientLotNumber: 'LOT-2024-002',
    batchNumbers: ['BTH-2205'],
    temperature: 200,
    cookingTime: 90,
    expectedYield: '12kg',
    expectedTexture: 'Crispy exterior, juicy interior',
    reviewerRemarks: 'Awaiting texture analysis.',
    successRate: null,
    chronology: [
      { event: 'Experiment Created', timestamp: '2025-12-03 09:00', userRole: 'Chef', user: 'Farida Haidari' },
      { event: 'Ingredients Logged', timestamp: '2025-12-03 09:30', userRole: 'Chef', user: 'Farida Haidari' },
      { event: 'Cooking Parameters Recorded', timestamp: '2025-12-03 11:15', userRole: 'Chef', user: 'Farida Haidari' },
      { event: 'Experiment Submitted', timestamp: '2025-12-03 13:45', userRole: 'Chef', user: 'Farida Haidari' },
      { event: 'Reviewer Assigned', timestamp: '2025-12-03 14:00', userRole: 'Unit Manager', user: 'System' }
    ],
    versionHistory: [
      { version: 'v1.0', modifiedBy: 'Farida Haidari', changeDescription: 'Initial experiment created and submitted', date: '2025-12-03' }
    ],
    approvalRecords: []
  },
  {
    id: 'EXP-003',
    name: 'Saffron Rice Pilaf V2',
    recipeVersion: 'v2.1',
    date: '2025-12-05',
    status: 'Failed',
    chef: 'Tariq Hussain',
    assignedChef: 'Tariq Hussain',
    assignedReviewer: 'Lisa Thompson',
    batchId: 'BATCH-003',
    temperatureLog: 100,
    ingredientLotNumber: 'LOT-2024-003',
    batchNumbers: ['BTH-2198', 'BTH-2199'],
    temperature: 100,
    cookingTime: 30,
    expectedYield: '20kg',
    expectedTexture: 'Fluffy, separate grains',
    reviewerRemarks: 'Over-cooked due to temperature variance. Re-attempt required.',
    successRate: 40,
    chronology: [
      { event: 'Experiment Created', timestamp: '2025-12-05 07:45', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Ingredients Logged', timestamp: '2025-12-05 08:20', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Cooking Parameters Recorded', timestamp: '2025-12-05 10:30', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Experiment Submitted', timestamp: '2025-12-05 12:15', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Reviewer Assigned', timestamp: '2025-12-05 13:00', userRole: 'Unit Manager', user: 'System' },
      { event: 'Review Completed', timestamp: '2025-12-06 09:45', userRole: 'Quality Reviewer', user: 'Lisa Thompson' }
    ],
    versionHistory: [
      { version: 'v1.0', modifiedBy: 'Tariq Hussain', changeDescription: 'Experiment created', date: '2025-12-05' },
      { version: 'v2.0', modifiedBy: 'Tariq Hussain', changeDescription: 'Temperature parameters adjusted', date: '2025-12-05' },
      { version: 'v2.1', modifiedBy: 'Tariq Hussain', changeDescription: 'Submitted for review', date: '2025-12-05' }
    ],
    approvalRecords: [
      { reviewerName: 'Lisa Thompson', decision: 'Rejected', remarks: 'Over-cooked due to temperature variance. Re-attempt required.', date: '2025-12-06' }
    ]
  },
  {
    id: 'EXP-004',
    name: 'Mango Chili Glaze V5',
    recipeVersion: 'v5.0',
    date: '2025-12-08',
    status: 'Approved',
    chef: 'Aryan Malik',
    assignedChef: 'Aryan Malik',
    assignedReviewer: 'David Kim',
    batchId: 'BATCH-004',
    temperatureLog: 160,
    ingredientLotNumber: 'LOT-2024-004',
    batchNumbers: ['BTH-2210'],
    temperature: 160,
    cookingTime: 45,
    expectedYield: '8kg',
    expectedTexture: 'Sticky, glossy coat',
    reviewerRemarks: 'Perfect balance. Approved.',
    successRate: 98,
    chronology: [
      { event: 'Experiment Created', timestamp: '2025-12-08 10:00', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Ingredients Logged', timestamp: '2025-12-08 10:30', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Cooking Parameters Recorded', timestamp: '2025-12-08 11:45', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Experiment Submitted', timestamp: '2025-12-08 14:00', userRole: 'Chef', user: 'Aryan Malik' },
      { event: 'Reviewer Assigned', timestamp: '2025-12-08 14:15', userRole: 'Unit Manager', user: 'System' },
      { event: 'Review Completed', timestamp: '2025-12-09 11:20', userRole: 'Quality Reviewer', user: 'David Kim' }
    ],
    versionHistory: [
      { version: 'v1.0', modifiedBy: 'Aryan Malik', changeDescription: 'Initial glaze experiment', date: '2025-12-08' },
      { version: 'v2.0', modifiedBy: 'Aryan Malik', changeDescription: 'Adjusted mango ratio', date: '2025-12-08' },
      { version: 'v3.0', modifiedBy: 'Aryan Malik', changeDescription: 'Modified chili heat level', date: '2025-12-08' },
      { version: 'v4.0', modifiedBy: 'Aryan Malik', changeDescription: 'Cooking time optimization', date: '2025-12-08' },
      { version: 'v5.0', modifiedBy: 'Aryan Malik', changeDescription: 'Final version submitted for review', date: '2025-12-08' }
    ],
    approvalRecords: [
      { reviewerName: 'David Kim', decision: 'Approved', remarks: 'Perfect balance. Approved.', date: '2025-12-09' }
    ]
  },
  {
    id: 'EXP-005',
    name: 'Bone Broth Reduction V2',
    recipeVersion: 'v2.3',
    date: '2025-12-10',
    status: 'Pending',
    chef: 'Farida Haidari',
    assignedChef: null,
    assignedReviewer: null,
    batchId: null,
    temperatureLog: null,
    ingredientLotNumber: null,
    batchNumbers: ['BTH-2215', 'BTH-2216'],
    temperature: 90,
    cookingTime: 480,
    expectedYield: '10L',
    expectedTexture: 'Rich, gelatinous',
    reviewerRemarks: 'Awaiting submission.',
    successRate: null,
    chronology: [
      { event: 'Experiment Created', timestamp: '2025-12-10 06:30', userRole: 'Chef', user: 'Farida Haidari' },
      { event: 'Ingredients Logged', timestamp: '2025-12-10 07:00', userRole: 'Chef', user: 'Farida Haidari' }
    ],
    versionHistory: [
      { version: 'v1.0', modifiedBy: 'Farida Haidari', changeDescription: 'Initial broth experiment created', date: '2025-12-10' },
      { version: 'v2.0', modifiedBy: 'Farida Haidari', changeDescription: 'Bone selection updated', date: '2025-12-10' },
      { version: 'v2.3', modifiedBy: 'Farida Haidari', changeDescription: 'Cooking time extended', date: '2025-12-10' }
    ],
    approvalRecords: []
  },
  {
    id: 'EXP-006',
    name: 'Truffle Mushroom Sauce V1',
    recipeVersion: 'v1.1',
    date: '2025-12-12',
    status: 'Under Review',
    chef: 'Tariq Hussain',
    assignedChef: 'Tariq Hussain',
    assignedReviewer: null,
    batchId: 'BATCH-006',
    temperatureLog: 140,
    ingredientLotNumber: 'LOT-2024-006',
    batchNumbers: ['BTH-2220'],
    temperature: 140,
    cookingTime: 60,
    expectedYield: '6L',
    expectedTexture: 'Velvety, smooth',
    reviewerRemarks: 'Aroma assessment pending.',
    successRate: null,
    chronology: [
      { event: 'Experiment Created', timestamp: '2025-12-12 08:15', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Ingredients Logged', timestamp: '2025-12-12 08:45', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Cooking Parameters Recorded', timestamp: '2025-12-12 10:30', userRole: 'Chef', user: 'Tariq Hussain' },
      { event: 'Experiment Submitted', timestamp: '2025-12-12 12:00', userRole: 'Chef', user: 'Tariq Hussain' }
    ],
    versionHistory: [
      { version: 'v1.0', modifiedBy: 'Tariq Hussain', changeDescription: 'Truffle sauce experiment created', date: '2025-12-12' },
      { version: 'v1.1', modifiedBy: 'Tariq Hussain', changeDescription: 'Mushroom blend adjusted and submitted', date: '2025-12-12' }
    ],
    approvalRecords: []
  },
];

export const experimentStats = {
  successRate: 87,
  batchFailureRate: 13,
  totalExperiments: 42,
  approvedThisMonth: 18,
  pendingReview: 5,
  failedThisMonth: 3,
};
