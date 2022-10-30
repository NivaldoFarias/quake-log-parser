export function timeToMinutes(time: string) {
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export function minutesToString(time: number) {
  return Math.trunc(time / 60) + ":" + ("00" + (time % 60)).slice(-2);
}

export function normalizeTimeString(time: string) {
  return time.length !== 4 && time.length !== 5
    ? `0:${time.split(":")[1]}`
    : time;
}
