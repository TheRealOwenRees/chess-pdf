import Image from "next/image";
import Link from "next/link";

import FAQAccordion from "@/app/components/Accordion";
import Feature from "@/app/components/Feature";
import SectionDescription from "@/app/components/SectionDescription";
import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import SectionSmallHeading from "@/app/components/SectionSmallHeading";
import examplePDF1 from "@/img/examplepdf1.webp";
import examplePDF2 from "@/img/examplepdf2.webp";

export default function Home() {
  return (
    <>
      <main className="grid max-w-screen-2xl items-center gap-8 p-8 text-center md:grid-cols-2 md:text-left">
        <div>
          <h1 className="text-3xl font-bold text-base-content md:text-4xl">
            Convert your Chess PGN
          </h1>
          <h1 className="text-3xl font-bold text-base-content md:text-4xl">
            into a <span className="text-primary">Publishable PDF.</span>
          </h1>
          <h2 className="mb-8 mt-4 text-gray-800">
            Upload and convert your games into a book format, along with
            variations and annotations.
          </h2>
          <Link
            className="btn btn-primary btn-lg btn-wide rounded-3xl text-xl font-bold"
            href="/chessboard"
          >
            Get Started
          </Link>
        </div>
        <div className="example-pdfs">
          <Image src={examplePDF2} alt="chess pdf" />
          <Image src={examplePDF1} alt="chess pdf" priority />
        </div>
      </main>
      <section className="mx-auto mt-8 grid max-w-screen-lg place-items-center gap-4 p-8 text-center md:grid-cols-3 md:text-left">
        <SectionSmallHeading className="md:col-span-3" text="FEATURES" />
        <SectionLargeHeading
          className="md:col-span-3"
          text="A Unique Chess Publication "
          textAccent="Service"
        />
        <SectionDescription
          className="md:col-span-3"
          text="Convert your chess PGN files into a publishable PDF, complete with diagrams of chosen positions."
        />
        <Feature
          title="Fast"
          text="Quick PDF generation using a custom TeX Live server."
        />
        <Feature
          title="Easy"
          text="Upload a PGN of your game, and choose the diagrams you want in your PDF. Annotations are added automatically."
        />
        <Feature
          title="Reliable"
          text="Dedicated servers ensure that downtime is kept to a minimum."
        />
      </section>
      <section className="mt-8 grid place-items-center items-center p-8 text-center md:grid-cols-2 md:text-left">
        <SectionSmallHeading className="col-span-2" text="FAQs" />
        <SectionLargeHeading
          className="col-span-2"
          text="Your Questions "
          textAccent="Answered"
        />
        <SectionDescription
          className="col-span-2"
          text="Below we answer some of the most common questions we get regarding this service."
        />
        <FAQAccordion />
      </section>
    </>
  );
}
