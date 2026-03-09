import { Building2, Users, Calendar } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { Link } from "react-router";

interface WishlistJobCardProps {
  id: number;
  company: string;
  role: string;
  status: "researching" | "networking" | "applying" | "interviewing";
  contactsMade: number;
  targetContacts: number;
  applicationDeadline: string;
  overallProgress: number;
}

const statusConfig = {
  researching: { label: "Researching", color: "bg-gray-100 text-gray-700" },
  networking: { label: "Networking", color: "bg-blue-100 text-blue-700" },
  applying: { label: "Applying", color: "bg-purple-100 text-purple-700" },
  interviewing: { label: "Interviewing", color: "bg-green-100 text-green-700" }
};

export function WishlistJobCard({ 
  id,
  company, 
  role, 
  status,
  contactsMade,
  targetContacts,
  applicationDeadline,
  overallProgress
}: WishlistJobCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link to={`/job/${id}`}>
      <div className="flex-shrink-0 w-80 border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors cursor-pointer">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 truncate">{company}</h3>
              </div>
              <p className="text-sm text-gray-600 truncate">{role}</p>
            </div>
            <CircularProgress progress={overallProgress} size={44} strokeWidth={4} />
          </div>

          {/* Status Badge */}
          <div>
            <span className={`text-xs px-2 py-1 rounded ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>

          {/* Metrics */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users className="w-4 h-4" />
                <span>Contacts</span>
              </div>
              <span className="font-medium text-gray-900">
                {contactsMade}/{targetContacts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Deadline</span>
              </div>
              <span className="font-medium text-gray-900">{applicationDeadline}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full py-2 px-3 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}