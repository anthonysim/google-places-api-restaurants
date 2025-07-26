"use client";

import { useMapContext } from "./context/MapContext";
import Header from "./components/Header";
import Button from "./components/ui/Button";
import { MobileButton } from "./types/enums";
import { MapProvider } from "./context/MapContext";
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
      <div className="flex justify-center md:hidden z-50">
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
