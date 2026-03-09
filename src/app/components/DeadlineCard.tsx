import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { CircularProgress } from "./CircularProgress";

interface DeadlineCardProps {
  title: string;
  dueDate: string;
  type: string;
  progress: number;
  isOverdue?: boolean;
}

export function DeadlineCard({ 
  title, 
  dueDate, 
  type, 
  progress,
  isOverdue = false 
}: DeadlineCardProps) {
  return (
    <div className={`border rounded-lg p-3 bg-white transition-colors ${
      isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-300'
    }`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {progress === 100 ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : isOverdue ? (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <h4 className="font-medium text-sm text-gray-900 truncate">{title}</h4>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
            <span className="px-2 py-0.5 bg-gray-100 rounded">{type}</span>
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>{dueDate}</span>
          </div>
        </div>
        
        <CircularProgress progress={progress} size={40} strokeWidth={4} />
      </div>
    </div>
  );
}
