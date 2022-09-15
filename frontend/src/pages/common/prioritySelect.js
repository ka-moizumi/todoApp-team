export const prioritySelect = (startDate, today) => {
  const deadline = ((startDate - today) / 1000 / 60 / 60 / 24 + 2) | 0;

  if (deadline > 7) {
    return 3;
  } else if (deadline > 3) {
    return 2;
  } else {
    return 1;
  }
};
