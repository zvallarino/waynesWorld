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
    // You can add your form submission logic here (e.g., sending to an API)
    alert('Thank you for your message!');
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  // A helper component for required fields to keep the code clean
  const renderLabel = (label) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Image */}
      <Image
        src="/images/categories/stills2.jpg"
        alt="Abstract background"
        fill
        className="object-cover -z-10" // Pushes the image behind the content
      />
      
      {/* Form Container */}
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl">
        <h2 className="text-7xl md:text-8xl font-thin tracking-tight mb-6 text-center text-black">
          Contact
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
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
            {/* Last Name */}
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

          {/* Email */}
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

          {/* Message */}
          <div>
            {renderLabel('Message')}
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
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