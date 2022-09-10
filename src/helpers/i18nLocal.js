export const getTimezone = () => {
  const timeZoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZoneString;
};
