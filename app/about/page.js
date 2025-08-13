"use client";

import React from "react";
import Shell from "@/components/layout/Shell";
import AboutText from "@/components/body/AboutText";

export default function About() {
  return (
    <Shell sideMarginPct={5}>
      <AboutText />
    </Shell>
  );
}