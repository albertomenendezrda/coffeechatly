import { Calendar, Clock, Target } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { Link } from "react-router";

interface MeetingCardProps {
  id: number;
  name: string;
  company: string;
  role: string;
  date: string;
  time: string;
  objective: string;
  prepProgress: number;
}

export function MeetingCard({ 
  id,
  name, 
  company, 
  role, 
  date, 
  time, 
  objective, 
  prepProgress 
}: MeetingCardProps) {
  return (
    <Link to={`/chat/${id}`}>
      <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div>
              <h3 className="font-medium text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{role} at {company}</p>
            </div>

            {/* Date/Time */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{time}</span>
              </div>
            </div>

            {/* Objective */}
            <div className="flex items-start gap-1.5 text-sm">
              <Target className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{objective}</span>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="flex flex-col items-center gap-1">
            <CircularProgress progress={prepProgress} size={56} strokeWidth={5} />
            <span className="text-xs text-gray-600">{prepProgress}%</span>
            <span className="text-xs text-gray-500">prep</span>
          </div>
        </div>
      </div>
    </Link>
  );
}