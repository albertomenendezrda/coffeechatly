import { Building2, MapPin, Bookmark } from "lucide-react";

interface JobCardProps {
  company: string;
  role: string;
  location: string;
  deadline: string;
  isOnWishlist: boolean;
  onToggleWishlist: () => void;
}

export function JobCard({ 
  company, 
  role, 
  location, 
  deadline,
  isOnWishlist,
  onToggleWishlist 
}: JobCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-medium text-gray-900">{role}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
              <Building2 className="w-4 h-4" />
              <span>{company}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Application deadline: {deadline}
          </div>
        </div>

        <button 
          onClick={onToggleWishlist}
          className={`p-2 rounded-lg transition-colors ${
            isOnWishlist 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
          }`}
          aria-label={isOnWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Bookmark className={`w-5 h-5 ${isOnWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}
