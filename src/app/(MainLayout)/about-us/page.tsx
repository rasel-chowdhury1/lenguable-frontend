import Hero from "@/components/main/about/Hero";
import Vision from "@/components/main/about/Vision";
import CTA2 from "@/components/main/home/CTA2";
import HowItWorks from "@/components/main/home/HowItWorks";
import Testimonials from "@/components/main/home/Testimonials";

const page = () => {
  return (
    <div className="pt-5">
      <Hero />
      <Vision />
      <HowItWorks />
      <Testimonials />
      <CTA2 />
    </div>
  );
};

export default page;
