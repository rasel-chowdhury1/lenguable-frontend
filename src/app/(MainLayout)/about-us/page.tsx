import Hero from "@/components/main/about/Hero";
import HowItWorks from "@/components/main/about/HowItWorks";
import CTA1 from "@/components/main/home/CTA1";
import CTA2 from "@/components/main/home/CTA2";
import Testimonials from "@/components/main/home/Testimonials";

const page = () => {
  return (
    <div className="pt-5">
      <Hero />
      <CTA1 />
      <HowItWorks />
      <Testimonials />
      <CTA2 />
    </div>
  );
};

export default page;
