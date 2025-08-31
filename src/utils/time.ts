export const getHour = () => {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 7) {
    return "凌晨";
  }
  if (hour >= 7 && hour < 12) {
    return "上午";
  }
  if (hour >= 12 && hour < 19) {
    return "下午";
  }
  if (hour >= 19 && hour < 24) {
    return "晚上";
  }
};
