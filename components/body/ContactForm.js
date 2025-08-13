"use client";
import React, { useState } from "react";
import Image from "next/image";

const TO = process.env.NEXT_PUBLIC_CONTACT_TO || "bowenw1005@gmail.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "WaynesWorld";

// phone for tel: link (E.164) + display string
const PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+19142784168";
const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "914-278-4168";

function buildMailto({ to, subject, body }) {
  return (
    `mailto:${encodeURIComponent(to)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

function gmailCompose({ to, subject, body }) {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

function outlookCompose({ to, subject, body }) {
  return (
    "https://outlook.office.com/mail/deeplink/compose?" +
    `to=${encodeURIComponent(to)}` +
    `&subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

function yahooCompose({ to, subject, body }) {
  return (
    "https://compose.mail.yahoo.com/?" +
    `to=${encodeURIComponent(to)}` +
    `&subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const renderLabel = (label) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setNotice("");

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const subject = `Contact: ${fullName} (${SITE_NAME})`;

    const lines = [
      `Name: ${fullName}`,
      `Email: ${formData.email}`,
      "",
      formData.message || "",
    ];
    let body = lines.join("\n");

    // keep mailto URLs within safe length
    const MAX_BODY = 1800;
    if (body.length > MAX_BODY) {
      body = body.slice(0, MAX_BODY) + "\n\n[Message truncated]";
    }

    const payload = { to: TO, subject, body };
    const href = buildMailto(payload);
    setMailtoHref(href);

    // try to open the default mail app
    try {
      window.location.href = href;
    } catch {}

    // show visible fallbacks immediately
    setNotice(
      "If your email app didn’t open, choose one of the options below or copy the message."
    );

    // helpful clipboard fallback
    try {
      await navigator.clipboard?.writeText(
        `To: ${TO}\nSubject: ${subject}\n\n${formData.message || ""}`
      );
    } catch {}

    // reset form fields
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-dvh w-full flex items-start md:items-center justify-center p-4 pt-16 md:pt-4">
      {/* Background Images */}
      <Image
        src="/images/categories/Sceneries/oceanwaves.jpg"
        alt="Ocean waves background"
        fill
        className="object-cover -z-10 block md:hidden"
        priority
      />
      <Image
        src="/images/categories/urban scenarios.JPEG"
        alt="Abstract background"
        fill
        className="object-cover -z-10 hidden md:block"
        priority
      />

      {/* Form Container */}
      <div className="w-full max-w-2xl p-6 md:p-8 space-y-4 md:space-y-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl">
        <h2 className="text-6xl md:text-8xl font-thin tracking-tight mb-4 text-center text-black">
          Contact
        </h2>

        {notice ? (
          <div className="space-y-2 rounded-md p-3 bg-gray-50 border border-gray-200 text-gray-800 text-sm">
            <div>{notice}</div>
            {mailtoHref ? (
              <div className="flex flex-wrap gap-2">
                <a
                  href={mailtoHref}
                  className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  Open in default email app
                </a>
                <a
                  href={gmailCompose({ to: TO, subject: `Contact: ${SITE_NAME}`, body: "" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  Open Gmail
                </a>
                <a
                  href={outlookCompose({ to: TO, subject: `Contact: ${SITE_NAME}`, body: "" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  Open Outlook
                </a>
                <a
                  href={yahooCompose({ to: TO, subject: `Contact: ${SITE_NAME}`, body: "" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  Open Yahoo Mail
                </a>
                {/* New: quick call button */}
                <a
                  href={`tel:${PHONE}`}
                  className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            ) : null}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {renderLabel("First Name")}
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
              {renderLabel("Last Name")}
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
            {renderLabel("Email")}
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
            {renderLabel("Message")}
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300 disabled:opacity-60"
          >
            {submitting ? "Opening your email…" : "Submit"}
          </button>

          {/* Updated direct contact line with phone */}
          <div className="text-center text-sm text-gray-600">
            or email me directly at{" "}
            <a href={`mailto:${TO}`} className="underline hover:no-underline">
              {TO}
            </a>{" "}
            or at{" "}
            <a href={`tel:${PHONE}`} className="underline hover:no-underline">
              {PHONE_DISPLAY}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}