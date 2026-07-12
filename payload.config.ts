import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Applications } from "./collections/Applications";
import { Distributors } from "./collections/Distributors";
import { Faqs } from "./collections/Faqs";
import { Media } from "./collections/Media";
import { News } from "./collections/News";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Products, Applications, Distributors, News, Pages, Faqs, Media, Users],
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "繁體中文", code: "zh-tw" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: false,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "lib/payload-types.ts"),
  },
});
