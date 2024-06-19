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
  const percentageElapsed =
    Math.round((elapsedTime / totalTime) * 100 * 100) / 100;
  return percentageElapsed;
};
