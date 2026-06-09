import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { Preloader } from "../components/Preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-light text-white glow-text">404</h1>
        <h2 className="mt-4 font-display text-2xl text-ice">Off the curated path</h2>
        <p className="mt-2 text-sm text-slate-400">This residence isn't in our portfolio.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full border border-electric/50 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white hover:bg-electric/10">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-white">Something stalled</h1>
        <p className="mt-2 text-sm text-slate-400">Refresh, or return to the lobby.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-electric px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-white">Try again</button>
          <a href="/" className="rounded-full border border-ice/40 px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-ice">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dapoxplain Housing Services — Bespoke Ultra-Luxury Real Estate" },
      { name: "description", content: "DHS curates the world's most extraordinary residences — private estates, penthouses and villas for an exceptional clientele." },
      { name: "author", content: "Dapoxplain Housing Services" },
      { property: "og:title", content: "Dapoxplain Housing Services" },
      { property: "og:description", content: "Bespoke ultra-luxury real estate, worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <CustomCursor />
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
