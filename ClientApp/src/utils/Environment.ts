declare var process: any;

export const IsDev = () => {
  return process.env.REACT_APP_STAGE === "dev";
};
