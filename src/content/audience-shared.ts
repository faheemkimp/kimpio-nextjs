/**
 * Copy shared word-for-word by the live "Kimp For" audience pages
 * (/white-label-graphic-design/, /entrepreneurs/, /fitness-health-brands/,
 * /professional-services/). Each page's own copy lives in its content file.
 */

/** Live "Brands That Trust Our Designers" (<h2>) logo row, in live order. Live has no alt text; names added. */
export const AUDIENCE_BAND = {
  title: "Brands That Trust Our Designers",
  logos: [
    { src: "/images/clients/client_logo1.svg", alt: "Greentoe", width: 136, height: 24 },
    { src: "/images/clients/client_logo2.svg", alt: "MarketHealth", width: 105, height: 40 },
    { src: "/images/clients/client_logo3.svg", alt: "Londonreal", width: 130, height: 24 },
    { src: "/images/clients/client_logo4.svg", alt: "Decathlon", width: 130, height: 28 },
    { src: "/images/clients/client_logo5.svg", alt: "Harley Davidson", width: 71, height: 56 },
    { src: "/images/clients/client_logo6.svg", alt: "Youk", width: 125, height: 40 },
    { src: "/images/clients/client_logo7.svg", alt: "Universal", width: 88, height: 56 },
    { src: "/images/clients/client_logo9.svg", alt: "One and One", width: 63, height: 40 },
    { src: "/images/clients/client_logo8.svg", alt: "Single Grain", width: 118, height: 56 },
  ],
} as const;

export const AUDIENCE_FEATURES = ["Sign up in 2 minutes", "Cancel any time", "Absolutely no contracts"] as const;

export const GRAPHICS_LIST = ["Landing page designs", "Logos and brand assets", "Email graphics", "Social media graphics", "Custom illustrations", "And so much more!"] as const;
export const VIDEO_LIST = ["Logo animations", "Product demo videos", "Social media videos", "GIF animations", "Testimonial videos", "And so much more!"] as const;
export const VIDEO_BODY =
  "Nothing engages and converts like video marketing. Get engaging promo videos and motion graphics. We edit & enhance footage, or animate from scratch!";

/** Live "Marketing Video Services" sample links (most pages). */
export const VIDEO_SAMPLES = [
  "https://www.youtube.com/watch?v=Z8zY5w5jkgo&feature=youtu.be",
  "https://www.youtube.com/watch?v=Onkkj7JzUqA&feature=youtu.be",
  "https://www.youtube.com/watch?v=yP3rNR4Mqj8&feature=youtu.be",
  "https://www.youtube.com/watch?v=bNOt4qL4Gps&feature=youtu.be",
] as const;

/** Service image + video tiles for one page (files named "<prefix>_grphic_serv1.png" etc., as live). */
export function serviceMedia(dir: string, prefix: string, videos: readonly string[] = VIDEO_SAMPLES) {
  return {
    images: [1, 2, 3, 4].map((n) => ({ src: `${dir}/${prefix}_grphic_serv${n}.png`, width: 336, height: 334 })),
    videos: videos.map((video, i) => ({ video, thumb: { src: `${dir}/${prefix}_video_serv${i + 1}.png`, width: 354, height: 334 } })),
  };
}

/** Live "Why Pay Upfront? Try Kimp 100% Free!" (<h3>); `who` is the page's audience as live words it. */
export const trialBand = (who: string, href = "/register-now/") => ({
  title: "Why Pay Upfront? Try Kimp 100% Free!",
  body: `${who} around the world use Kimp to design better & scale faster. Sign up for a free 7 day trial. Don't pay unless you subscribe. Cancel anytime.`,
  cta: { label: "Start Free Trial", href },
});

/** Live portfolio strip: WordPress uploads (2021/05), in live order. */
export const AUDIENCE_WORK = {
  eyebrow: "Our work",
  title: "We Design Just About Everything",
  intro: "Branding, social media designs, marketing videos, print designs, custom illustrations & more!",
  cta: { label: "View All", href: "/our-work/" },
  images: [
    "1.png", "02-22.jpg", "12-21.jpg", "01-4.jpg", "02-14.jpg", "2.png", "09-8.jpg", "10-1.png", "10-23.jpg", "14-1.png",
    "pro4.png", "16-10.jpg", "19.jpg", "pro7.png", "20.jpg", "26-1-1.png", "27-2.jpg", "pro3.png", "pro6.png", "pro14.png",
    "pro19.png", "pro41.png", "pro43.png", "pro50.png", "pro60.png",
  ].map((f) => `https://www.kimp.io/wp-content/uploads/2021/05/${f}`),
} as const;

/** Live "Book A Call With Us" (<h3>) card; same copy as the /graphic-design-services/ call card. */
export const AUDIENCE_CALL = {
  title: "Book A Call With Us",
  body: "Ready to learn more about how Kimp can help you save time, and money on your designs? Book a 1:1 call with a Kimp Team member today! You'll be designing better and scaling faster, in no time.",
  cta: { label: "Book a Call", href: "/book-a-call/" },
  image: { src: "/images/audience/cat-monky-with-calander.webp", width: 1610, height: 1350 },
} as const;
