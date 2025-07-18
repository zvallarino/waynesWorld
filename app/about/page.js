import AboutText from "@/components/body/AboutText";

import Toolbar from "@/components/toolbar/Toolbar";

export default function About() {
  return (
    <div className="flex w-full h-screen  flex-col px-[15%]">
      <div className="flex h-1/6" >
      <Toolbar />
      </div>
      <div className="flex  h-5/6" ><AboutText /></div>
    </div>
  )
}