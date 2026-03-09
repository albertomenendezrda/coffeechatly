interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ label, value, subtext, trend }: MetricCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {subtext && (
        <div className={`text-xs mt-1 ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 
          'text-gray-500'
        }`}>
          {subtext}
        </div>
      )}
    </div>
  );
}
