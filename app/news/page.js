import EventsPage from "@/components/body/EventsPage";
import Homepage from "@/components/body/Homepage";
import PortfolioPage from "@/components/body/PortfolioPage";
import Toolbar from "@/components/toolbar/Toolbar";

export default function News() {
  return (
    <div className="flex w-screen h-screen  flex-col px-[15%]">
      <div className="flex  h-1/6" >
      <Toolbar />
      </div>
      <div className="flex  h-5/6" ><EventsPage /></div>
    </div>
  )
}