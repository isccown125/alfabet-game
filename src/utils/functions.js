import config from "../config.js";

export const random = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};
export const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
export const calculatePercentage = (numberOfTotalValue, ...valuesForSum) => {
  const totalValue = valuesForSum.reduce((prev, curr) => {
    return Number(prev) + Number(curr);
  }, []);
  return Number((numberOfTotalValue / totalValue) * 100);
};

export function getAbsoluteUrl(relativeUrl) {
  const coreUrl = config().coreUrl ?? ".";
  return coreUrl + relativeUrl;
}
