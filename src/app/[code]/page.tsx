import { redirect } from "next/navigation";
import React from "react";
import { getOriginalUrlAndIncrementClicks } from "@/services/services";
import DelayRedirectClient from "./delay";

interface UrlEntry {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function BeforeRedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: shortCode } = await params;

  if (!shortCode) {
    console.warn(
      "GET request to /[code] without a code. Redirecting to homepage..."
    );
    redirect("/");
  }

  let urlEntry: UrlEntry | null = null;

  try {
    urlEntry = await getOriginalUrlAndIncrementClicks(shortCode);
  } catch (error) {
    console.error(`Error retrieving URL for short code "${shortCode}":`, error);
    redirect("/error");
  }

  if (!urlEntry || !urlEntry.originalUrl) {
    console.error(
      `Short code "${shortCode}" not found. Redirecting to /not-found...`
    );
    redirect("/not-found");
  }

  return (
    <DelayRedirectClient originalUrl={urlEntry.originalUrl} delaySeconds={5} />
  );
}
