import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2 } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await forgotPassword(email);
            setMessage(res.message);
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error sending reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-card">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 rounded-full"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit"
                            variant="hero"
                            shape="pill"
                            size="lg"
                            className="w-full"
                            disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>



                        {message && (
                            <p className="text-center text-sm text-muted-foreground mt-2">
                                {message}
                            </p>
                        )}

                        <div className="text-center text-sm mt-4">
                            <Link to="/login" className="text-primary hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
