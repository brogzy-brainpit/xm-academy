// import Header from "@/components/Header";
import { Bebas_Neue, Manjari,Anton} from "next/font/google";
import "./fonts.css";
import "./globals.css";
import "./embla.css";
import "./mostHave.css";
import {base} from "../../axios";
import localFont from "next/font/local";
import GridLines from "@/components/GridLines";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export const metadata = {
 
  title:{
    default:  "coach demo - life & business coaching agency",
    template:"%s - bymemet"
  },
  description: "We help wedding videographers save time and scale their business with professional, cinematic video edits delivered fast, polished, and stress-free.",
  openGraph: {
title: "Coach Demo – Life & Business Coaching Agency",
description: "We help ambitious individuals and business owners unlock their potential, overcome challenges, and create lasting success through personalized life and business coaching."
,url:`${base}/`,
        images: [{url:'http://res.cloudinary.com/brainpit/image/upload/v1758464858/tek2k9hdhkvwyke8mo7o.png'}],
        // images: [{url: `open-graph/?slug=${slug}`}],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: "@bok_cheza",
        title: "Coach Demo – Life & Business Coaching Agency",
description: "We help ambitious individuals and business owners unlock their potential, overcome challenges, and create lasting success through personalized life and business coaching.",
 images: [{url:'http://res.cloudinary.com/brainpit/image/upload/v1758464858/tek2k9hdhkvwyke8mo7o.png',width:1200,height:630,alt:`image for curry entreprise`}],
      },
};


// Load fonts with next/font (recommended, no hydration issues)
const custom = localFont({
  src:  "./fonts/Galgo.otf",
  // weight: "100 200 300 400 500 600 700 800 900",
  variable: "--font-custom",
 
});
const body = localFont({
  src:  "./fonts/AktivGrotesk.ttf",
  variable: "--font-body",
  // variable: "--font-body",
 
});
export default function RootLayout({ children }) {
  return (
 <html lang="en" className="dark">
      <head />
      <body className={`${body.variable} ${custom.variable}`}>
        {/* <Header /> */}
        <GridLines/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
