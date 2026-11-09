import type { Metadata } from "next";

import { RolePage, roleMetadata } from "@/components/careers/role-page";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return roleMetadata("content-writer");
}

/** /careers/content-writer/: live copy in src/content/careers-roles.ts, layout shared by the five role pages. */
export default function ContentWriterCareerPage() {
  return <RolePage slug="content-writer" />;
}
