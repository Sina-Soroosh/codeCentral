const convertToSolarDate = (time: Date) => {
  const date = new Date(time);
  const year = date.toLocaleDateString("fa", {
    year: "numeric",
  });
  const month = date.toLocaleDateString("fa", {
    month: "2-digit",
  });
  const day = date.toLocaleDateString("fa", {
    day: "2-digit",
  });

  let text: string = `${year}/${month}/${day}`;

  return text;
};

export { convertToSolarDate };
