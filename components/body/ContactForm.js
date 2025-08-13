"use client";
import React, { useState } from "react";
import Image from "next/image";

// ===== EASY TWEAKS =====
const UI = {
  // section height just under the toolbar
  sectionMinVh: 70,              // background area height (in viewport %)
  sectionPaddingY: { base: 24, md: 48 }, // top/bottom padding for where the card sits
  // card sizing for a squarer look
  cardMaxW: 640,                 // px
  cardMinH: 520,                 // px (keeps it “windowy”)
  // background images
  bgMobile: "/images/categories/portraits.JPEG",
  bgDesktop: "/images/categories/please.JPEG",
  // tint over image for readability
  overlayClass: "bg-black/25",
};
// =======================

const TO = process.env.NEXT_PUBLIC_CONTACT_TO || "bowenw1005@gmail.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "WaynesWorld";
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
const gmailCompose = ({ to, subject, body }) =>
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const outlookCompose = ({ to, subject, body }) =>
  "https://outlook.office.com/mail/deeplink/compose?to=" +
  `${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const yahooCompose = ({ to, subject, body }) =>
  "https://compose.mail.yahoo.com/?to=" +
  `${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function ContactForm() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const renderLabel = (label) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setNotice("");

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const subject = `Contact: ${fullName} (${SITE_NAME})`;
    const lines = [`Name: ${fullName}`, `Email: ${formData.email}`, "", formData.message || ""];
    let body = lines.join("\n");
    if (body.length > 1800) body = body.slice(0, 1800) + "\n\n[Message truncated]";

    const href = buildMailto({ to: TO, subject, body });
    setMailtoHref(href);
    try { window.location.href = href; } catch {}

    setNotice("If your email app didn’t open, choose one of the options below or copy the message.");
    try {
      await navigator.clipboard?.writeText(`To: ${TO}\nSubject: ${subject}\n\n${formData.message || ""}`);
    } catch {}

    setFormData({ firstName: "", lastName: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    // SECTION with background image directly under the toolbar (inside Shell's <main>)
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ minHeight: `${UI.sectionMinVh}dvh` }}
    >
      {/* Background image INSIDE this section (not fixed, not full-page) */}
      <Image
        src={UI.bgMobile}
        alt="Background"
        fill
        priority
        className="object-cover md:hidden"
        sizes="100vw"
      />
      <Image
        src={UI.bgDesktop}
        alt="Background"
        fill
        priority
        className="hidden md:block object-cover"
        sizes="100vw"
      />
      <div className={`absolute inset-0 ${UI.overlayClass}`} />

      {/* Content on top of the background */}
      <div
        className="relative z-10 flex justify-center"
        style={{
          paddingTop: `${UI.sectionPaddingY.base}px`,
          paddingBottom: `${UI.sectionPaddingY.base}px`,
        }}
      >
        <div
          className="w-full"
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {/* The squarer “window” form card */}
          <div
            className="mx-auto bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-black/10 rounded-2xl"
            style={{ maxWidth: UI.cardMaxW, minHeight: UI.cardMinH }}
          >
            <div className="p-6 md:p-8">
              <h2 className="text-5xl md:text-6xl font-thin tracking-tight mb-6 text-center text-black">
                Contact
              </h2>

              {notice ? (
                <div className="space-y-2 rounded-md p-3 bg-gray-50 border border-gray-200 text-gray-800 text-sm mb-4">
                  <div>{notice}</div>
                  {mailtoHref ? (
                    <div className="flex flex-wrap gap-2">
                      <a href={mailtoHref} className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100">
                        Open in default email app
                      </a>
                      <a
                        href={gmailCompose({ to: TO, subject: `Contact: ${SITE_NAME}`, body: "" })}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                      >
                        Open Gmail
                      </a>
                      <a
                        href={outlookCompose({ to: TO, subject: `Contact: ${SITE_NAME}`, body: "" })}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                      >
                        Open Outlook
                      </a>
                      <a
                        href={yahooCompose({ to: TO, subject: `Contact: ${SITE_NAME}`, body: "" })}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                      >
                        Open Yahoo Mail
                      </a>
                      <a href={`tel:${PHONE}`} className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100">
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
                      id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    {renderLabel("Last Name")}
                    <input
                      id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  {renderLabel("Email")}
                  <input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  {renderLabel("Message")}
                  <textarea
                    id="message" name="message" rows="4" value={formData.message} onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none transition"
                    required
                  />
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300 disabled:opacity-60"
                >
                  {submitting ? "Opening your email…" : "Submit"}
                </button>

                <div className="text-center text-sm text-gray-600">
                  or email me directly at{" "}
                  <a href={`mailto:${TO}`} className="underline hover:no-underline">{TO}</a>{" "}
                  or at{" "}
                  <a href={`tel:${PHONE}`} className="underline hover:no-underline">{PHONE_DISPLAY}</a>
                </div>
              </form>
            </div>
          </div>

          {/* responsive top/bottom padding on md+ */}
          <style jsx>{`
            @media (min-width: 768px) {
              div[style] + div { /* noop */ }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}