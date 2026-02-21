import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/clerk-react";

export default function ClerkAuthPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-background to-emerald-50">
            <div className="glass p-10 rounded-[2.5rem] shadow-2xl w-full max-w-sm text-center space-y-6">
                {/* Logo */}
                <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/30">
                    <span className="text-3xl">🌾</span>
                </div>
                <div>
                    <h1 className="text-2xl font-black">KisanTech</h1>
                    <p className="text-muted-foreground text-sm mt-1">Smart agricultural tools for Indian farmers</p>
                </div>

                {/* SIGNED OUT — show login / signup buttons */}
                <SignedOut>
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Please sign in to continue</p>
                        <div className="flex flex-col gap-3">
                            <SignInButton mode="modal">
                                <button className="w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-2xl hover:bg-primary/90 transition-all shadow-md shadow-primary/30">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="w-full border-2 border-primary text-primary font-bold py-3 px-6 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all">
                                    Create Account
                                </button>
                            </SignUpButton>
                        </div>
                    </div>
                </SignedOut>

                {/* SIGNED IN — show user button */}
                <SignedIn>
                    <div className="space-y-4">
                        <p className="text-sm text-green-600 font-semibold">✅ You are signed in!</p>
                        <div className="flex flex-col items-center gap-3">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-14 h-14 rounded-2xl",
                                    },
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                Click your avatar to manage your account
                            </p>
                        </div>
                        <a
                            href="/dashboard"
                            className="block w-full bg-primary text-primary-foreground font-bold py-3 px-6 rounded-2xl hover:bg-primary/90 transition-all text-center shadow-md shadow-primary/30"
                        >
                            Go to Dashboard →
                        </a>
                    </div>
                </SignedIn>
            </div>
        </div>
    );
}
