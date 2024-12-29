import { Event } from '@/lib/types';

interface EventCardProps {
    event: Event
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">{event.content}</p>
            <p className="text-sm text-gray-500">{event.date.toLocaleDateString()}</p>
        </div>
    )
}

