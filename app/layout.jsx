import { Manrope} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ["latin"],
  weight :["400"]
});
export const metadata = {
  title: "Career Coach",
  description: "This is Career Coach app",
};
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import { Heart } from 'lucide-react'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme:dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className}`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
            <main className="min-h-screen">
            {children}
            </main>
            <Toaster richColors />
            <Footer/>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
