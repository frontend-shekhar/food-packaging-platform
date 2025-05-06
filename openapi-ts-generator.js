const fs = require("node:fs");
const openapiTS = require("openapi-typescript");
const nextEnv = require("@next/env");

const generateAPISchema = async () => {
  const projectDir = process.cwd();
  nextEnv.loadEnvConfig(projectDir);

  const ast = await openapiTS(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`,
    // {
    //   transform(schemaObject, metadata) {
    //     if (schemaObject.format === "binary") {
    //       return "File";
    //     }
    //   },
    // },
  );

  fs.writeFileSync("src/types/api-schema.d.ts", ast);
};

generateAPISchema();
