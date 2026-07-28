"use client";

import { useState } from "react";

const PRE_FETCH_ENDPOINT = "https://api.villeto.com/onboardings/pre-fetch";
const REGISTRATION_URL = "https://app.villeto.com/pre-onboarding/registration";
const VERIFY_OTP_URL = "https://app.villeto.com/pre-onboarding/verify-otp";
export const GET_STARTED_URL = "https://app.villeto.com/pre-onboarding";

export function useEmailOnboarding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(email: string) {
    const trimmed = email.trim();

    // If no email entered, navigate straight to pre-onboarding
    if (!trimmed) {
      window.location.href = GET_STARTED_URL;
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(PRE_FETCH_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const json = await res.json();

      if (res.status === 404 || json?.status === 404) {
        // New user — send to registration with email pre-filled
        const url = new URL(REGISTRATION_URL);
        url.searchParams.set("email", trimmed);
        window.location.href = url.toString();
      } else if (res.status === 200 || json?.status === 200) {
        // Existing user — send to OTP verification with email pre-filled
        const url = new URL(VERIFY_OTP_URL);
        url.searchParams.set("email", trimmed);
        window.location.href = url.toString();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
