import { redirect } from "next/navigation";
import React from "react";
import { getOriginalUrlAndIncrementClicks } from "@/services/url.service.js";
import DelayRedirectClient from "./delay.url";

export default async function BeforeRedirectPage({ params }) {
  const shortCode = params.code;

  if (!shortCode) {
    console.warn(
      "GET request to /[code] without a code. Redirecting to homepage..."
    );
    redirect("/");
  }

  let urlEntry = null;

  try {
    urlEntry = await getOriginalUrlAndIncrementClicks(shortCode);
  } catch (error) {
    console.error(`Error retrieving URL for short code "${shortCode}":`, error);
    redirect("/error");
  }

  if (!urlEntry || !urlEntry.originalUrl) {
    console.log(
      `Short code "${shortCode}" not found. Redirecting to /not-found...`
    );
    redirect("/not-found");
  }
  return (
    <DelayRedirectClient originalUrl={urlEntry.originalUrl} delaySeconds={5} />
  );
}
