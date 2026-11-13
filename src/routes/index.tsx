import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { content, type Language } from "@/lib/axon-content";
import { LanguageProvider } from "@/components/axon/language";
import { Website } from "@/components/axon/website";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { lang?: Language } =>
    search["lang"] === "en" ? { lang: "en" } : search["lang"] === "ar" ? { lang: "ar" } : {},
  head: ({ match }) => {
    const t = content[match.search.lang ?? "ar"];
    return {
      meta: [
        { title: t.title },
        { name: "description", content: t.description },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});
function Index() {
  const { lang = "ar" } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  return (
    <LanguageProvider
      lang={lang}
      onChange={(next) =>
        navigate({ to: "/", search: { lang: next }, replace: true, resetScroll: false })
      }
    >
      <Website />
    </LanguageProvider>
  );
}
