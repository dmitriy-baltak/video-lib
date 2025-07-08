import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/store-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AppErrorBoundary } from "@/components/error-boundary";

import "@/styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <AppErrorBoundary>
            <Nav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AppErrorBoundary>
        </body>
      </html>
    </StoreProvider>
  );
}
