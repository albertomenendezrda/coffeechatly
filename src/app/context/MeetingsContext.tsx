import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Meeting {
  id: number;
  name: string;
  company: string;
  role: string;
  date: string;
  time: string;
  objective: string;
  prepProgress: number;
}

const initialMeetings: Meeting[] = [
  { id: 1, name: "Sarah Chen", company: "McKinsey & Company", role: "Senior Engagement Manager", date: "Mar 3, 2026", time: "2:00 PM", objective: "Secure referral for Summer Associate role", prepProgress: 75 },
  { id: 2, name: "Michael Torres", company: "Bain Capital", role: "Principal", date: "Mar 4, 2026", time: "10:30 AM", objective: "Understand PE recruiting timeline and cultural fit", prepProgress: 45 },
  { id: 3, name: "Jessica Park", company: "BCG", role: "Project Leader", date: "Mar 5, 2026", time: "3:30 PM", objective: "Learn about practice area specifics and case prep insights", prepProgress: 30 },
  { id: 4, name: "David Kumar", company: "Google", role: "Product Manager", date: "Mar 6, 2026", time: "11:00 AM", objective: "Validate PM transition from consulting background", prepProgress: 0 },
];

interface MeetingsContextValue {
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, "id" | "prepProgress">) => Meeting;
}

const MeetingsContext = createContext<MeetingsContextValue | null>(null);

export function MeetingsProvider({ children }: { children: ReactNode }) {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);

  const addMeeting = useCallback((meeting: Omit<Meeting, "id" | "prepProgress">) => {
    const nextId = meetings.length ? Math.max(...meetings.map((m) => m.id)) + 1 : 1;
    const newMeeting: Meeting = { ...meeting, id: nextId, prepProgress: 0 };
    setMeetings((prev) => [...prev, newMeeting]);
    return newMeeting;
  }, [meetings]);

  return (
    <MeetingsContext.Provider value={{ meetings, addMeeting }}>
      {children}
    </MeetingsContext.Provider>
  );
}

export function useMeetings() {
  const ctx = useContext(MeetingsContext);
  if (!ctx) throw new Error("useMeetings must be used within MeetingsProvider");
  return ctx;
}
