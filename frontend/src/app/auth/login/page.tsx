"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";               
import { MarcelexLogo } from "@/app/component/logo/MarcelexLogo";

/** Simple inline SVG icons so you don't need local image files yet */
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden {...props}>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.2 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.1-2.8-.4-4.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16.5 18.8 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.2 29.6 3 24 3 16 3 9.1 7.5 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 45c5.2 0 10.1-1.9 13.8-5.2l-6.4-5.2C29.3 35 26.8 36 24 36c-5.3 0-9.6-3.1-11.4-7.5l-6.4 5C9 40.5 15.9 45 24 45z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.7 6.6l6.4 5.2C38.1 37.8 41 31.8 41 24c0-1.4-.1-2.8-.4-4.5z" />
        </svg>
    );
}

function LWIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
            <rect x="2" y="4" width="20" height="16" rx="3" fill="#F97316" />
            <path d="M6 8v8h3l2-3 2 3h3V8h-2v6l-3-4-3 4V8H6z" fill="white" />
        </svg>
    );
}

function BuildiesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
            <rect x="3" y="9" width="18" height="10" rx="2" fill="#2563EB" />
            <path d="M7 9V7l5-3 5 3v2" stroke="#2563EB" strokeWidth="2" fill="none" />
            <rect x="8" y="12" width="3" height="4" fill="white" />
            <rect x="13" y="12" width="3" height="4" fill="white" />
        </svg>
    );
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [remember, setRemember] = useState(true);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr(null);
        setLoading(true);

        try {
            if (remember) localStorage.setItem("lw_remember", "1");
            else localStorage.removeItem("lw_remember");
            location.href = "/tasks";
        } catch (ex: any) {
            setErr(ex?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onForgotPassword = () => {
        alert("Password reset flow coming soon.");
    };

    return (
        <main className="relative min-h-screen bg-[#0b1b3a] text-white overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_75%_50%,rgba(30,58,138,0.45),transparent),radial-gradient(700px_500px_at_60%_80%,rgba(30,64,175,0.28),transparent)]" />
            </div>
            
            {/* LEFT BRAND BLOCK (desktop only) */}
            <div
                className="hidden xl:block"
                style={{
                    position: "fixed",
                    left: "180px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 9998,
                }}
            >
                <div className="pointer-events-none absolute -inset-12 -z-10 rounded-3xl bg-[radial-gradient(500px_260px_at_40%_50%,rgba(251,146,60,0.12),transparent),radial-gradient(400px_240px_at_60%_60%,rgba(244,63,94,0.10),transparent)] blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-8">
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <MarcelexLogo size={320} variant="sunrise" showWord={false} />
                        </motion.div>

                        <div className="leading-tight">
                            <div className="flex items-center gap-3">
                                <span className="text-6xl font-extrabold tracking-tight text-white">
                                    Marcelex
                                </span>
                                <span className="inline-block h-3 w-3 rounded-full bg-orange-400/90 shadow-[0_0_20px_rgba(251,146,60,0.7)]" />
                            </div>
                            <p className="mt-2 text-xl text-blue-100/85">
                                Keeping task management a breeze everyday
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT-FIXED WRAPPER (keep offset) */}
            <div
                style={{
                    position: "fixed",
                    right: "360px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 9999,
                }}
            >
                {/* Floating card */}
                <div className="w-[400px] min-h-[580px] rounded-2xl bg-white text-neutral-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md p-8 md:p-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
                    </div>

                    {/* Form */}
                    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
                        {/* Email */}
                        <label className="grid gap-2">
                            <span className="text-sm text-neutral-700">Email</span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full rounded-xl bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none shadow-inner focus:ring-2 focus:ring-blue-500/25"
                                aria-label="Email"
                                inputMode="email"
                                autoComplete="email"
                            />
                        </label>

                        {/* Password + show/hide */}
                        <label className="grid gap-2">
                            <span className="text-sm text-neutral-700">Password</span>
                            <div className="relative">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    required
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    placeholder="ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢"
                                    className="w-full rounded-xl bg-white px-4 py-3 pr-16 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none shadow-inner focus:ring-2 focus:ring-blue-500/25"
                                    aria-label="Password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                >
                                    {showPwd ? "Hide" : "Show"}
                                </button>
                            </div>
                        </label>

                        {/* Row: remember + forgot */}
                        <div className="mt-1 flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded bg-white text-blue-600 focus:ring-blue-500/40"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                Remember me
                            </label>

                            <button
                                type="button"
                                onClick={onForgotPassword}
                                className="text-sm text-blue-700 hover:text-blue-800 underline-offset-2 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Error */}
                        {err && (
                            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 shadow">
                                {err}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)] transition hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing inÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-neutral-200" />
                        <div className="text-xs text-neutral-500">or use a provider</div>
                        <div className="h-px flex-1 bg-neutral-200" />
                    </div>

                    {/* Providers (stacked, branded) */}
                    <div className="flex flex-col gap-3">
                        {/* LinkWaveAI */}
                        <button
                            type="button"
                            disabled
                            className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-[#06B6D4] shadow-sm hover:bg-neutral-50 disabled:opacity-60 disabled:cursor-not-allowed"
                            title="Coming soon"
                        >
                           
                            Continue with LinkWaveAI
                        </button>

                        {/* Buildies */}
                        <button
                            type="button"
                            disabled
                            className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-orange-600 shadow-sm hover:bg-neutral-50 disabled:opacity-60 disabled:cursor-not-allowed"
                            title="Coming soon"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-white font-bold">
                                B
                            </div>
                            Continue with Buildies
                        </button>


                        {/* Google */}
                        <button
                            type="button"
                            disabled
                            className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-[#4285F4] shadow-sm hover:bg-neutral-50 disabled:opacity-60 disabled:cursor-not-allowed"
                            title="Coming soon"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-[11px] leading-5 text-neutral-600">
                        By signing in, you agree to our{" "}
                        <a className="underline hover:text-neutral-800" href="#">
                            Terms of Use
                        </a>{" "}
                        and{" "}
                        <a className="underline hover:text-neutral-800" href="#">
                            Privacy Policy
                        </a>
                        .
                    </p>

                    {/* Account prompt (updated) */}
                    <div className="mt-5 text-sm text-neutral-700">
                        Don&apos;t have an account?{" "}
                        <a
                            href="/auth/register"
                            className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800"
                        >
                            Register here
                        </a>
                        .
                    </div>
                </div>
            </div>
        </main>
    );
}
