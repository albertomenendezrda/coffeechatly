import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Target, CheckCircle2, Circle, Linkedin, Mail } from "lucide-react";
import { CircularProgress } from "../components/CircularProgress";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useMeetings } from "../context/MeetingsContext";

// Mock data - in real app would fetch based on ID
const chatData = {
  "1": {
    name: "Sarah Chen",
    company: "McKinsey & Company",
    role: "Senior Engagement Manager",
    date: "Mar 3, 2026",
    time: "2:00 PM",
    objective: "Secure referral for Summer Associate role",
    prepProgress: 75,
    linkedinUrl: "linkedin.com/in/sarahchen",
    email: "sarah.chen@mckinsey.com",
    background: {
      education: "Stanford GSB '18, MIT Engineering '12",
      experience: "6 years at McKinsey, previously worked at Tesla",
      expertise: "Tech transformation, Operations"
    },
    prepTasks: [
      { id: 1, task: "Review LinkedIn profile and recent posts", completed: true },
      { id: 2, task: "Research McKinsey's recent tech practice announcements", completed: true },
      { id: 3, task: "Identify 3 specific projects Sarah has led", completed: true },
      { id: 4, task: "Prepare questions about culture and work-life balance", completed: false },
      { id: 5, task: "Draft positioning statement (why McKinsey, why consulting)", completed: false },
      { id: 6, task: "Prepare follow-up email template", completed: false }
    ],
    conversationPoints: [
      "Her transition from engineering to consulting",
      "Tesla vs McKinsey culture differences",
      "Tech practice growth trajectory",
      "Summer associate program structure"
    ],
    notes: "Met at Sloan networking event last month. She mentioned interest in helping students with engineering backgrounds. Very approachable."
  },
  "2": {
    name: "Michael Torres",
    company: "Bain Capital",
    role: "Principal",
    date: "Mar 4, 2026",
    time: "10:30 AM",
    objective: "Understand PE recruiting timeline and cultural fit",
    prepProgress: 45,
    linkedinUrl: "linkedin.com/in/michaeltorres",
    email: "michael.torres@baincapital.com",
    background: {
      education: "Harvard Business School '15, Princeton '08",
      experience: "8 years at Bain Capital, previously Bain & Company",
      expertise: "Healthcare and growth investing"
    },
    prepTasks: [
      { id: 1, task: "Review Michael's deal history and portfolio companies", completed: true },
      { id: 2, task: "Research Bain Capital's recent healthcare investments", completed: true },
      { id: 3, task: "Prepare questions on PE vs consulting career path", completed: false },
      { id: 4, task: "Draft talking points on my consulting interest and fit", completed: false },
      { id: 5, task: "Prepare follow-up email template", completed: false }
    ],
    conversationPoints: [
      "His path from Bain consulting to Bain Capital",
      "What they look for in Associate candidates",
      "Healthcare sector focus and deal flow",
      "Timeline for summer/full-time recruiting"
    ],
    notes: "Referred by Lisa Nguyen (Bain). Michael is on the healthcare team. Interested in candidates with operations/strategy background."
  },
  "3": {
    name: "Jessica Park",
    company: "BCG",
    role: "Project Leader",
    date: "Mar 5, 2026",
    time: "3:30 PM",
    objective: "Learn about practice area specifics and case prep insights",
    prepProgress: 30,
    linkedinUrl: "linkedin.com/in/jessicapark",
    email: "jessica.park@bcg.com",
    background: {
      education: "MIT Sloan '19, UCLA '14",
      experience: "5 years at BCG, previously in healthcare strategy",
      expertise: "Healthcare practice, change management"
    },
    prepTasks: [
      { id: 1, task: "Review Jessica's LinkedIn and recent posts", completed: true },
      { id: 2, task: "Research BCG healthcare practice and cases", completed: false },
      { id: 3, task: "Prepare 3 practice case questions", completed: false },
      { id: 4, task: "List questions about PL role and team structure", completed: false },
      { id: 5, task: "Prepare positioning: why BCG, why healthcare", completed: false },
      { id: 6, task: "Draft follow-up email template", completed: false }
    ],
    conversationPoints: [
      "Healthcare practice at BCG vs other firms",
      "Case interview preparation and phenomenon cases",
      "Project Leader role and day-to-day",
      "Boston office culture and staffing"
    ],
    notes: "Connected through BCG event at Sloan. She's in the healthcare practice and has done recruiting before."
  },
  "4": {
    name: "David Kumar",
    company: "Google",
    role: "Product Manager",
    date: "Mar 6, 2026",
    time: "11:00 AM",
    objective: "Validate PM transition from consulting background",
    prepProgress: 0,
    linkedinUrl: "linkedin.com/in/davidkumar",
    email: "david.kumar@google.com",
    background: {
      education: "Stanford GSB '17, IIT Bombay '12",
      experience: "4 years at Google, previously McKinsey digital practice",
      expertise: "Product strategy, B2B products"
    },
    prepTasks: [
      { id: 1, task: "Review David's product area and recent launches", completed: false },
      { id: 2, task: "Research Google APM vs PM hiring paths", completed: false },
      { id: 3, task: "Prepare story: consulting to PM transition", completed: false },
      { id: 4, task: "List questions on PM role and interview process", completed: false },
      { id: 5, task: "Prepare follow-up email template", completed: false }
    ],
    conversationPoints: [
      "His move from McKinsey to Google PM",
      "How consulting skills translate to product",
      "Google PM interview process and prep",
      "B2B vs B2C and which fits my background"
    ],
    notes: "Cold outreach via LinkedIn. He transitioned from consulting to PM and is open to sharing his experience. Chat not yet prepped."
  }
};

function meetingToChatDetail(meeting: { name: string; company: string; role: string; date: string; time: string; objective: string; prepProgress: number }) {
  return {
    name: meeting.name,
    company: meeting.company,
    role: meeting.role,
    date: meeting.date,
    time: meeting.time,
    objective: meeting.objective,
    prepProgress: meeting.prepProgress,
    linkedinUrl: "",
    email: "",
    background: { education: "", experience: "", expertise: "" },
    prepTasks: [
      { id: 1, task: "Add prep tasks in Edit Prep Details", completed: false },
    ],
    conversationPoints: [] as string[],
    notes: "This chat was just scheduled. Add contact info and prep details using Edit Prep Details.",
  };
}

export default function ChatDetail() {
  const { id } = useParams();
  const { meetings } = useMeetings();
  const staticChat = chatData[id as keyof typeof chatData];
  const contextMeeting = meetings.find((m) => m.id === Number(id));
  const chat = staticChat ?? (contextMeeting ? meetingToChatDetail(contextMeeting) : null);

  if (!chat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Chat not found.</p>
          <Link to="/" className="text-gray-900 font-medium hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const completedTasks = chat.prepTasks.filter(t => t.completed).length;
  const totalTasks = chat.prepTasks.length;

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
              <h1 className="text-xl font-semibold text-gray-900">{chat.name}</h1>
              <p className="text-sm text-gray-600 mt-0.5">{chat.role} at {chat.company}</p>
            </div>
            <CircularProgress progress={chat.prepProgress} size={60} strokeWidth={5} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Details */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Meeting Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{chat.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{chat.time}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Target className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Conversation Objective</div>
                    <div className="text-gray-900 font-medium">{chat.objective}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prep Checklist */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Preparation Checklist</h2>
                <span className="text-sm text-gray-600">{completedTasks}/{totalTasks} completed</span>
              </div>
              <div className="space-y-2">
                {chat.prepTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Conversation Points */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Key Conversation Points</h2>
              <div className="space-y-2">
                {chat.conversationPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Notes */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Notes</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{chat.notes}</p>
            </section>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Contact Info */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                {chat.linkedinUrl ? (
                  <a 
                    href={`https://${chat.linkedinUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn Profile</span>
                  </a>
                ) : null}
                {chat.email ? (
                  <a 
                    href={`mailto:${chat.email}`}
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span>{chat.email}</span>
                  </a>
                ) : null}
                {!chat.linkedinUrl && !chat.email ? (
                  <p className="text-sm text-gray-500">Add contact info in Edit Prep Details.</p>
                ) : null}
              </div>
            </section>

            {/* Background */}
            <section className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Background</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Education</div>
                  <div className="text-sm text-gray-900">{chat.background.education}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Experience</div>
                  <div className="text-sm text-gray-900">{chat.background.experience}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Expertise</div>
                  <div className="text-sm text-gray-900">{chat.background.expertise}</div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <section className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Edit Prep Details
              </button>
              <button className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Reschedule Meeting
              </button>
              <button className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Cancel Chat
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}