import { LinksCollection } from "/imports/api/links";
import { createMethod } from "meteor/zodern:relay";
import { z } from "zod";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

export const publishLink = createMethod({
  name: "link",
  schema: z.object({
    title: z
      .string()
      .min(1, "The title must have at least 1 character")
      .max(100, "The title must have less then 100 characters"),
    url: z.string().url("The url must be a valid url"),
  }),
  run({ title, url }) {
    return insertLink({ title, url });
  },
});
