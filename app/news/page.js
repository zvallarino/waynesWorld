import EventsPage from "@/components/body/EventsPage";
import Homepage from "@/components/body/Homepage";
import PortfolioPage from "@/components/body/PortfolioPage";
import Toolbar from "@/components/toolbar/Toolbar";

export default function News() {
  return (
    <div className="flex w-screen h-screen bg-green-500 flex-col px-[5%]">
      <div className="flex bg-amber-300 h-1/5" >
      <Toolbar />
      </div>
      <div className="flex bg-red-300 h-4/5" ><EventsPage /></div>
    </div>
  )
}