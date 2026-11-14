import { access, cp, mkdir, rm } from "node:fs/promises";
import { constants } from "node:fs";

const required = ["public/index.html", "public/styles.css", "public/app.js", "api/analyze.js", "api/health.js"];
for (const file of required) await access(file, constants.R_OK);
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
console.log(`Production assets built in dist (${required.length} required files verified).`);
