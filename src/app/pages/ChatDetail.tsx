import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Target, CheckCircle2, Circle, User, Building2, Linkedin, Mail } from "lucide-react";
import { CircularProgress } from "../components/CircularProgress";
import { ProfileDropdown } from "../components/ProfileDropdown";

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
  }
};

export default function ChatDetail() {
  const { id } = useParams();
  const chat = chatData[id as keyof typeof chatData];

  if (!chat) {
    return <div>Chat not found</div>;
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
                <a 
                  href={`https://${chat.linkedinUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn Profile</span>
                </a>
                <a 
                  href={`mailto:${chat.email}`}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>{chat.email}</span>
                </a>
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