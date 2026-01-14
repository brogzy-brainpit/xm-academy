/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react
  
import { getCalApi } from "@calcom/embed-react";
import { Phone } from "lucide-react";
import { useEffect } from "react";
export default function CalModalButton({text='book a call'}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return <p data-cal-namespace="30min" className="text-brand-text-dark flex font-normal text-button ls-05"
    data-cal-link="memet-oumar/30min"
    
    data-cal-config='{"layout":"month_view"}'
  >
    <Phone className="h-5 w-5 inline-flex mr-2"/> {text}</p>;
};
  