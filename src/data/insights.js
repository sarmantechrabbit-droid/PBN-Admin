export const insights = [
  {
    id: 'INS-01',
    type: 'error',
    title: 'Ingredient Batch Causing Failures',
    description:
      'Batch SUP-RICE-22 (Basmati Rice) has been linked to 3 failed experiments in the past 14 days. Consider replacing supplier or testing batch separately.',
    affectedExperiments: ['EXP-003'],
    severity: 'High',
    date: '2025-12-13',
    recommendation: 'Quarantine batch SUP-RICE-22 and request quality certificate from Grain Masters.',
  },
  {
    id: 'INS-02',
    type: 'warning',
    title: 'Temperature Variance Impact',
    description:
      'Experiments conducted between 10:00–12:00 show a ±8°C deviation from target temperatures, correlating with a 23% higher failure rate compared to other time slots.',
    affectedExperiments: ['EXP-003', 'EXP-006'],
    severity: 'Medium',
    date: '2025-12-12',
    recommendation: 'Calibrate kitchen equipment before morning production shift. Schedule maintenance check.',
  },
  {
    id: 'INS-03',
    type: 'warning',
    title: 'Repeated Delivery Delays',
    description:
      'Route HQ → Uttara → Airport has averaged 72 minutes over the past 7 days, exceeding the 50-minute SLA by 44%. Traffic patterns suggest peak-hour conflict.',
    affectedDeliveries: ['DEL-503'],
    severity: 'Medium',
    date: '2025-12-13',
    recommendation: 'Reschedule Uttara route deliveries to pre-09:00 or post-14:00 windows.',
  },
  {
    id: 'INS-04',
    type: 'error',
    title: 'Supplier Quality Issues',
    description:
      'Luxe Pantry Imports has delivered 2 damaged batches (Black Truffle) in the past 30 days. Damage rate of 33% far exceeds the 5% acceptance threshold.',
    affectedInventory: ['INV-007'],
    severity: 'High',
    date: '2025-12-11',
    recommendation: 'Issue formal notice to Luxe Pantry Imports. Initiate supplier review process.',
  },
  {
    id: 'INS-05',
    type: 'info',
    title: 'Peak Production Hours Identified',
    description:
      'Order volume spikes between 12:00–13:00 with 8+ orders/hour. Current production capacity handles 6 orders/hour during this window, creating a 2-order backlog.',
    severity: 'Low',
    date: '2025-12-10',
    recommendation: 'Pre-produce batch items at 10:00 to buffer the lunch peak. Review staffing for peak window.',
  },
  {
    id: 'INS-06',
    type: 'info',
    title: 'High Fuel Consumption on Delivery DEL-503',
    description:
      'DEL-503 consumed 3.4L for 15.2km (0.22L/km), which is 38% above the fleet average of 0.16L/km. Possible vehicle maintenance required.',
    affectedDeliveries: ['DEL-503'],
    severity: 'Low',
    date: '2025-12-13',
    recommendation: 'Schedule vehicle inspection for DEL-503 driver vehicle. Check tyre pressure and engine.',
  },
];
