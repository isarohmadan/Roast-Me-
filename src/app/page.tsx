import Image from "next/image";
import DashboardComponent from "@/components/DashboardComponent";
import Header from "@/components/common/Header";
import HeroSection from "@/components/common/HeroSection";
import BackgroundAnimation from "@/components/common/BackgroundAnimation";
export default function Home() {
  return (
    <main className="max-h-screen relative bg-[#ffefc8]">
      <BackgroundAnimation />
      <Header />
      <HeroSection />
    </main>
  );
}
