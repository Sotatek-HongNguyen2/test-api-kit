import moment from "moment";
export const usePercentCompletion = (
  createdAtStr: string,
  expTimeStr: string
) => {
  const createdAt = moment(createdAtStr);
  const expTime = moment(expTimeStr);
  const currentTime = moment();
  const totalTime = expTime.diff(createdAt, "seconds");
  const elapsedTime = currentTime.diff(createdAt, "seconds");
  if (totalTime <= 0) {
    return elapsedTime >= totalTime ? 100 : 0;
  }
  const percentageElapsed = (elapsedTime / totalTime) * 100;
  let result = Math.min(percentageElapsed, 100).toFixed(3);
  result = parseFloat(result).toString();
  if (parseFloat(result) < 0.001) {
    return "< 0.001";
  }
  return result;
};

