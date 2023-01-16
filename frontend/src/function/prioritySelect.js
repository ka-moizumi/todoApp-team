export const prioritySelect = (startDate, today) => {
  const deadline = (startDate - today) / 1000 / 60 / 60 / 24;
  if (deadline > 2.5) {
    return 3;
  } else if (deadline > 0.5) {
    return 2;
  } else {
    return 1;
  }
};
