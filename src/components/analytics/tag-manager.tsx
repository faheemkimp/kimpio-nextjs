import { GTM_ID } from "@/lib/site";

/**
 * Google Tag Manager, loaded exactly like the live site's GTM4WP plugin:
 * 1. declare `dataLayer`
 * 2. push GTM4WP's page variables (same names/values as WordPress outputs)
 * 3. load the container
 * The order matters: tags firing on the first Page View read these variables.
 *
 * `visitorLoginState` comes from the `kimp_li` cookie that src/proxy.ts derives
 * from WordPress' (HttpOnly) login cookie.
 */
export interface GtmPageData {
  pagePostType: "frontpage" | "page" | "post" | "casestudy";
  /** Left out where GTM4WP outputs none (the /case-study/ archive). */
  pagePostType2?: "single-page" | "single-post" | "single-casestudy";
  pageCategory?: string[];
}

export function TagManager({ page }: { page: GtmPageData }) {
  const content = {
    visitorLoginState: "logged-out",
    visitorRegistrationDate: "",
    ...page,
  };
  const inline = `
var dataLayer = window.dataLayer = window.dataLayer || [];
var dataLayer_content = ${JSON.stringify(content).replace(/</g, "\\u003c")};
if (/(?:^|;\\s*)kimp_li=1/.test(document.cookie)) dataLayer_content.visitorLoginState = "logged-in";
dataLayer.push(dataLayer_content);
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

  return (
    <>
      <script id="gtm4wp-datalayer" dangerouslySetInnerHTML={{ __html: inline }} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
