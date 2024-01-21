type SessionData = {
  id: string;
  title: string;
  description: string;
  buttons: string[];
  sessionCode: string;
  pin: number;
};

interface TimelineEventProps {
  eventId: number;
  eventName: string;
  eventType: string;
  content: string;
  userId: string;
  timestamp: string;
}

interface VerticalTimelineProps {
  events: TimelineEventProps[];
}
