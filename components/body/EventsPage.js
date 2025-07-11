import React from 'react';

function EventsPage() {
  const events = [
    {
      date: '2025-07-20',
      location: 'New York, NY',
      time: '2:00 PM',
      description: 'Gallery opening for new landscape collection.',
    },
    {
      date: '2024-12-05',
      location: 'Los Angeles, CA',
      time: '6:00 PM',
      description: 'Artist talk and live painting session.',
    },
    {
      date: '2025-08-10',
      location: 'Chicago, IL',
      time: '4:00 PM',
      description: 'Watercolor workshop and Q&A.',
    },
    {
      date: '2023-11-11',
      location: 'Miami, FL',
      time: '1:00 PM',
      description: 'Retrospective exhibition of selected works.',
    },
  ];

  const today = new Date();

  const upcomingEvents = events.filter(event => new Date(event.date) >= today);
  const pastEvents = events.filter(event => new Date(event.date) < today);

  const renderEventBox = (title, list) => (
    <div className="bg-white p-4 shadow-md rounded mb-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex flex-col gap-4">
        {list.length === 0 ? (
          <p className="text-gray-500">No events.</p>
        ) : (
          list.map((event, idx) => (
            <div key={idx} className="border border-gray-200 p-3 rounded">
              <div className="font-semibold">{event.date} – {event.time}</div>
              <div className="italic text-sm">{event.location}</div>
              <div className="mt-1">{event.description}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Events</h2>
      {renderEventBox('Upcoming Events', upcomingEvents)}
      {renderEventBox('Past Events', pastEvents)}
    </div>
  );
}

export default EventsPage;