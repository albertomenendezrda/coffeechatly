import { User, Mail, Phone, Briefcase, GraduationCap, LogOut, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ProfileDropdownProps {
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userSchool?: string;
  userProgram?: string;
  userGradYear?: string;
}

export function ProfileDropdown({
  userName = "Alex Johnson",
  userEmail = "alex.johnson@sloan.mit.edu",
  userPhone = "+1 (617) 555-0123",
  userSchool = "MIT Sloan School of Management",
  userProgram = "MBA",
  userGradYear = "2027"
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const initials = userName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center text-gray-700 font-medium text-sm"
        aria-label="User profile"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {/* Profile Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{userName}</h3>
                <p className="text-sm text-gray-600">{userProgram} Candidate</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 break-all">{userEmail}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{userPhone}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="text-gray-700">
                <div>{userSchool}</div>
                <div className="text-xs text-gray-500 mt-0.5">Class of {userGradYear}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200">
            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
              <Settings className="w-4 h-4 text-gray-500" />
              Settings
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors border-t border-gray-100">
              <LogOut className="w-4 h-4 text-gray-500" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
