export const formatDate = (startDate) => {
  const newDate = startDate;
  newDate.setDate(newDate.getDate());

  const formattedDate =
    newDate.getFullYear() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getDate();
  return formattedDate;
};
