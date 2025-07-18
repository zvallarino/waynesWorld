import ContactForm from "@/components/body/ContactForm";

import Toolbar from "@/components/toolbar/Toolbar";

export default function Contact() {
  return (
    <div className="flex w-screen h-screen  flex-col px-[15%]">
      <div className="flex h-1/6" >
      <Toolbar />
      </div>
      <div className="flex  h-5/6" ><ContactForm /></div>
    </div>
  )
}