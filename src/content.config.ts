import { z, defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    nda: z.boolean(),
    picture: z.string(),
    role: z.string(),
    collaborators: z.array(z.string()),
    techStack: z.array(z.string()),
  }),
});

const skillsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/skills" }),
  schema: z.object({
    title: z.string(),
  }),
});

const techStackCollection = defineCollection({
  loader: file("src/content/tech-stack/tech-stack.json"),
  schema: z.object({
      title: z.string(),
      items: z.array(z.object({
        title: z.string(),
        subTitle: z.string().optional(),
      })),
  }),
});

export const collections = {
  portfolio: portfolioCollection,
  skills: skillsCollection,
  techStack: techStackCollection,
};
