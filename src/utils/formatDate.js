export const formatDate = (iosString) => {
  const date = new Date(iosString);
  const format = { day: "numeric", month: "long", year: "numeric" };
  const formatedDate = date.toLocaleDateString("en-GB", format);
  return formatedDate;
};

export const formatTime = (iosString) => {
  const date = new Date(iosString);
  const format = { hour: "numeric", minute: "numeric", hours12: true };
  return date.toLocaleTimeString("en-US", format);
};

export const getTimeDifference = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const diffMs = endTime - startTime;

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours}:${diffMins} Min`;
};

export const getIsTimeValid = (startDate, startTime) => {
  const now = new Date();

  const startDateTime = new Date(startDate);
  const startTimeDate = new Date(startTime);

  const combinedDateTime = new Date(
    startDateTime.getFullYear(),
    startDateTime.getMonth(),
    startDateTime.getDate(),
    startTimeDate.getHours(),
    startTimeDate.getMinutes(),
    startTimeDate.getSeconds(),
  );

  const isToday = now.toDateString() === combinedDateTime.toDateString();

  const isNotInPast = now <= combinedDateTime;

  return isToday && isNotInPast;
};


export const isInClassTimeRange = (startDate, startTime, endTime) => {
  const classStartDate = new Date(startDate);
  const classStartTime = new Date(startTime);
  const classEndTime = new Date(endTime);

  const currentDate = new Date();

  const isSameDate = (
    currentDate.getFullYear() === classStartDate.getFullYear() &&
    currentDate.getMonth() === classStartDate.getMonth() &&
    currentDate.getDate() === classStartDate.getDate()
  );

  
  const isInRange = (
    currentDate >= classStartTime &&
    currentDate <= classEndTime
  );

  return isSameDate && isInRange && currentDate < classEndTime;
};
