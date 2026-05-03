export const getUserTimezone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const getLocale = (): string =>
  typeof navigator !== "undefined" ? navigator.language : "en-US";

export const convertUTCTimeToLocal = (
  dateISO: string,
  time24: string,
): Date => {
  const [hour, minute] = time24.split(":").map(Number);
  const [year, month, day] = dateISO.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
};

export const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(getLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatShortDate = (iso: string): string => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(getLocale(), {
    month: "short",
    day: "numeric",
  });
};

// Handles both ISO strings and HH:MM format
export const formatTime = (time24: string, dateISO?: string): string => {
  // If it's an ISO string, parse directly — browser converts to local automatically
  if (time24.includes("T")) {
    return new Date(time24).toLocaleTimeString(getLocale(), {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const date = dateISO
    ? convertUTCTimeToLocal(dateISO, time24)
    : (() => {
        const d = new Date();
        const [h, m] = time24.split(":").map(Number);
        d.setHours(h, m, 0, 0);
        return d;
      })();

  return date.toLocaleTimeString(getLocale(), {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatTimestamp = (isoTimestamp: string): string => {
  return new Date(isoTimestamp).toLocaleDateString(getLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Handles both ISO strings and HH:MM format
export const isUpcoming = (date: string, startTime: string): boolean => {
  if (startTime.includes("T")) {
    return new Date(startTime) > new Date();
  }
  const slotUTC = convertUTCTimeToLocal(date, startTime);
  return slotUTC > new Date();
};

// Extract local YYYY-MM-DD and HH:MM from ISO or plain HH:MM
// Use this before sending time to backend
export const extractLocalDateTime = (
  date: string,
  time: string,
): { bookingDate: string; bookingTime: string } => {
  if (time.includes("T")) {
    const dt = new Date(time);
    return {
      bookingDate: dt.toLocaleDateString("en-CA"), // YYYY-MM-DD
      bookingTime: `${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`,
    };
  }
  return { bookingDate: date, bookingTime: time };
};
