const debounce = (
  // eslint-disable-next-line
  callback: (...args: any[]) => void,
  delay: number
): (() => void) => {
  let timer: number;
  // eslint-disable-next-line
  function debounced(...args: any[]) {
    const cancel = () => clearTimeout(timer);
    // @ts-ignore:
    const launchCallback = () => callback.apply(this, args);
    const setTimer = () => (timer = setTimeout(launchCallback, delay));
    cancel();
    setTimer();
  }

  return debounced;
};

export default debounce;
