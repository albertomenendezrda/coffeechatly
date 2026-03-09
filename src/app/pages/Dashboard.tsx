import { Calendar, TrendingUp, Users, Target, Briefcase, ChevronRight } from "lucide-react";
import { MeetingCard } from "../components/MeetingCard";
import { DeadlineCard } from "../components/DeadlineCard";
import { MetricCard } from "../components/MetricCard";
import { WishlistJobCard } from "../components/WishlistJobCard";
import { JobCard } from "../components/JobCard";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState } from "react";

// Mock data
const upcomingMeetings = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "McKinsey & Company",
    role: "Senior Engagement Manager",
    date: "Mar 3, 2026",
    time: "2:00 PM",
    objective: "Secure referral for Summer Associate role",
    prepProgress: 75
  },
  {
    id: 2,
    name: "Michael Torres",
    company: "Bain Capital",
    role: "Principal",
    date: "Mar 4, 2026",
    time: "10:30 AM",
    objective: "Understand PE recruiting timeline and cultural fit",
    prepProgress: 45
  },
  {
    id: 3,
    name: "Jessica Park",
    company: "BCG",
    role: "Project Leader",
    date: "Mar 5, 2026",
    time: "3:30 PM",
    objective: "Learn about practice area specifics and case prep insights",
    prepProgress: 30
  },
  {
    id: 4,
    name: "David Kumar",
    company: "Google",
    role: "Product Manager",
    date: "Mar 6, 2026",
    time: "11:00 AM",
    objective: "Validate PM transition from consulting background",
    prepProgress: 0
  }
];

const deadlines = [
  {
    id: 1,
    title: "Follow-up email to Rachel Martinez (Goldman Sachs)",
    dueDate: "Feb 28, 2026",
    type: "Follow-up",
    progress: 0,
    isOverdue: true
  },
  {
    id: 2,
    title: "Research Sarah Chen's recent projects",
    dueDate: "Mar 2, 2026",
    type: "Prep",
    progress: 75
  },
  {
    id: 3,
    title: "Complete objective definition - Michael Torres chat",
    dueDate: "Mar 3, 2026",
    type: "Strategy",
    progress: 100
  },
  {
    id: 4,
    title: "Post-chat reflection - Alex Thompson",
    dueDate: "Mar 2, 2026",
    type: "Reflection",
    progress: 50
  }
];

const wishlistJobs = [
  {
    id: 1,
    company: "McKinsey & Company",
    role: "Summer Associate",
    status: "networking" as const,
    contactsMade: 3,
    targetContacts: 5,
    applicationDeadline: "Apr 15, 2026",
    overallProgress: 65
  },
  {
    id: 2,
    company: "Bain & Company",
    role: "Associate Consultant",
    status: "networking" as const,
    contactsMade: 2,
    targetContacts: 5,
    applicationDeadline: "Apr 20, 2026",
    overallProgress: 45
  },
  {
    id: 3,
    company: "Boston Consulting Group",
    role: "Consultant",
    status: "researching" as const,
    contactsMade: 1,
    targetContacts: 4,
    applicationDeadline: "Apr 18, 2026",
    overallProgress: 30
  },
  {
    id: 4,
    company: "Goldman Sachs",
    role: "Investment Banking Analyst",
    status: "applying" as const,
    contactsMade: 4,
    targetContacts: 4,
    applicationDeadline: "Mar 30, 2026",
    overallProgress: 85
  },
  {
    id: 5,
    company: "Bain Capital",
    role: "Private Equity Associate",
    status: "networking" as const,
    contactsMade: 2,
    targetContacts: 6,
    applicationDeadline: "May 5, 2026",
    overallProgress: 40
  }
];

const upcomingJobs = [
  {
    id: 1,
    company: "Accenture Strategy",
    role: "Strategy Consultant",
    location: "Boston, MA",
    deadline: "Apr 10, 2026",
    isOnWishlist: false
  },
  {
    id: 2,
    company: "Deloitte Consulting",
    role: "Business Analyst",
    location: "New York, NY",
    deadline: "Apr 12, 2026",
    isOnWishlist: false
  },
  {
    id: 3,
    company: "Amazon",
    role: "Product Manager - AWS",
    location: "Seattle, WA",
    deadline: "Apr 25, 2026",
    isOnWishlist: false
  },
  {
    id: 4,
    company: "Apple",
    role: "Strategy & Business Development",
    location: "Cupertino, CA",
    deadline: "May 1, 2026",
    isOnWishlist: false
  }
];

export default function Dashboard() {
  const [jobWishlists, setJobWishlists] = useState(
    upcomingJobs.reduce((acc, job) => ({ ...acc, [job.id]: job.isOnWishlist }), {})
  );

  const toggleWishlist = (jobId: number) => {
    setJobWishlists(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Coffee Chat Command Center</h1>
              <p className="text-sm text-gray-600 mt-0.5">MIT Sloan Recruiting Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                + Schedule New Chat
              </button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recruiting Cycle Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard 
              label="Total Chats Completed" 
              value="12"
              subtext="+3 this week"
              trend="up"
            />
            <MetricCard 
              label="Referrals Received" 
              value="4"
              subtext="33% conversion"
              trend="up"
            />
            <MetricCard 
              label="Upcoming This Week" 
              value="4"
              subtext="2 prep incomplete"
            />
            <MetricCard 
              label="Avg Prep Completion" 
              value="68%"
              subtext="+12% vs last week"
              trend="up"
            />
          </div>
        </section>

        {/* Active Application Wishlist - Horizontal Scrollable */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Active Application Wishlist
            </h2>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-4">
              {wishlistJobs.map(job => (
                <WishlistJobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Meetings - Takes 2 columns */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Coffee Chats
              </h2>
              <span className="text-sm text-gray-600">{upcomingMeetings.length} scheduled</span>
            </div>
            <div className="space-y-3">
              {upcomingMeetings.map(meeting => (
                <MeetingCard key={meeting.id} {...meeting} />
              ))}
            </div>
          </section>

          {/* Deadlines - Takes 1 column */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Action Items
              </h2>
              <span className="text-sm text-gray-600">{deadlines.length} items</span>
            </div>
            <div className="space-y-3">
              {deadlines.map(deadline => (
                <DeadlineCard key={deadline.id} {...deadline} />
              ))}
            </div>
          </section>
        </div>

        {/* Funnel Status */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recruiting Funnel
          </h2>
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="grid grid-cols-5 gap-4">
              {[
                { stage: "Outreach Sent", count: 42, color: "bg-blue-100 text-blue-800" },
                { stage: "Chats Scheduled", count: 16, color: "bg-purple-100 text-purple-800" },
                { stage: "Chats Completed", count: 12, color: "bg-indigo-100 text-indigo-800" },
                { stage: "Referrals", count: 4, color: "bg-green-100 text-green-800" },
                { stage: "Interviews", count: 2, color: "bg-emerald-100 text-emerald-800" }
              ].map((stage, idx) => (
                <div key={idx} className="text-center">
                  <div className={`${stage.color} rounded-lg py-3 px-4 mb-2`}>
                    <div className="text-2xl font-semibold">{stage.count}</div>
                  </div>
                  <div className="text-sm text-gray-700">{stage.stage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Insights */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Insights & Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">High Priority Prep</h3>
                  <p className="text-sm text-gray-700">You have 2 chats in the next 48 hours with prep below 50%. Focus on Sarah Chen and Michael Torres.</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Overdue Follow-up</h3>
                  <p className="text-sm text-gray-700">1 follow-up email is overdue. Send to Rachel Martinez today to maintain relationship momentum.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Jobs */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Upcoming Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingJobs.map(job => (
              <JobCard key={job.id} {...job} onToggleWishlist={toggleWishlist} isOnWishlist={jobWishlists[job.id]} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}