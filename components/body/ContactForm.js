
"use client"
import React, { useState } from 'react';
import Image from 'next/image';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  const renderLabel = (label) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
  );

  return (
    // REVERTED: Removed `overflow-x-hidden`. No changes needed here.
    <div className="relative min-h-dvh w-full flex items-start md:items-center justify-center p-4 pt-16 md:pt-4">
      {/* Background Images */}
      <Image
        src="/images/categories/Sceneries/oceanwaves.jpg"
        alt="Ocean waves background"
        fill
        className="object-cover -z-10 block md:hidden" 
      />
      <Image
        src="/images/categories/urban scenarios.JPEG"
        alt="Abstract background"
        fill
        className="object-cover -z-10 hidden md:block"
      />
      
      {/* Form Container */}
      <div className="w-full max-w-2xl p-6 md:p-8 space-y-4 md:space-y-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl">
        <h2 className="text-6xl md:text-8xl font-thin tracking-tight mb-4 text-center text-black">
          Contact
        </h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {renderLabel('First Name')}
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
                required
              />
            </div>
            <div>
              {renderLabel('Last Name')}
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
                required
              />
            </div>
          </div>
          <div>
            {renderLabel('Email')}
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
              required
            />
          </div>
          <div>
            {renderLabel('Message')}
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;