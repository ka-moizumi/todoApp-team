export const formatDate = (startDate) => {
  const newDate = startDate;
  newDate.setDate(newDate.getDate() + 1);

  const formattedDate =
    newDate.getFullYear() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getDate();
  return formattedDate;
};
