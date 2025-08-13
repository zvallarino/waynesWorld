"use client";

import React from "react";
import Shell from "@/components/layout/Shell";
import EventsPage from "@/components/body/EventsPage";

export default function News() {
  return (
    <Shell sideMarginPct={5}>
      <EventsPage />
    </Shell>
  );
}