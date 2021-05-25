const normalize = (value: string): string =>
  [...value.trim()].map((v) => v.toLowerCase()).join("");

const helpers = { normalize };

export default helpers;
