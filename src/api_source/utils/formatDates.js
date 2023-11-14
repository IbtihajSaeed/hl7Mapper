export const formatDates = (data, dateKeys = []) => {
  for (const key in data) {
    if (data[key]) {
      if (dateKeys.includes(key)) {
        try {
          if (!isNaN(Date.parse(data[key]))) {
            data[key] = new Date(d[key]);
          } else {
            const originalDate = data[key].toString();
            const year = originalDate.substring(0, 4);
            const month = originalDate.substring(4, 6);
            const day = originalDate.substring(6, 8);
            const dateStr = `${year}-${month}-${day}`;

            if (isNaN(new Date(dateStr))) {
              throw new Error("Invalid date");
            }

            data[key] = new Date(dateStr);
          }
        } catch (error) {
          data[key] = null;
        }
      }
    }
  }
  return data;
};
