/** Subset of the Yoast SEO REST shape (`yoast/v1/get_head` → `json`) this app relies on. */

export interface YoastImage {
  url: string;
  width?: number;
  height?: number;
  type?: string;
}

export interface YoastHead {
  title?: string;
  description?: string;
  robots?: Partial<Record<"index" | "follow" | "max-snippet" | "max-image-preview" | "max-video-preview", string>>;
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: YoastImage[];
  article_publisher?: string;
  article_published_time?: string;
  article_modified_time?: string;
  twitter_card?: string;
  twitter_image?: string;
  twitter_site?: string;
  twitter_creator?: string;
  twitter_misc?: Record<string, string>;
  schema?: { "@context": string; "@graph": Record<string, unknown>[] };
}
