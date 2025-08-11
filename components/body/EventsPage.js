import React from 'react';

function EventsPage() {
  // Unified data model: startDate + (optional) endDate
  const events = [
    // Ongoing / Upcoming (2)
    {
      startDate: '2025-10-02',
      endDate: '2025-10-28', // range (Uostream Gallery)
      location: 'Uostream Gallery',
      time: '', // optional
      title: 'A Touch of Realism',
      description: 'Hastings on the Hudson, New York, NY',
    },
    {
      startDate: '2025-09-10',
      // endDate omitted => open-ended; treated as ongoing once startDate <= today
      location: 'The Fine Arts Gallery in Bronxville',
      time: '4:00 PM',
      title: '', // if empty, we’ll fall back to location
      description: 'Currently on display.',
    },

    // Past Events (4) — single-day events: start = end
    {
      startDate: '2025-07-15',
      endDate: '2025-07-15',
      location: 'Boston, MA',
      time: '7:00 PM',
      title: '',
      description:
        'A special charity auction and gala where several exclusive prints were sold to support local arts education programs for underprivileged youth.',
    },
    {
      startDate: '2024-12-05',
      endDate: '2024-12-05',
      location: 'Los Angeles, CA',
      time: '6:00 PM',
      title: '',
      description:
        'An intimate evening artist talk discussing the inspiration behind the "Urban Dreams" series, followed by a live painting session for all attendees.',
    },
    {
      startDate: '2024-09-22',
      endDate: '2024-09-22',
      location: 'Virtual Event',
      time: '3:00 PM',
      title: '',
      description:
        'A live-streamed studio tour that gave viewers a behind-the-scenes look at the artistic process, current works-in-progress, and favorite tools.',
    },
    {
      startDate: '2023-11-11',
      endDate: '2023-11-11',
      location: 'Miami, FL',
      time: '1:00 PM',
      title: '',
      description:
        "A comprehensive retrospective exhibition that showcased a curated selection of significant works spanning the last decade of the artist's career.",
    },
  ];

  // ---- Helpers ----
  const toMidnight = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const today = toMidnight(new Date());

  const parse = (iso) => (iso ? toMidnight(new Date(iso)) : null);

  const formatDate = (date) =>
    date?.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });

  const formatRange = (startISO, endISO) => {
    const s = parse(startISO);
    const e = parse(endISO);
    if (!s && !e) return '';
    if (s && !e) return `${formatDate(s)} – Ongoing`;
    if (s && e && s.getTime() === e.getTime()) return `${formatDate(s)}`;
    return `${formatDate(s)} – ${formatDate(e)}`;
  };

  const isOngoing = (ev) => {
    const s = parse(ev.startDate);
    const e = parse(ev.endDate); // can be null (open-ended)
    return s && s <= today && (!e || today <= e);
  };

  const isUpcoming = (ev) => {
    const s = parse(ev.startDate);
    return s && s > today;
  };

  const isPast = (ev) => {
    const e = parse(ev.endDate ?? ev.startDate);
    return e && e < today;
  };

  // ---- Buckets ----
  const ongoingEvents = events
    .filter(isOngoing)
    .sort((a, b) => parse(a.startDate) - parse(b.startDate));

  const upcomingEvents = events
    .filter(isUpcoming)
    .sort((a, b) => parse(a.startDate) - parse(b.startDate));

  const pastEvents = events
    .filter(isPast)
    .sort((a, b) => parse(b.endDate ?? b.startDate) - parse(a.endDate ?? a.startDate));

  // Combine ongoing first, then upcoming
  const eventsToShow = [...ongoingEvents, ...upcomingEvents];

  // ---- UI ----
  const EventCard = ({ ev }) => {
    const range = formatRange(ev.startDate, ev.endDate ?? ev.startDate);
    const title = ev.title?.trim() || ev.location; // fallback to location if no title
    return (
      <div className="border-b border-gray-200 py-4 last:border-b-0">
        <div className="font-semibold text-gray-800">
          {range}
          {ev.time ? ` · ${ev.time}` : ''}
        </div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="italic text-sm text-gray-600">{ev.location}</div>
        {ev.description ? <p className="mt-2 text-gray-800">{ev.description}</p> : null}
      </div>
    );
  };

  const renderEventBox = (title, list) => (
    <div className="bg-white p-6 shadow-lg rounded-md">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2 text-black">{title}</h3>
      <div className="flex flex-col">
        {list.length === 0 ? (
          <p className="text-gray-500">No events.</p>
        ) : (
          list.map((ev, idx) => <EventCard key={idx} ev={ev} />)
        )}
      </div>
    </div>
  );

  return (
    // Responsive: column on mobile, two columns on md+
    <div className="max-w-6xl mx-auto p-4 w-full flex flex-col md:flex-row gap-8 mt-10 md:mt-20">
      <div className="w-full md:w-1/2">
        {renderEventBox('Events', eventsToShow)}
      </div>
      <div className="w-full md:w-1/2">
        {renderEventBox('Past Events', pastEvents)}
      </div>
    </div>
  );
}

export default EventsPage;