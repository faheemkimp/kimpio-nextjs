import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { ClickSoundListener } from "@/components/sound/click-sound-listener";
import { GOOGLE_SITE_VERIFICATION, SITE_URL } from "@/lib/site";

import "./globals.css";

/** Gilroy: the same self-hosted brand font as the WordPress theme. */
const gilroy = localFont({
  src: [
    { path: "../fonts/gilroy-regular-webfont.woff2", weight: "400", style: "normal" },
    { path: "../fonts/gilroy-medium-webfont.woff2", weight: "500", style: "normal" },
    { path: "../fonts/gilroy-semibold-webfont.woff2", weight: "600", style: "normal" },
    { path: "../fonts/gilroy-bold-webfont.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

const WP_ICONS = "https://www.kimp.io/wp-content/uploads/2023/05";

/** Site-wide defaults. Every page sets its own title/description/canonical from Yoast. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kimp",
  verification: { google: GOOGLE_SITE_VERIFICATION },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: `${WP_ICONS}/cropped-favicon2-32x32.png`, sizes: "32x32" },
      { url: `${WP_ICONS}/cropped-favicon2-192x192.png`, sizes: "192x192" },
    ],
    apple: `${WP_ICONS}/cropped-favicon2-180x180.png`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={gilroy.variable}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <ClickSoundListener />
      </body>
    </html>
  );
}
