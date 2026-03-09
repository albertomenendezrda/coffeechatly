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
  },
  "2": {
    company: "Bain & Company",
    role: "Associate Consultant",
    status: "networking" as const,
    contactsMade: 2,
    targetContacts: 5,
    applicationDeadline: "Apr 20, 2026",
    overallProgress: 45,
    description: "Associate Consultant role for MBA graduates. Work on strategy and performance improvement projects across industries. Strong emphasis on case team culture.",
    location: "Boston, MA / San Francisco, CA",
    applicationUrl: "bain.com/careers/apply",
    timeline: [
      { date: "Mar 1, 2026", event: "Research phase started", completed: true },
      { date: "Mar 15, 2026", event: "Networking goal: 5 contacts", completed: false },
      { date: "Apr 5, 2026", event: "Application materials due", completed: false },
      { date: "Apr 20, 2026", event: "Final application deadline", completed: false }
    ],
    contacts: [
      { id: 1, name: "Michael Torres", role: "Principal", status: "scheduled", date: "Mar 4, 2026", outcome: null },
      { id: 2, name: "Lisa Nguyen", role: "Consultant", status: "completed", date: "Feb 28, 2026", outcome: "Practice area insights" },
      { id: 3, name: "James Chen", role: "Partner", status: "planned", date: "TBD", outcome: null },
      { id: 4, name: "Emma Wilson", role: "Manager", status: "planned", date: "TBD", outcome: null },
      { id: 5, name: "Ryan O'Brien", role: "Associate Consultant", status: "planned", date: "TBD", outcome: null }
    ],
    suggestedContacts: [
      { id: 1, name: "Nina Patel", role: "Manager", connectionDegree: "2nd", mutualConnection: "Michael Torres", reason: "PE practice, Sloan alum" },
      { id: 2, name: "Chris Martinez", role: "Partner", connectionDegree: "3rd", mutualConnection: "Lisa Nguyen → James Chen", reason: "Boston office recruiting lead" }
    ],
    researchNotes: [
      "Known for private equity diligence and commercial due diligence",
      "Case interview: fit + case, emphasis on teamwork",
      "Summer program leads to full-time offer for most"
    ],
    nextActions: [
      { id: 1, action: "Prepare for Michael Torres chat (Mar 4)", priority: "high", due: "Mar 4, 2026" },
      { id: 2, action: "Identify 2 more Bain contacts", priority: "medium", due: "Mar 12, 2026" },
      { id: 3, action: "Review Bain case frameworks", priority: "medium", due: "Mar 18, 2026" }
    ]
  },
  "3": {
    company: "Boston Consulting Group",
    role: "Consultant",
    status: "researching" as const,
    contactsMade: 1,
    targetContacts: 4,
    applicationDeadline: "Apr 18, 2026",
    overallProgress: 30,
    description: "Consultant position for MBAs. BCG focuses on strategy, transformation, and digital. Global offices with strong practice areas in healthcare and technology.",
    location: "Boston, MA / New York, NY / Chicago, IL",
    applicationUrl: "bcg.com/careers",
    timeline: [
      { date: "Mar 5, 2026", event: "Research phase started", completed: true },
      { date: "Mar 20, 2026", event: "Networking goal: 4 contacts", completed: false },
      { date: "Apr 10, 2026", event: "Application submitted", completed: false },
      { date: "Apr 18, 2026", event: "Final application deadline", completed: false }
    ],
    contacts: [
      { id: 1, name: "Jessica Park", role: "Project Leader", status: "scheduled", date: "Mar 5, 2026", outcome: null },
      { id: 2, name: "David Kim", role: "Partner", status: "planned", date: "TBD", outcome: null },
      { id: 3, name: "Amanda Foster", role: "Consultant", status: "planned", date: "TBD", outcome: null },
      { id: 4, name: "Tom Bradley", role: "Managing Director", status: "planned", date: "TBD", outcome: null }
    ],
    suggestedContacts: [
      { id: 1, name: "Rachel Green", role: "Principal", connectionDegree: "2nd", mutualConnection: "Jessica Park", reason: "Healthcare practice, case prep tips" },
      { id: 2, name: "Mark Sullivan", role: "Partner", connectionDegree: "3rd", mutualConnection: "Jessica Park → David Kim", reason: "Boston office lead" }
    ],
    researchNotes: [
      "Strong in healthcare and technology practices",
      "Phenomenon-based cases in addition to traditional",
      "Culture: collaborative, intellectual rigor"
    ],
    nextActions: [
      { id: 1, action: "Complete prep for Jessica Park chat", priority: "high", due: "Mar 5, 2026" },
      { id: 2, action: "Map BCG practice areas of interest", priority: "medium", due: "Mar 14, 2026" },
      { id: 3, action: "Schedule 2 more BCG coffee chats", priority: "high", due: "Mar 22, 2026" }
    ]
  },
  "4": {
    company: "Goldman Sachs",
    role: "Investment Banking Analyst",
    status: "applying" as const,
    contactsMade: 4,
    targetContacts: 4,
    applicationDeadline: "Mar 30, 2026",
    overallProgress: 85,
    description: "Investment Banking Analyst role in one of Goldman's industry or product groups. Deal execution, modeling, and client support. Fast-paced recruiting timeline.",
    location: "New York, NY / San Francisco, CA",
    applicationUrl: "goldmansachs.com/careers",
    timeline: [
      { date: "Feb 15, 2026", event: "Networking phase started", completed: true },
      { date: "Mar 1, 2026", event: "Target 4 contacts reached", completed: true },
      { date: "Mar 25, 2026", event: "Application submitted", completed: false },
      { date: "Mar 30, 2026", event: "Final application deadline", completed: false }
    ],
    contacts: [
      { id: 1, name: "Rachel Martinez", role: "Vice President", status: "completed", date: "Feb 20, 2026", outcome: "Follow-up pending" },
      { id: 2, name: "Kevin Zhang", role: "Associate", status: "completed", date: "Feb 22, 2026", outcome: "Referral submitted" },
      { id: 3, name: "Sophie Lee", role: "Managing Director", status: "completed", date: "Mar 1, 2026", outcome: "Interview tips shared" },
      { id: 4, name: "Alex Thompson", role: "Analyst", status: "completed", date: "Feb 28, 2026", outcome: "Reflection due" }
    ],
    suggestedContacts: [
      { id: 1, name: "Jordan Blake", role: "Partner", connectionDegree: "2nd", mutualConnection: "Sophie Lee", reason: "TMT group head" }
    ],
    researchNotes: [
      "IBD recruiting is early—applications in March",
      "Technical and fit interviews; know your story",
      "Group selection matters for culture and deal flow"
    ],
    nextActions: [
      { id: 1, action: "Send follow-up to Rachel Martinez", priority: "high", due: "Feb 28, 2026" },
      { id: 2, action: "Submit application and essays", priority: "high", due: "Mar 25, 2026" },
      { id: 3, action: "Complete post-chat reflection for Alex Thompson", priority: "medium", due: "Mar 2, 2026" }
    ]
  },
  "5": {
    company: "Bain Capital",
    role: "Private Equity Associate",
    status: "networking" as const,
    contactsMade: 2,
    targetContacts: 6,
    applicationDeadline: "May 5, 2026",
    overallProgress: 40,
    description: "Private Equity Associate role. Work on due diligence, portfolio company value creation, and new investments. Typically requires consulting or banking background.",
    location: "Boston, MA / New York, NY",
    applicationUrl: "baincapital.com/careers",
    timeline: [
      { date: "Mar 1, 2026", event: "Research phase started", completed: true },
      { date: "Apr 1, 2026", event: "Networking goal: 6 contacts", completed: false },
      { date: "Apr 25, 2026", event: "Application materials due", completed: false },
      { date: "May 5, 2026", event: "Final application deadline", completed: false }
    ],
    contacts: [
      { id: 1, name: "Michael Torres", role: "Principal", status: "scheduled", date: "Mar 4, 2026", outcome: null },
      { id: 2, name: "Claire Hughes", role: "Vice President", status: "completed", date: "Feb 26, 2026", outcome: "Sector overview" },
      { id: 3, name: "Daniel Park", role: "Associate", status: "planned", date: "TBD", outcome: null },
      { id: 4, name: "Nicole Adams", role: "Partner", status: "planned", date: "TBD", outcome: null },
      { id: 5, name: "Eric Wong", role: "Principal", status: "planned", date: "TBD", outcome: null },
      { id: 6, name: "Maya Johnson", role: "Director", status: "planned", date: "TBD", outcome: null }
    ],
    suggestedContacts: [
      { id: 1, name: "Steve Collins", role: "Managing Director", connectionDegree: "2nd", mutualConnection: "Michael Torres", reason: "Healthcare investing" },
      { id: 2, name: "Kate Morrison", role: "Principal", connectionDegree: "3rd", mutualConnection: "Claire Hughes → Daniel Park", reason: "Recruiting committee" }
    ],
    researchNotes: [
      "PE recruiting follows consulting/banking timelines",
      "Focus on deal experience and modeling skills",
      "Culture varies by team and sector"
    ],
    nextActions: [
      { id: 1, action: "Prepare for Michael Torres chat", priority: "high", due: "Mar 4, 2026" },
      { id: 2, action: "Build list of 4 more Bain Capital contacts", priority: "medium", due: "Mar 20, 2026" },
      { id: 3, action: "Refresh LBO and diligence knowledge", priority: "medium", due: "Apr 1, 2026" }
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