import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Activity } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import FormInput from '../components/ui/FormInput';
import { mockAIActivityLogs } from '../data/corporateAdmin';

export default function AIActivityLogsPage() {
  const [logs, setLogs] = useState(mockAIActivityLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');

  const eventTypes = [...new Set(logs.map(log => log.eventType))];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.relatedEntity.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEventType = !selectedEventType || log.eventType === selectedEventType;
    
    return matchesSearch && matchesEventType;
  });

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'pending';
    }
  };

  const getEventTypeIcon = (eventType) => {
    const iconMap = {
      'Ingredient Alert': '🥕',
      'Temperature Deviation': '🌡️',
      'Delivery Delay Pattern': '🚚',
      'Supplier Quality Warning': '⚠️',
      'Production Variance': '⚙️',
    };
    return iconMap[eventType] || '🤖';
  };

  const columns = [
    {
      key: 'eventType',
      label: 'Event Type',
      render: (eventType) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">{getEventTypeIcon(eventType)}</span>
          <span className="font-medium text-slate-700">{eventType}</span>
        </div>
      ),
    },
    { 
      key: 'description', 
      label: 'Description',
      render: (description) => (
        <div className="max-w-md">
          <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
        </div>
      ),
    },
    {
      key: 'relatedEntity',
      label: 'Related Entity',
      render: (entity, log) => (
        <div className="text-sm">
          <div className="font-medium text-slate-700">{entity}</div>
          <div className="text-slate-500">{log.entityId}</div>
        </div>
      ),
    },
    {
      key: 'severity',
      label: 'Severity',
      render: (severity) => <Badge label={severity} variant={getSeverityVariant(severity)} />,
    },
    {
      key: 'createdAt',
      label: 'Date & Time',
      render: (createdAt) => (
        <div className="text-sm">
          <div className="font-medium text-slate-700">
            {new Date(createdAt).toLocaleDateString()}
          </div>
          <div className="text-slate-500">
            {new Date(createdAt).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="AI Activity Logs"
        subtitle="Monitor AI-generated insights and alerts"
      />

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Event Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Activity size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{logs.length}</p>
              <p className="text-sm text-slate-500">Total Events</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-bold">H</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {logs.filter(log => log.severity === 'High').length}
              </p>
              <p className="text-sm text-slate-500">High Severity</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 font-bold">M</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {logs.filter(log => log.severity === 'Medium').length}
              </p>
              <p className="text-sm text-slate-500">Medium Severity</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold">L</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {logs.filter(log => log.severity === 'Low').length}
              </p>
              <p className="text-sm text-slate-500">Low Severity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <Table 
          columns={columns} 
          data={filteredLogs}
          emptyMessage={
            searchTerm || selectedEventType 
              ? "No logs match your search criteria." 
              : "No AI activity logs found."
          }
        />
      </div>
    </motion.div>
  );
}