export function formatDate(input: number | string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
export function getYear(input: number | string): number {
  const date = new Date(input);
  return date.getFullYear();
}
export function getMnY(input: Date): string {
  const date = new Date(input);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const my = `${month} ${year}`;
  return my;
}
export function getTime(input: number | string) {
  const date = new Date(input);
  const n = date.toLocaleString([], {
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

export function formatDateXtra(date: string) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

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
