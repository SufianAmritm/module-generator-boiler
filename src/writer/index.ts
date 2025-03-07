import * as path from "path";
import * as fs from "fs";
import { buildTemplate } from "../templates/builder";

export async function writeFiles(
  templates: any[],
  modulename: string,
  originalName: string,
  entity: string,
  loc?: string
) {
  const pathHistory = [];
  let pathToBuild = null;
  for (let i = 0; i < templates.length; i++) {
    const topDir = templates[i].dirName;
    const content = templates[i].content;
    const subDirs = templates[i].subDirs;
    const parent = templates[i].parent;
    if (subDirs && !content) {
      await writeFiles(subDirs, modulename, originalName, entity, loc);
    } else {
      const buildContent = await buildTemplate(
        content,
        modulename,
        originalName,
        entity
      );
      pathToBuild = path.join(
        loc ? loc : process.cwd(),
        loc ? "" : "src/modules",
        originalName,
        parent ?? "",
        topDir
      );
      pathHistory.push(pathToBuild);
      await writeFile(buildContent, pathToBuild);
    }
  }
}
async function writeFile(content: string, path: string) {
  const exists = fs.existsSync(path);
  if (exists) {
    return;
  } else {
    const paths = path.split("\\");
    const parentPath = path
      .split("\\")
      .splice(0, paths.length - 1)
      .join("\\");
    const parenExists = fs.existsSync(parentPath);
    if (!parenExists) {
      fs.mkdirSync(parentPath, { recursive: true });
    }
    fs.writeFileSync(path, content);
  }
}
