export const generateRandomColor = (str) => {
  const colors = ["#FFB900", "#D83B01", "#B50E0E", "#E81123", "#B4009E", "#5C2D91", "#0078D7", "#00B4FF", "#008272", "#107C10"];

  let sum = 0;
  for(const index in str) {
    sum += str.charCodeAt(index);
  }
  return colors[sum % colors.length];
};
