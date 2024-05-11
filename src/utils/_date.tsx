export function formatDate(input: number | string): string {
  const d = new Date(input);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function dayAndMonth(input: number | string): string {
  const d = new Date(input);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export const mnyShort = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(date));
export function getYear(input: number | string): number {
  const d = new Date(input);
  return d.getFullYear();
}
export function mnyLong(input: Date): string {
  const d = new Date(input);
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();
  const my = `${month} ${year}`;
  return my;
}
export function getTime(input: number | string) {
  const d = new Date(input);
  const n = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return n;
}

export const isAfter = (dateA: Date, dateB: Date) => dateA > dateB;

export const compareDesc = (dateA: Date, dateB: Date) => {
  if (dateA.getTime() === dateB.getTime()) return 0;
  return dateA > dateB ? -1 : 1;
};

export function formatDateXtra(d: string) {
  let t = d;
  const currentDate = new Date();
  if (!t.includes("T")) {
    t = `${d}T00:00:00`;
  }
  const targetDate = new Date(d);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}
