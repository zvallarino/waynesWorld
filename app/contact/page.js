"use client";

import React from "react";
import Shell from "@/components/layout/Shell";
import ContactForm from "@/components/body/ContactForm";

export default function Contact() {
  return (
    <Shell sideMarginPct={5}>
      <ContactForm />
    </Shell>
  );
}