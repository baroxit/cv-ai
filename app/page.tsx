import Worldwide from "@/components/modules/landing/worldwide/worldwide";
import Logos from "@/components/modules/landing/logos";
import Ats from "@/components/modules/landing/ats/ats";
import Privacy from "@/components/modules/landing/privacy/privacy";
import Versions from "@/components/modules/landing/versions/versions";
import HeroSection from "@/components/modules/landing/hero/hero-section";
import Navbar from "@/components/modules/landing/nav";
import HeroPlaceholder from "@/components/modules/landing/hero/hero-placeholder";
import Users from "@/components/modules/landing/users/users";
import EnhancingAI from "@/components/modules/landing/enhancing-ai/enhancing-ai";
import DarkTheme from "@/components/modules/landing/dark-theme";
import Footer from "@/components/modules/landing/footer";


export default async function Home() {



  return (
    <DarkTheme>
    <Navbar />

    <div className="max-w-screen-lg px-4 lg:px-0 mx-auto">




      <HeroSection className="mt-12" />

      <HeroPlaceholder className="mt-16" />


      <Logos copy={"Our users have landed roles at world-class companies"} variant="inline" className="-mt-32 md:mt-12 mb-28" />


      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-20 md:gap-4 mt-20">
        <Versions className="md:col-span-3" />
        <Privacy className="md:col-span-2" />
      </div> 
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 md:mt-4 gap-y-20 md:gap-4">
        <Worldwide />
        <Ats /> 
      </div> 

      <EnhancingAI className="my-40 w-full overflow-hidden" />

      <Users className="mt-20" />
      
      <Footer />

    </div>
    </DarkTheme>
  );
}
