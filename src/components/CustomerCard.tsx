import type { Customer } from '../types';

interface CustomerCardProps {
  customer: Customer;
  onUpdate: (id: string, updates: Partial<Customer>) => void;
}

export function CustomerCard({ customer, onUpdate }: CustomerCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'inactive': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="card-modern p-5 group animate-slide-up">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
          <span className="text-white font-semibold text-sm">{getInitials(customer.name)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
              {customer.name}
            </h3>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex-shrink-0 ${getStatusStyle(customer.engagementStatus)}`}>
              {customer.engagementStatus}
            </span>
          </div>
          <p className="text-sm text-slate-400 truncate">{customer.company}</p>
        </div>
      </div>
      
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center text-sm text-slate-400 hover:text-slate-300 transition-colors">
          <svg className="w-4 h-4 mr-2.5 flex-shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{customer.email}</span>
        </div>
        {customer.phone && (
          <div className="flex items-center text-sm text-slate-400">
            <svg className="w-4 h-4 mr-2.5 flex-shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {customer.phone}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <span className="text-xs text-slate-500">
          Last contact: {new Date(customer.lastContactDate).toLocaleDateString()}
        </span>
        <button
          onClick={() => onUpdate(customer.id, { lastContactDate: new Date().toISOString().split('T')[0] })}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
        >
          Update Contact
        </button>
      </div>
    </div>
  );
}
