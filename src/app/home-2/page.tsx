import type { Metadata } from "next";

import { HeroSecondary } from "@/components/home/secondary/hero-secondary";
import { WhyKimp } from "@/components/home/why-kimp";

/** Preview of the secondary header + hero. Not for search engines. */
export const metadata: Metadata = {
  title: "Kimp – Home (preview)",
  robots: { index: false, follow: false },
};

export default function HomeSecondaryPage() {
  return (
    <main id="main">
      <HeroSecondary />
      <WhyKimp />
    </main>
  );
}
