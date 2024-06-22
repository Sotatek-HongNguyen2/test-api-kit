import moment from "moment";
export const useGetDiffMonth = (
  lastTimeStr: string,
) => {
  if (!lastTimeStr) return null;
  const lastTime = moment(lastTimeStr);
  const currentTime = moment();
  const diffMonth = currentTime.diff(lastTime, "months");
  return diffMonth;
};

