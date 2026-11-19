import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://summit.id",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}