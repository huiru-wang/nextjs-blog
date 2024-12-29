import { ChevronDown, ChevronUp } from 'lucide-react'
import EventCard from '@/components/timeline/EventCard';
import { Event } from '@/lib/types';

interface TimelineNodeProps {
    month: string
    events: Event[]
    isExpanded: boolean
    onToggle: () => void
}

export default function TimelineNode({ month, events, isExpanded, onToggle }: TimelineNodeProps) {
    const formattedMonth = new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })

    return (
        <div className="mb-8">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full -ml-[18px] mr-4"></div>
                <h2 className="text-xl font-semibold flex-grow">{formattedMonth}</h2>
                <button onClick={onToggle} className="text-gray-500 hover:text-gray-700">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>
            {isExpanded && (
                <div className="pl-6 space-y-4">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    )
}

