"use client";

import Header from "./components/Header";
import Button from "./components/ui/Button";
import { useMapContext } from "./context/MapContext";
import { MapProvider } from "./context/MapContext";
import { MobileButton } from "./types/enums";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MapProvider>
          <LayoutContent>{children}</LayoutContent>
        </MapProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isShowMapButton, setIsShowMapButton } = useMapContext();

  return (
    <>
      <Header />

      {children}
      <div className="fixed inset-x-0 bottom-20 z-50 flex justify-center md:hidden">
        <Button
          imageUrl={
            isShowMapButton ? MobileButton.MapImage : MobileButton.ListImage
          }
          imageAlt={
            isShowMapButton ? MobileButton.MapAlt : MobileButton.ListAlt
          }
          onClick={() => setIsShowMapButton(!isShowMapButton)}
        >
          {isShowMapButton ? MobileButton.Map : MobileButton.List}
        </Button>
      </div>
    </>
  );
}
