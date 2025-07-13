import { redirect } from "react-router";
import auth from "../firebase.config";

export async function middleware({ request, next }) {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe(); // memory leak রোধে unsubscribe

            const protectedPaths = ["/profile", "/dashboard"];
            const url = new URL(request.url);

            if (protectedPaths.includes(url.pathname) && !user) {
                resolve(redirect("/login")); // 🔒 না থাকলে login এ পাঠিয়ে দিচ্ছেন
            } else {
                resolve(next()); // ✅ অনুমতি থাকলে route এ ঢুকছে
            }
        });
    });
}