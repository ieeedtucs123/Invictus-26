import { useRouter } from "next/router";
import { useLoader } from "@/contexts/LoaderContext";

export default function Loader() {
  const router = useRouter();
  const { domReady, modelReady } = useLoader();

  const isModelRoute = router.pathname === "/model";

  const isReady = isModelRoute
    ? domReady && modelReady
    : domReady;

  return (
    <div
      className={`fixed inset-0 z-999 bg-black transition-opacity duration-700
        ${isReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex h-full flex-col items-center justify-center text-white gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading experience…</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
        </div>
        <p className="text-sm text-gray-300 text-center">
          💡 Tip: Click anywhere on the screen to enable background audio
        </p>
      </div>
    </div>
  );
}
