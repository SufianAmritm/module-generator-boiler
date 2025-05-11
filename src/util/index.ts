export const upperCaseFirstLetter = (modulename: string) =>
  `${modulename.at(0)?.toUpperCase()}${modulename.substring(1)}`;
export const upperCaseEverySecondLetter = (modulename: string) => {
  return modulename
    .split("-")
    .map((char, index) => (index === 0 ? char : upperCaseFirstLetter(char)))
    .join("");
};

export const verify = (modulename: string) => {
  const reg = /^[a-z]+(-[a-z]+)*$/;
  return reg.test(modulename);
};
