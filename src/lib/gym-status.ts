/* Live floor status derived from real opening hours.
   Mon–Fri 06:00–22:00 · Sat–Sun 08:00–20:00 (local time). */

export interface GymStatus {
  open: boolean;
  label: string;
  detail: string;
}

function fmt(h: number): string {
  const hr = h % 12 === 0 ? 12 : h % 12;
  const suffix = h < 12 ? 'AM' : 'PM';
  return `${hr}${suffix}`;
}

export function getGymStatus(at: Date = new Date()): GymStatus {
  const day = at.getDay();
  const weekend = day === 0 || day === 6;
  const openH = weekend ? 8 : 6;
  const closeH = weekend ? 20 : 22;
  const nowH = at.getHours() + at.getMinutes() / 60;

  if (nowH >= openH && nowH < closeH) {
    return {
      open: true,
      label: 'Open now',
      detail: `Floor open till ${fmt(closeH)}`,
    };
  }
  if (nowH < openH) {
    return {
      open: false,
      label: 'Opens today',
      detail: `Doors open ${fmt(openH)}`,
    };
  }
  return {
    open: false,
    label: 'Closed',
    detail: `Back ${fmt(openH)} tomorrow`,
  };
}