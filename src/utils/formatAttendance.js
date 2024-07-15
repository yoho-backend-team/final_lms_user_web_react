export const formatAttendanceForMonth = (attendanceData, month) => {
  const year = new Date().getFullYear();
  return attendanceData
    .filter(
      ({ date }) =>
        new Date(date).getMonth() === month &&
        new Date(date).getFullYear() === year,
    )
    .map(({ date, status }) => ({
      date: new Date(date).getDate(),
      status: status.charAt(0).toUpperCase() + status.slice(1),
    }));
};
