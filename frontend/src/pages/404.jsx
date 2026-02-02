import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-[#D4AF37]">
      <div className="flex flex-col items-center text-center px-6">

        {/* 404 */}
        <h1
          className="text-[96px] font-bold leading-none"
          style={{ WebkitTextStroke: "2px #D4AF37", color: "transparent" }}
        >
          404
        </h1>

        {/* subtitle */}
        <h2 className="mt-4 text-xl text-[#F6F1D4] font-semibold">
          oops! page not found
        </h2>

        {/* description */}
        <p className="mt-3 max-w-md text-sm text-[#F6F1D4] opacity-80">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        {/* action */}
        <button
          onClick={() => router.push("/")}
          className="mt-8 px-8 py-3 border-2 border-[#D4AF37] rounded-lg
                     text-[#D4AF37] font-semibold
                     transition-all duration-300
                     hover:bg-[#D4AF37]/10 hover:scale-105"
        >
          Go Home
        </button>

      </div>
    </div>
  );
}
