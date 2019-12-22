export const formatScore = (score: number): string => {
  const date = new Date(score);
  const sec = date.getUTCSeconds().toString().padStart(2, '0');
  const min = date.getUTCMinutes().toString().padStart(2, '0');
  const hrs = date.getUTCHours().toString().padStart(2, '0');
  const days = Math.floor(score / (24 * 60 * 60 * 1000));

  if (days > 0) {
    return `${days} д ${hrs}:${min}:${sec}`;
  } if (Number(hrs) > 0) {
    return `${hrs}:${min}:${sec}`;
  }

  return `${min}:${sec}`;
};
