/**
 * Renders structured data as JSON-LD. `<` is escaped so content from the CMS
 * can never close the script tag early (per the Next.js JSON-LD guide).
 */
export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      className="yoast-schema-graph"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
