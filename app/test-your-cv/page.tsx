import DarkTheme from "@/components/modules/landing/dark-theme";
import Footer from "@/components/modules/landing/footer";
import Navbar from "@/components/modules/landing/nav";
import SavingTime from "@/components/modules/landing/saving-time/saving-time";
import DropzoneCV from "@/components/modules/about/dropzone-cv";
import Logos from "@/components/modules/landing/logos";
import TestYourCvPlaceholder from "@/components/modules/landing/test-your-cv/test-your-cv-placeholder";

export default function TestYourCV() {
  return (
    <DarkTheme>
    <Navbar />
    <div className="max-w-screen-lg px-4 lg:px-0 mx-auto text-center pt-10">


    <div className='w-fit my-2 mx-auto cursor-pointer group hover:border-white/20 hover:divide-white/20 border bg-muted/70 backdrop-blur-sm flex divide rounded-full border bg-dark text-xs font-medium drop-shadow-sm transition-all duration-150 sm:divide-x animate-slide-up-fade [--offset:10px] [animation-delay:0ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in'>
      <span className='py-1.5 pl-3 sm:pr-2.5 flex items-center'>Test your resume</span>
    </div>
    
    <div className='mb-4 font-display effect-font-styling text-[3.5rem] md:text-[3rem] leading-[3.35rem] md:leading-[3.5rem] tracking-tight gradient-text hero-text w-1/2 mx-auto text-balance'>
      How good is your CV, really?
    </div>
    <div className='w-1/2 mx-auto'>
      <div className='text-md md:text-md text-center mt-1 mb-5 text-balance'>
        Upload your CV and get an instant review: a quality grade, expert comment, and a rewritten example of how to improve it.
      </div>

      <div className="hidden">
      
      <DropzoneCV />

      <div className='text-xs text-muted-foreground text-center mt-3'>
        Your data is processed securely and they are not stored internally.
      </div>

      </div>
    </div>
    <TestYourCvPlaceholder />





      <Logos copy={"Our users have landed roles at world-class companies"} variant="inline" className="mt-28" />

      <SavingTime className="mt-20 text-left" />
      <Footer />
    </div>

    </DarkTheme>
  );
} 