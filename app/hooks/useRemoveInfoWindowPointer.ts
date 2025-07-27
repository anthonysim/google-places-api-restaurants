import { useEffect } from "react";

export function useRemoveInfoWindowPointer() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .gm-style-iw-d { overflow: hidden !important; }
      .gm-style-iw-chr { display: none !important; }
      .gm-style-iw-tc::after { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
}
