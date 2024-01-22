import { Play, Timer } from "lucide-react";

const TimelineEvent: React.FC<TimelineEventProps> = ({
  eventId,
  eventName,
  eventType,
  content,
  userId,
  timestamp,
}) => (
  <div className="flex mb-4">
    <div className="mr-4 p-4 border-l-2 border-gray-500 flex space-x-1 items-center justify-center">
      <Timer className="w-4" />
      <span className="text-sm">{timestamp}</span>
    </div>
    <div className="text-left bg-primary-foreground p-4 rounded-md drop-shadow-sm">
      <h4 className="text-lg font-semibold">{eventName}</h4>
      <p className="text-sm text-primary/50">{content}</p>
    </div>
  </div>
);

const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ events }) => {
  return (
    <div className="flex flex-col items-start h-full pr-3">
      <div className="border-l-2 border-gray-500 w-40 h-full">
        <Play className="w-4 h-4" />
      </div>
      {events.map((event, index) => (
        <TimelineEvent key={index} {...event} />
      ))}
    </div>
  );
};

export default VerticalTimeline;
