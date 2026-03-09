import { Link } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Mail,
  Briefcase,
  Target,
  ArrowRight,
  Coffee,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Schedule coffee chats",
    description:
      "Add classmates, alumni, and recruiters in one place. Set date, time, and conversation objectives so you’re always prepared.",
  },
  {
    icon: Users,
    title: "Track every conversation",
    description:
      "See all upcoming chats at a glance. Jump into prep, notes, and follow-ups from a single command center.",
  },
  {
    icon: Mail,
    title: "Never miss a follow-up",
    description:
      "Deadlines for follow-up emails, prep tasks, and reflections. Stay on top of what’s due so no thread goes cold.",
  },
  {
    icon: Briefcase,
    title: "Job wishlist & pipeline",
    description:
      "Track target roles and companies. Link coffee chats to your wishlist and see progress toward application goals.",
  },
  {
    icon: Target,
    title: "Prep & strategy",
    description:
      "Define objectives, track prep completion, and capture post-chat reflections so each conversation moves the needle.",
  },
  {
    icon: LayoutDashboard,
    title: "One recruiting dashboard",
    description:
      "Metrics, upcoming chats, active wishlists, and deadlines in one view. Built for MBAs and anyone serious about networking.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23030213' fill-opacity='1' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero */}
      <header className="relative border-b border-amber-900/10 bg-gradient-to-b from-amber-50/80 to-[#faf9f7] px-6 pt-16 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/90 px-4 py-1.5 text-sm font-medium text-amber-900/90">
            <Coffee className="size-4" aria-hidden />
            Coffee chat command center
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Organize every coffee chat.
            <br />
            <span className="text-amber-800">Never lose the thread.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Schedule, track, and follow up on coffee chats with classmates,
            alumni, and recruiters—all in one place. Stay on top of networking
            without the spreadsheet chaos.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
            >
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features */}
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Everything you need to own recruiting
          </h2>
          <p className="mt-3 text-gray-600">
            One place for scheduling, prep, follow-ups, and your job pipeline.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border-amber-900/10 bg-white/80 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-800">
                  <Icon className="size-5" aria-hidden />
                </div>
                <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl border border-amber-900/10 bg-gradient-to-br from-amber-50/90 to-white px-8 py-12 text-center shadow-sm md:py-16">
          <h3 className="text-xl font-semibold text-gray-900 md:text-2xl">
            Ready to take control of your coffee chats?
          </h3>
          <p className="mt-2 text-gray-600">
            Open your dashboard and start organizing.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 gap-2 bg-gray-900 text-white hover:bg-gray-800"
          >
            <Link to="/dashboard">
              Go to Dashboard
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            CoffeeChatly — built for MBAs and anyone serious about networking.
          </p>
          <div className="flex gap-6">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
