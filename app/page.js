import Homepage from "@/components/body/Homepage";
import Toolbar from "@/components/toolbar/Toolbar";

export default function Home() {
  return (
    <div className="flex w-screen h-screen  flex-col px-[5%]">
      <div className="flex  h-1/5" >
      <Toolbar />
      </div>
      <div className="flex  h-4/5" ><Homepage /></div>
    </div>
  )
}