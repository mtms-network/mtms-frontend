export const calculateDuration = (startTime, endTime) => {
  let duration = 0;
  const start = new Date(startTime);
  const end = new Date(endTime);
  duration = end.getTime() - start.getTime();
  const minutes = duration / 1000 / 60;
  return minutes > 0 ? minutes : 0;
};
