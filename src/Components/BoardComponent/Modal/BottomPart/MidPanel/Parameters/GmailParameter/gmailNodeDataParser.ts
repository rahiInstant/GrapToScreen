import useStateContext from "../../../../../useStateContext";

const { formData } = useStateContext();

export const gmailNodeDataParser = (nodeId: string) => {
  const data = formData()[nodeId];
  if (data) {
    const {parameters} = data
    const poolTimes = parameters.pollTimes;
    const parsedPoolTimes: string[] = [];
    const parsedModes: Record<string, string> = {};

    if (poolTimes) {
      poolTimes.forEach((item: any) => {
        const pollTimeId = `poolTime_${Math.random().toString(36).substring(2, 8)}`;
        parsedPoolTimes.push(pollTimeId);
        parsedModes[pollTimeId] = item.mode;
      });
      console.log(parsedModes);
      console.log(parsedPoolTimes);
    }

    return {
      simplify: parameters.simple,
      poolTimes: parsedPoolTimes,
      modes: parsedModes,
    };
  }
};
