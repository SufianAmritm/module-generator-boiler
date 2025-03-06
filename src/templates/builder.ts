import { upperCaseFirstLetter } from "../util";

export const buildTemplate = (template: string, modulename: string) => {
  return template
    .replace(/<module>/g, modulename)
    .replace(/!module!/g, upperCaseFirstLetter(modulename))
    .trim();
};
