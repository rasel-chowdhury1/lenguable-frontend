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

export const formatTime = (time24: string, dateISO?: string): string => {
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

export const isUpcoming = (date: string, startTime: string): boolean => {
  const slotUTC = convertUTCTimeToLocal(date, startTime);
  return slotUTC > new Date();
};
