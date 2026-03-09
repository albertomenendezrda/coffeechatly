import { Calendar, TrendingUp, Users, Target, Briefcase, ChevronRight } from "lucide-react";
import { MeetingCard } from "../components/MeetingCard";
import { DeadlineCard } from "../components/DeadlineCard";
import { MetricCard } from "../components/MetricCard";
import { WishlistJobCard } from "../components/WishlistJobCard";
import { JobCard } from "../components/JobCard";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../components/ui/sheet";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useMeetings } from "../context/MeetingsContext";
import { useState } from "react";
import { useNavigate } from "react-router";

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

const defaultForm = {
  name: "",
  company: "",
  role: "",
  date: "",
  time: "",
  objective: "",
};

export default function Dashboard() {
  const { meetings, addMeeting } = useMeetings();
  const navigate = useNavigate();
  const [jobWishlists, setJobWishlists] = useState(
    upcomingJobs.reduce((acc, job) => ({ ...acc, [job.id]: job.isOnWishlist }), {})
  );
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const toggleWishlist = (jobId: number) => {
    setJobWishlists(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.date.trim() || !form.time.trim()) return;
    const newMeeting = addMeeting({
      name: form.name.trim(),
      company: form.company.trim(),
      role: form.role.trim() || "—",
      date: form.date.trim(),
      time: form.time.trim(),
      objective: form.objective.trim() || "—",
    });
    setForm(defaultForm);
    setScheduleOpen(false);
    navigate(`/chat/${newMeeting.id}`);
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
              <Button
                onClick={() => setScheduleOpen(true)}
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                + Schedule New Chat
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Schedule New Chat Sheet */}
      <Sheet open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Schedule New Chat</SheetTitle>
            <SheetDescription>
              Add a new coffee chat. You can fill in prep details from the chat page after saving.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4 mt-6 px-1">
            <div className="space-y-2">
              <Label htmlFor="schedule-name">Contact name *</Label>
              <Input
                id="schedule-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Sarah Chen"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-company">Company *</Label>
              <Input
                id="schedule-company"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="e.g. McKinsey & Company"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-role">Role</Label>
              <Input
                id="schedule-role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="e.g. Senior Engagement Manager"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Date *</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-time">Time *</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-objective">Conversation objective</Label>
              <Input
                id="schedule-objective"
                value={form.objective}
                onChange={(e) => setForm((f) => ({ ...f, objective: e.target.value }))}
                placeholder="e.g. Secure referral for Summer Associate role"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1 bg-gray-900 hover:bg-gray-800">
                Save & open chat
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setScheduleOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

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
              <span className="text-sm text-gray-600">{meetings.length} scheduled</span>
            </div>
            <div className="space-y-3">
              {meetings.map(meeting => (
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