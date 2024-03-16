import HeroBanner from "@/components/platform/home/hero-banner";
import InstructionBlock from "@/components/platform/home/instuction-auction/instruction-block";
import LiveAuctions from "@/components/platform/home/comming-auction/comming-auction";
import TopAuction from "@/components/platform/home/live-auction/live-auction";


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
