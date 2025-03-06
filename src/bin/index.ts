#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import { templates } from "../templates/templates";
import { writeFiles } from "../writer";

program
  .version("1.0.0")
  .description("Module generator")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "module",
          required: true,
          message: "Module Name",
        },
      ])
      .then((ans) => {
        const template = templates(ans.module);
        writeFiles(template, ans.module);
      });
  });
program.parse(process.argv);
