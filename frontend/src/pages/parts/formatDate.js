export const formatDate = (startDate) => {
  const formattedDate =
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    (startDate.getDate() + 1) +
    " " +
    "00" +
    ":" +
    "00" +
    ":" +
    "00";
  return formattedDate;
};
