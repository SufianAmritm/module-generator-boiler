import {
  createDto,
  updateDto,
  entity,
  service,
  serviceInterface,
  mapping,
  repository,
  repositoryInterface,
  moduleContent,
  controller,
} from ".";

export const templates = (modulename: string) => [
  {
    dirName: "dto",
    subDirs: [
      {
        dirName: `create-${modulename}.dto.ts`,
        content: createDto,
        parent: "dto",
      },
      {
        dirName: `update-${modulename}.dto.ts`,
        content: updateDto,
        parent: "dto",
      },
    ],
  },
  {
    dirName: "entities",
    subDirs: [
      {
        dirName: `${modulename}.entity.ts`,
        content: entity,
        parent: "entities",
      },
    ],
  },
  {
    dirName: "interfaces",
    subDirs: [
      {
        dirName: `${modulename}.interface.ts`,
        content: serviceInterface,
        parent: "interfaces",
      },
    ],
  },
  {
    dirName: "mapping",
    subDirs: [
      {
        dirName: `${modulename}.mapping.ts`,
        content: mapping,
        parent: "mapping",
      },
    ],
  },
  {
    dirName: "repositories",
    subDirs: [
      {
        dirName: `${modulename}.repository.ts`,
        content: repository,
        parent: "repositories",
      },
      {
        dirName: "interface",
        subDirs: [
          {
            dirName: `${modulename}-repository.interface.ts`,
            content: repositoryInterface,
            parent: "repositories/interface",
          },
        ],
      },
    ],
  },
  {
    dirName: `${modulename}.controller.ts`,
    content: controller,
    parent: "",
  },
  {
    dirName: `${modulename}.module.ts`,
    content: moduleContent,
    parent: "",
  },
  {
    dirName: `${modulename}.service.ts`,
    content: service,
    parent: "",
  },
];
