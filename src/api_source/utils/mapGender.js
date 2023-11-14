export const mapGender = (gender) => {
  if (gender?.length > 1) {
    return gender;
  }

  return gender.toUpperCase() === "M"
    ? "Male"
    : gender.toUpperCase() === "F"
    ? "Female"
    : "Unknown";
};
