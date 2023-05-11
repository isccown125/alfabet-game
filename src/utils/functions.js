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
