import type React from "react"
import "@/app/globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata, Viewport } from "next"
import Navbar from "@/components/sections/Navbar"
import Footer from "@/components/sections/Footer"
import { cn } from "@/lib/utils"

// Satu font untuk semua teks: Plus Jakarta Sans (variable font, weight 200-800).
// Hierarki dibuat lewat tebal tipis: font-light untuk teks pendukung, font-extrabold untuk penekanan.
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1D363A",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://summit.id"),

  title: {
    default: "Summit Private Village - Home Villa Tropical Modern di Malang",
    template: "%s | Summit Private Village",
  },

  description:
    "Summit Private Village adalah kawasan home villa tropical modern di Dau, Malang. Unit 2 lantai dengan 3 kamar tidur dan 2 kamar mandi, one gate system, resepsionis 24 jam. Harga mulai 800 jutaan.",

  keywords: [
    "summit private village",
    "villa malang",
    "home villa malang",
    "villa dau malang",
    "investasi villa malang",
    "rumah villa malang",
    "summit.id",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Summit Private Village - Home Villa Tropical Modern di Malang",
    description:
      "Kawasan home villa tropical modern di Dau, Malang. 3 kamar tidur, 2 kamar mandi, one gate system, resepsionis 24 jam. Harga mulai 800 jutaan.",
    url: "https://summit.id",
    siteName: "Summit Private Village",
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={fontSans.variable} suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased bg-white text-[#1D363A]"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="w-full max-w-full flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}