import config from "../config";

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

export const calculateCorrectnessOfAnswersInPercentage = (
  goodAnswersAmount,
  badAnswersAmount
) => {
  let result = Math.round(
    (goodAnswersAmount / (goodAnswersAmount + badAnswersAmount)) * 100
  );
  if (isNaN(result)) {
    result = 0;
  }
  return result;
};

export function getAbsoluteUrl(relativeUrl) {
  const coreUrl = config().coreUrl ?? ".";
  return coreUrl + relativeUrl;
}
export function scrollToTop() {
  window.scrollTo({ top: 0 });
}
