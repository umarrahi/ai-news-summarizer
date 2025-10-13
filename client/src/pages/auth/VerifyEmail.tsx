// client\src\pages\auth\VerifyEmail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { verifyEmail } from "../../services/api/auth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        const verify = async () => {
            try {
                if (!token) {
                    toast.error("Invalid verification link!");
                    setStatus("error");
                    return;
                }

                // ✅ call API correctly (no full URL needed)
                const res = await verifyEmail(token);

                toast.success("Email verified successfully!");
                setStatus("success");

                // redirect after short delay
                setTimeout(() => navigate("/login"), 2000);
            } catch (err: any) {
                console.error(err);
                toast.error(err.response?.data?.message || "Verification failed!");
                setStatus("error");
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            {status === "loading" && (
                <>
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                    <p className="text-sm text-muted-foreground">Verifying your email...</p>
                </>
            )}

            {status === "success" && (
                <>
                    <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
                    <p className="text-sm text-green-600">Email verified successfully! Redirecting...</p>
                </>
            )}

            {status === "error" && (
                <>
                    <XCircle className="w-10 h-10 text-red-500 mb-3" />
                    <p className="text-sm text-red-600">Invalid or expired verification link.</p>
                </>
            )}
        </div>
    );
};

export default VerifyEmail;
