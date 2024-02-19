import HeroBanner from "@/components/platform/home/hero-banner";
import InstructionBlock from "@/components/platform/home/instuction-auction/instruction-block";
import LiveAuctions from "@/components/platform/home/live-auction/live-auction";
import TopAuction from "@/components/platform/home/top-auction/top-auction";


export default function Home() {

  return (
    <div className='mb-20'>
      <HeroBanner />
      <TopAuction/>
      <InstructionBlock/>
      <LiveAuctions/>
    </div>
  )
}
