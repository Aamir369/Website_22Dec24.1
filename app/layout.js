import { Advent_Pro } from "next/font/google";
import { NavBar } from "@/components/navbar/NavBar";
import "@/css/video_bg.css";
import "@/css/globals.css";

// Different Styles of Fonts
const headingFont = Advent_Pro({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ConsafetyWebsite",
  description: "This is final website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
