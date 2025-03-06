export const upperCaseFirstLetter = (modulename: string) =>
  `${modulename.at(0)?.toUpperCase()}${modulename.substring(1)}`;
