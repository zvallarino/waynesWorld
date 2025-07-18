import React from 'react';

function EventsPage() {
  const events = [
    // Upcoming Events (2)
    {
      date: '2025-12-20',
      location: 'New York, NY',
      time: '2:00 PM',
      description: 'Join us for the grand opening of the new "Horizons" landscape collection, featuring over twenty new pieces. Champagne and hors d\'oeuvres will be served.',
    },
    {
      date: '2025-09-10',
      location: 'Chicago, IL',
      time: '4:00 PM',
      description: 'A hands-on watercolor workshop focusing on atmospheric effects and light. All materials are provided, but space is limited. Includes a Q&A session afterwards.',
    },
    // Past Events (4)
    {
        date: '2025-07-15',
        location: 'Boston, MA',
        time: '7:00 PM',
        description: 'A special charity auction and gala where several exclusive prints were sold to support local arts education programs for underprivileged youth.',
    },
    {
      date: '2024-12-05',
      location: 'Los Angeles, CA',
      time: '6:00 PM',
      description: 'An intimate evening artist talk discussing the inspiration behind the "Urban Dreams" series, followed by a live painting session for all attendees.',
    },
    {
        date: '2024-09-22',
        location: 'Virtual Event',
        time: '3:00 PM',
        description: 'A live-streamed studio tour that gave viewers a behind-the-scenes look at the artistic process, current works-in-progress, and favorite tools.',
    },
    {
      date: '2023-11-11',
      location: 'Miami, FL',
      time: '1:00 PM',
      description: 'A comprehensive retrospective exhibition that showcased a curated selection of significant works spanning the last decade of the artist\'s career.',
    },
  ];

  // Logic to filter events based on the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for accurate comparison

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = events
    .filter(event => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderEventBox = (title, list) => (
    <div className="bg-white p-6 mb-6">
      {/* MODIFIED: Title is now black with a bottom border */}
      <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2 text-black">{title}</h3>
      <div className="flex flex-col">
        {list.length === 0 ? (
          <p className="text-gray-500">No events.</p>
        ) : (
          list.map((event, idx) => (
            // MODIFIED: Replaced full border with a bottom border on each item
            <div key={idx} className="border-b border-gray-200 py-4 last:border-b-0">
              <div className="font-semibold text-gray-800">{event.date} – {event.time}</div>
              <div className="italic text-sm text-gray-600">{event.location}</div>
              <p className="mt-2 text-gray-800">{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    // MODIFIED: Container is wider now
    <div className="max-w-3xl mx-auto p-6 rounded-lg  w-full  flex mt-20 ">
      <div>{renderEventBox('Upcoming Events', upcomingEvents)}</div>
         <div className='flex w-1/3 '> </div>
     <div> {renderEventBox('Past Events', pastEvents)}</div>
    </div>
  );
}

export default EventsPage;