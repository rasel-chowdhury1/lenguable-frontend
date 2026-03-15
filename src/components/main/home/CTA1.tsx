import { Button } from "@/components/ui/button";
import img1 from "../../../../public/images/img (4).jpg";
import Image from "next/image";

const CTA1 = () => {
  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white rounded-full px-4 py-2 text-sm text-gray-700 border border-gray-200 mb-5">
              GET STARTED
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Upgrade Your Skills, Build Your Future With Lenguable !
            </h2>
            <p className="mb-5">
              At Lenguable, our story is built around one simple goal — helping
              students speak English with confidence. We combine structured
              lessons, experienced native tutors, and a clear step-by-step
              learning path to make progress simple and effective. Every class
              is designed with purpose, so you always know what you’re learning.
            </p>
            <Button className="bg-[#A9F877] hover:bg-[#C1FF72] text-black">
              Start Learning
            </Button>
          </div>

          <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
            <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-200">
              <Image
                src={img1}
                alt="CTA Image"
                height={384}
                width={512}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA1;
