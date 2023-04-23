import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_ID,  // ID of a project you are using
      token: process.env.NEXT_PUBLIC_PLASMIC_TOKEN  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})