#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import { templates } from "../templates/templates";
import { writeFiles } from "../writer";
import { upperCaseEverySecondLetter, verify } from "../util";

program
  .version("1.0.0")
  .description("Module generator")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "modulename",
          required: true,
          message: "Module Name",
        },
        {
          type: "input",
          name: "path",
          required: false,
          message: "path to add module, default is [cwd]/src/modules",
        },
        {
          type: "input",
          name: "entity",
          required: true,
          message: "db table name",
        },
      ])
      .then(async (ans) => {
        const { modulename, path, entity } = ans;
        const template = templates(modulename);
        if (!verify(modulename)) {
          console.error(
            "Invalid module name. Expected format:  module-name || modulename"
          );
          process.exit(1);
        }
        const filteredName = upperCaseEverySecondLetter(modulename);
        console.log(filteredName);
        console.log(modulename);
        await writeFiles(template, filteredName, modulename, entity, path);
      });
  });
program.parse(process.argv);
