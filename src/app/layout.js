import localFont from "next/font/local";
import "./globals.css";
import "./mostHave.css";
import GridLines from "./components/GridLines";
// import Footer from "./components/Footer";


const body = localFont({
  src:  "./fonts/AktivGrotesk.ttf",
  variable: "--font-body",
 
});
const custom = localFont({
  src:  "./fonts/Galgo.otf",
  variable: "--font-custom",
 
});
export const metadata = {
 
  title:{
    default:  "XM Academy – In the race to end poverty",
    template:"%s - bymemet"
  },
  description: "Comprehensive Education. XM Trading academy offers a wide range of educational resources, including video tutorials, articles, and webinars, ensuring you have a ...",
  openGraph: {
         title: "XM Academy – In the race to end poverty",
  description: "Comprehensive Education. XM Trading academy offers a wide range of educational resources, including video tutorials, articles, and webinars, ensuring you have a ..."
,url:`https://xm-academy.vercel.app/`,
        images: [{url:'http://res.cloudinary.com/brainpit/image/upload/v1768839497/j0lwjr7t4lh2ttsimfs1.png'}],
        // images: [{url: `open-graph/?slug=${slug}`}],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        site: "@bok_cheza",
         title: "XM Academy - in the race to end povety",
          description: "Comprehensive Education. XM Trading academy offers a wide range of educational resources, including video tutorials, articles, and webinars, ensuring you have a ...",
        images: [{url:'http://res.cloudinary.com/brainpit/image/upload/v1768839497/j0lwjr7t4lh2ttsimfs1.png',width:1200,height:630,alt:`image for xm academy`}],
      },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${custom.variable} ${body.variable} antialiased`}
      >
        {/* <GridLines/> */}
        {children}
      </body>
      {/* <Footer/> */}
    </html>
  );
}
