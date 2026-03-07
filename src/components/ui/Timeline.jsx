import { Clock, User } from 'lucide-react';

export default function Timeline({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm"></div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-8 bg-slate-200 mt-2"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-slate-800">{event.event}</h4>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                {event.timestamp}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User size={14} />
              <span className="font-medium">{event.user}</span>
              <span className="text-slate-400">({event.userRole})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}