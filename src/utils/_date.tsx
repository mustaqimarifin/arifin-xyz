export function formatDate(input: string): string {
  const d = new Date(input)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export function dayAndMonth(input: string) {
  const d = new Date(input)
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  })
}

export const mnyShort = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(date))
export function getYear(input: number | string): number {
  const d = new Date(input)
  return d.getFullYear()
}
export function mnyLong(input: Date): string {
  const d = new Date(input)
  const month = d.toLocaleString('default', { month: 'long' })
  const year = d.getFullYear()
  const my = `${month} ${year}`
  return my
}
export function getTime(input: number | string) {
  const d = new Date(input)
  const n = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  return n
}

export const isAfter = (dateA: Date, dateB: Date) => dateA > dateB

export const compareDesc = (dateA: Date, dateB: Date) => {
  return dateA > dateB ? -1 : 1
}

export const compareDescS = (dateA: string, dateB: string) => {
  return dateA > dateB ? -1 : 1
}

export function formatDateXtra(d: string) {
  return `${fullDate(d)} ${timeAgo(d)}`
}

/* const differenceInHours = (dateA, dateB) =>
  Math.trunc(dateA - dateB / (1000 * 60 * 60))

const differenceInDays = (dateA, dateB) =>
  Math.round(dateA - dateB / (1000 * 60 * 60 * 24))

const differenceInMinutes = (dateA, dateB) =>
  Math.trunc(dateA - dateB / (1000 * 60))

const differenceInSeconds = (dateA, dateB) => Math.trunc(dateA - dateB / 1000) */

export function timeAgo(d: string) {
  let t = d
  const currentDate = new Date()
  if (!t.includes('T')) {
    t = `${d}T00:00:00`
  }
  const targetDate = new Date(d)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDay() - targetDate.getDay()
  const hoursAgo = currentDate.getHours() - targetDate.getHours()
  const minAgo = currentDate.getMinutes() - targetDate.getMinutes()
  const secAgo = currentDate.getSeconds() - targetDate.getSeconds()

  let shape = ''

  if (yearsAgo > 0) {
    shape = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    shape = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    shape = `${daysAgo}d ago`
  } else if (hoursAgo > 0) {
    shape = `${hoursAgo}h ago`
  } else if (minAgo > 0) {
    shape = `${minAgo}min ago`
  } else if (secAgo < 30) {
    shape = `${secAgo}sec ago`
  } else {
    shape = 'just now'
  }
  return shape
}

export function fullDate(input: number | string): string {
  const d = new Date(input)
  return d.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
