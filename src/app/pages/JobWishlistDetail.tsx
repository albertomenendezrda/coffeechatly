import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Users, Target, TrendingUp, Clock, CheckCircle2, AlertCircle, UserPlus, Linkedin } from "lucide-react";
import { CircularProgress } from "../components/CircularProgress";
import { ProfileDropdown } from "../components/ProfileDropdown";

// Mock data - in real app would fetch based on ID
const jobData = {
  "1": {
    company: "McKinsey & Company",
    role: "Summer Associate",
    status: "networking" as const,
    contactsMade: 3,
    targetContacts: 5,
    applicationDeadline: "Apr 15, 2026",
    overallProgress: 65,
    description: "Summer Associate program for MBA students interested in management consulting. 10-week internship with client project work.",
    location: "Boston, MA / New York, NY",
    applicationUrl: "mckinsey.com/careers/apply",
    timeline: [
      { date: "Feb 28, 2026", event: "Research phase started", completed: true },
      { date: "Mar 10, 2026", event: "Networking goal: 5 contacts", completed: false },
      { date: "Apr 1, 2026", event: "Application materials due", completed: false },
      { date: "Apr 15, 2026", event: "Final application deadline", completed: false }
    ],
    contacts: [
      { 
        id: 1, 
        name: "Sarah Chen", 
        role: "Senior Engagement Manager", 
        status: "completed",
        date: "Mar 3, 2026",
        outcome: "Referral promised"
      },
      { 
        id: 2, 
        name: "Michael Park", 
        role: "Associate Partner", 
        status: "completed",
        date: "Feb 25, 2026",
        outcome: "Cultural insights gained"
      },
      { 
        id: 3, 
        name: "Jennifer Liu", 
        role: "Engagement Manager", 
        status: "scheduled",
        date: "Mar 8, 2026",
        outcome: null
      },
      { 
        id: 4, 
        name: "Alex Rodriguez", 
        role: "Senior Partner", 
        status: "planned",
        date: "TBD",
        outcome: null
      },
      { 
        id: 5, 
        name: "Rachel Kim", 
        role: "Consultant", 
        status: "planned",
        date: "TBD",
        outcome: null
      }
    ],
    suggestedContacts: [
      {
        id: 1,
        name: "David Thompson",
        role: "Engagement Manager",
        connectionDegree: "2nd",
        mutualConnection: "Sarah Chen",
        reason: "Works in tech practice, MIT alum"
      },
      {
        id: 2,
        name: "Emily Rodriguez",
        role: "Associate Partner",
        connectionDegree: "3rd",
        mutualConnection: "Michael Park → Jennifer Liu",
        reason: "Recruiting committee member"
      },
      {
        id: 3,
        name: "James Wilson",
        role: "Senior Partner",
        connectionDegree: "2nd",
        mutualConnection: "Jennifer Liu",
        reason: "Boston office leader"
      }
    ],
    researchNotes: [
      "Focus areas: Tech & Digital transformation, Healthcare",
      "Strong culture of mentorship and learning",
      "Case interview focuses on structure and communication",
      "Referrals significantly increase interview chances"
    ],
    nextActions: [
      { id: 1, action: "Schedule chat with Jennifer Liu", priority: "high", due: "Mar 8, 2026" },
      { id: 2, action: "Research recent tech transformation cases", priority: "medium", due: "Mar 10, 2026" },
      { id: 3, action: "Draft application essays", priority: "high", due: "Mar 20, 2026" },
      { id: 4, action: "Request recommendation letter from Professor Chen", priority: "medium", due: "Mar 15, 2026" }
    ]
  }
};

const statusConfig = {
  researching: { label: "Researching", color: "bg-gray-100 text-gray-700" },
  networking: { label: "Networking", color: "bg-blue-100 text-blue-700" },
  applying: { label: "Applying", color: "bg-purple-100 text-purple-700" },
  interviewing: { label: "Interviewing", color: "bg-green-100 text-green-700" }
};

const contactStatusConfig = {
  completed: { label: "Completed", icon: CheckCircle2, color: "text-green-600" },
  scheduled: { label: "Scheduled", icon: Clock, color: "text-blue-600" },
  planned: { label: "Planned", icon: Target, color: "text-gray-400" }
};

const priorityConfig = {
  high: { color: "bg-red-100 text-red-700" },
  medium: { color: "bg-yellow-100 text-yellow-700" },
  low: { color: "bg-gray-100 text-gray-700" }
};

export default function JobWishlistDetail() {
  const { id } = useParams();
  const job = jobData[id as keyof typeof jobData];

  if (!job) {
    return <div>Job not found</div>;
  }

  const statusInfo = statusConfig[job.status];
  const completedTimeline = job.timeline.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <ProfileDropdown />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{job.company}</h1>
              <p className="text-sm text-gray-600 mt-0.5">{job.role}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs px-2 py-1 rounded ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
                <span className="text-xs text-gray-500">{job.location}</span>
              </div>
            </div>
            <CircularProgress progress={job.overallProgress} size={60} strokeWidth={5} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <section className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Contacts Made</div>
                <div className="text-2xl font-semibold text-gray-900">{job.contactsMade}/{job.targetContacts}</div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Timeline Progress</div>
                <div className="text-2xl font-semibold text-gray-900">{completedTimeline}/{job.timeline.length}</div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Days Until Deadline</div>
                <div className="text-2xl font-semibold text-gray-900">48</div>
              </div>
            </section>

            {/* Description */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Role Description</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{job.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Application Deadline: </span>
                <span className="text-gray-900 font-medium">{job.applicationDeadline}</span>
              </div>
            </section>

            {/* Timeline */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Application Timeline</h2>
              <div className="space-y-3">
                {job.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.completed ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {item.event}
                        </span>
                        {item.completed && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Networking Progress */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Networking Progress
              </h2>
              
              {/* Current Contacts */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Your Network</h3>
                <div className="space-y-2">
                  {job.contacts.map(contact => {
                    const statusInfo = contactStatusConfig[contact.status as keyof typeof contactStatusConfig];
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div key={contact.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span className="font-medium text-sm text-gray-900">{contact.name}</span>
                            </div>
                            <div className="text-xs text-gray-600 mb-1">{contact.role}</div>
                            <div className="text-xs text-gray-500">{contact.date}</div>
                            {contact.outcome && (
                              <div className="text-xs text-green-700 bg-green-50 inline-block px-2 py-0.5 rounded mt-1">
                                {contact.outcome}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Suggested Contacts */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Suggested Contacts
                </h3>
                <div className="space-y-2">
                  {job.suggestedContacts.map(contact => (
                    <div key={contact.id} className="border border-blue-200 bg-blue-50 rounded-lg p-3">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{contact.name}</span>
                            <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded flex items-center gap-1">
                              <Linkedin className="w-3 h-3" />
                              {contact.connectionDegree}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">{contact.role}</div>
                          <div className="text-xs text-gray-500">
                            via {contact.mutualConnection}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded inline-block">
                        {contact.reason}
                      </div>
                      <button className="w-full mt-2 py-1.5 px-3 bg-white border border-blue-300 text-blue-700 rounded text-xs hover:bg-blue-50 transition-colors">
                        Request Introduction
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Research Notes */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Research Notes</h2>
              <div className="space-y-2">
                {job.researchNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{note}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Next Actions */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Next Actions</h2>
              <div className="space-y-2">
                {job.nextActions.map(action => {
                  const priorityInfo = priorityConfig[action.priority as keyof typeof priorityConfig];
                  return (
                    <div key={action.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        {action.priority === 'high' && <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
                        <span className="text-sm text-gray-900 flex-1">{action.action}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-0.5 rounded ${priorityInfo.color}`}>
                          {action.priority}
                        </span>
                        <span className="text-gray-500">{action.due}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">On Track</h3>
                  <p className="text-xs text-gray-700">You're progressing well. Keep networking and complete application materials by March 20.</p>
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Add New Contact
              </button>
              <button className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Update Status
              </button>
              <button className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                View Application
              </button>
              <button className="w-full py-2.5 px-4 border border-red-300 text-red-700 rounded-lg text-sm hover:bg-red-50 transition-colors">
                Remove from Wishlist
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}