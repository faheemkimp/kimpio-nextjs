import { FooterGate } from "@/components/layout/footer-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TrialStrip } from "@/components/layout/trial-strip";

/** Pages that use the main sticky glass header and the site footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      {children}
      <FooterGate>
        <SiteFooter />
      </FooterGate>
      <TrialStrip />
    </>
  );
}
