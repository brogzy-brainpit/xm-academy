/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react
  
import SlideUpText from "@/app/effects/SlideUpText";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#1C2218"},"dark":{"cal-brand":"#fafafa"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return (
    <div className="flex flex-col gap-4 py-8 container mx-auto container-section ">
               <SlideUpText center duration={0.5} delay={0.04} className=' text-white text-center bebas text-footer leading-footer uppercase'id="book-a-call" text={'book a meeting'}/>  
    <Cal namespace="30min"
    calLink="coach-x/30min"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}
    
    
  /></div>
  )
};
  