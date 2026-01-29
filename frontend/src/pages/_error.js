import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ErrorPage() {
    const router = useRouter();

    useEffect(() => {
        console.error("App crashed");

        const timer = setTimeout(() => {
            router.replace("/Home");  
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#D4AF37"
        }}>
            <h1 style={{ fontSize: "28px" }}>Something went wrong</h1>
            <p style={{ marginTop: "8px", opacity: 0.8 }}>
                Redirecting you safely...
            </p>
        </div>
    );
}
