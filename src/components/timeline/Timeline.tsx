import { useState } from 'react'
import TimelineNode from './TimelineNode'
import { Event } from '@/lib/types';

const events: Event[] = [
    { id: 1, date: new Date('2023-03-15'), title: 'Started a new project', content: 'Began working on a revolutionary app idea.' },
    { id: 2, date: new Date('2023-05-20'), title: 'Completed MVP', content: 'Finished the minimum viable product for our app.' },
    { id: 3, date: new Date('2023-08-01'), title: 'Secured Funding', content: 'Received seed funding from a prominent investor.' },
    { id: 4, date: new Date('2023-11-10'), title: 'Beta Launch', content: 'Successfully launched the beta version of our app.' },
    { id: 5, date: new Date('2024-02-14'), title: 'Valentine\'s Day Special', content: 'Ran a successful promotional campaign.' },
    { id: 6, date: new Date('2024-06-30'), title: 'First Million Users', content: 'Celebrated reaching our first million users!' },
    { id: 7, date: new Date('2024-10-01'), title: 'Company Anniversary', content: 'Celebrated our first year as a company.' },
]

export default function Timeline() {
    const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set())

    const toggleMonth = (month: string) => {
        setExpandedMonths(prev => {
            const newSet = new Set(prev)
            if (newSet.has(month)) {
                newSet.delete(month)
            } else {
                newSet.add(month)
            }
            return newSet
        })
    }

    const groupedEvents = events.reduce((acc, event) => {
        const month = event.date.toISOString().slice(0, 7)
        if (!acc[month]) {
            acc[month] = []
        }
        acc[month].push(event)
        return acc
    }, {} as Record<string, Event[]>)

    const months = Object.keys(groupedEvents).sort((a, b) => b.localeCompare(a))

    return (
        <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
            {months.map(month => (
                <TimelineNode
                    key={month}
                    month={month}
                    events={groupedEvents[month]}
                    isExpanded={expandedMonths.has(month)}
                    onToggle={() => toggleMonth(month)}
                />
            ))}
        </div>
    )
}

