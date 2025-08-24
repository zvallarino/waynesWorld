"use client";

import React from "react";
import Shell from "@/components/layout/Shell";
import ContactForm2 from "@/components/body/ContactForm2";

export default function Contact() {
  return (
    <Shell sideMarginPct={5}>
      <ContactForm2 />
    </Shell>
  );
}