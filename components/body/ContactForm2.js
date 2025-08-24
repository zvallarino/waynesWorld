"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// ===== EASY TWEAKS (copied from your current form) =====
const UI = {
  sectionMinVh: 70,
  sectionPaddingY: { base: 24, md: 48 },
  cardMaxW: 640,
  cardMinH: 520,
  bgMobile: "/images/categories/portraits.JPEG",
  bgDesktop: "/images/categories/please.JPEG",
  overlayClass: "bg-black/25",
};
// =======================================================

const TO = process.env.NEXT_PUBLIC_CONTACT_TO || "bowenw1005@gmail.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "WaynesWorld";
const PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+19142784168";
const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "914-278-4168";

// EmailJS keys
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactForm2() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Initialize EmailJS once on mount
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const renderLabel = (label) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice("");
    setSubmitting(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      let msg = formData.message || "";
      if (msg.length > 1800) msg = msg.slice(0, 1800) + "\n\n[Message truncated]";

      // Must match your EmailJS template variable names
      const templateParams = {
        to_email: TO, // template's {{to_email}}
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email, // used for Reply-To in the template
        message: msg,
        site_name: SITE_NAME,
        time: new Date().toLocaleString(),
        // If you set the template BCC to {{bcc}}, you can enable this:
        // bcc: "zvallarino@gmail.com",
      };

      console.log("EmailJS sending with:", {
        service: EMAILJS_SERVICE_ID,
        template: EMAILJS_TEMPLATE_ID,
        to_email: TO,
      });

      const res = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      console.log("EmailJS response:", res); // expect { status: 200, text: "OK" }

      if (res.status === 200) {
        setNotice(
          "Thank you for contacting Wayne Bowen Art. We will reach out to you shortly."
        );
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        throw new Error("EmailJS returned a non-200 status.");
      }
    } catch (err) {
      console.error(err);
      setNotice(
        "We couldn’t send via EmailJS. You can try again or contact us directly below."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ minHeight: `${UI.sectionMinVh}dvh` }}
    >
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

      <div
        className="relative z-10 flex justify-center"
        style={{
          paddingTop: `${UI.sectionPaddingY.base}px`,
          paddingBottom: `${UI.sectionPaddingY.base}px`,
        }}
      >
        <div className="w-full" style={{ paddingTop: 0, paddingBottom: 0 }}>
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
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${TO}`}
                      className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                    >
                      Email us directly
                    </a>
                    <a
                      href={`tel:${PHONE}`}
                      className="inline-block rounded-md border px-3 py-1 hover:bg-gray-100"
                    >
                      Call {PHONE_DISPLAY}
                    </a>
                  </div>
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
                  {submitting ? "Sending…" : "Submit"}
                </button>

                <div className="text-center text-sm text-gray-600">
                  or email us directly at{" "}
                  <a
                    href={`mailto:${TO}`}
                    className="underline hover:no-underline"
                  >
                    {TO}
                  </a>{" "}
                  or call{" "}
                  <a
                    href={`tel:${PHONE}`}
                    className="underline hover:no-underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </form>
            </div>
          </div>

          <style jsx>{`
            @media (min-width: 768px) {
              div[style] + div {
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}