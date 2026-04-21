import Image from "next/image";
import img from "../../../../public/images/levi.png";

export default function OurStory() {
  return (
    <section className="relative bg-[#EEFEE4] pt-12 md:pt-20 px-4 sm:px-6 overflow-hidden mt-12 md:mt-20">
      <div className="relative max-w-2xl mx-auto">
        {/* Heading */}
        <h2
          className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-10 tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Our Story
        </h2>

        {/* Paragraphs */}
        <div className="space-y-5 md:space-y-7 text-center text-gray-700 leading-relaxed text-sm md:text-[15px]">
          <p>
            Lorem Ipsum Dolor Sit Amet Consectetur.{" "}
            <strong>
              Nunc Venenatis Vulputate Tincidunt Pellentesque Quam In Hendrerit
              Facilisis Id. Pellentesque Aliquet Rhoncus Id Integer Posuere.
            </strong>{" "}
            Et Orci Leo Eget Tellus Volutpat. Massa Nisi Egestas Quam Mattis.
            Egestas Mauris Amet Nulla Lorem. Sollicitudin Viverra.
          </p>

          <p>
            Lorem Ipsum Dolor Sit Amet Consectetur.{" "}
            <strong>
              Tristique Fames Et Odio Euismod Sapien. Nibh Gravida Lorem
              Malesuada Nisi Pellentesque Et Amet Quis Donec. Turpis Lacus Arcu
              Id Ullamcorper Sit Et Lorem. Sollicitudin Facilisis Elit Eu At.
            </strong>
          </p>

          <p>
            Lorem Ipsum Dolor Sit Amet Consectetur.{" "}
            <strong>
              Gravida Ac Id Id Vestibulum Mattis Ut Faucibus Nunc.
            </strong>{" "}
            Nunc At Egestas A Vitae Scelerisque Pellentesque Eget Faucibus.
            Aliquam Ullamcorper Sagittis Vitae Amet Ultricies Senectus Velit
            Posuere. <strong>Auctor Nec Nec Nisl Vulputate Rhoncus Sed.</strong>{" "}
            Adipiscing Augue Augue Scelerisque Augue Faucibus Dui Volutpat Sit
            Feugiat.
          </p>
        </div>

        {/* Bottom row: photo + signature */}
        <div className="mt-10 md:mt-14 flex items-end justify-between gap-4">
          {/* Founders photo */}
          <div className="relative w-32 h-28 sm:w-44 sm:h-36 md:w-60 md:h-44 shrink-0">
            <Image
              src={img}
              alt="Levi and Brendman"
              fill
              className="object-contain object-bottom"
            />
          </div>

          {/* Signature */}
          <p
            className="text-3xl sm:text-5xl md:text-7xl text-gray-900 text-right"
            style={{ fontFamily: "'Stalemate', cursive" }}
          >
            Levi &amp; Brendman
          </p>
        </div>
      </div>
    </section>
  );
}
