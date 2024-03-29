export function formatDate(input: string | number | Date) {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
export function getYear(input: number | string): number {
	const date = new Date(input);
	return date.getFullYear();
}
export function getMnY(input: Date): string {
	const date = new Date(input);
	let month = date.toLocaleString("default", { month: "long" });
	let year = date.getFullYear();
	const my = `${month} ${year}`;
	return my;
}
export function getTime(input: number | string) {
	const date = new Date(input);
	let n = date.toLocaleString([], {
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
