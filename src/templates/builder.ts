import { upperCaseFirstLetter } from "../util";

export const buildTemplate = async (
  template: string,
  modulename: string,
  originalName: string,
  entity: string
) => {
  return template
    .replace(/<module>/g, modulename)
    .replace(/!module!/g, upperCaseFirstLetter(modulename))
    .replace(/<parent>/g, originalName)
    .replace(/<entity>/g, entity)
    .trim();
};
