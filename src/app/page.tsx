import Header from "@/components/common/Header";
import HeroSection from "@/components/common/HeroSection";
import BackgroundAnimation from "@/components/common/BackgroundAnimation";
export default function Home() {
  return (
    <main className=" relative bg-[#ffefc8]">
      <BackgroundAnimation />
      <Header />
      <HeroSection />
    </main>
  );
}
