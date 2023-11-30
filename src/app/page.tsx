import Link from "next/link";
import Image from 'next/image'

import examplePDF1 from '@/img/examplepdf1.webp'
import examplePDF2 from '@/img/examplepdf2.webp'

import SectionSmallHeading from "@/app/components/SectionSmallHeading";
import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import SectionDescription from "@/app/components/SectionDescription";
import Feature from "@/app/components/Feature";
import FAQAccordion from "@/app/components/Accordion";

export default function Home() {
  return (
  <>
    <main className="grid md:grid-cols-2 max-w-screen-2xl gap-8 items-center text-center md:text-left p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-base-content">Convert your Chess PGN</h1>
        <h1 className="text-3xl md:text-4xl font-bold text-base-content">into a <span className="text-primary">Publishable PDF.</span></h1>
        <h2 className="mt-4 mb-8 text-gray-800">Upload and convert your games into a book format, along with variations and annotations.</h2>
        <Link className="btn btn-primary btn-lg btn-wide font-bold text-xl rounded-3xl"
              href="/chessboard">Get Started</Link>
      </div>
      <div className="example-pdfs">
        <Image src={examplePDF2} alt="chess pdf" />
        <Image src={examplePDF1} alt="chess pdf" priority />
      </div>
    </main>
    <section className="grid md:grid-cols-3 gap-4 mt-8 text-center place-items-center md:text-left p-8 max-w-screen-lg mx-auto">
      <SectionSmallHeading className="md:col-span-3" text="FEATURES" />
      <SectionLargeHeading className="md:col-span-3" text="A Unique Chess Publication " textAccent="Service" />
      <SectionDescription className="md:col-span-3" text="Convert your chess PGN files into a publishable PDF, complete with diagrams of chosen positions." />
      <Feature title="Fast" text="Quick PDF generation using a custom TeX Live server." />
      <Feature title="Easy" text="Upload a PGN of your game, and choose the diagrams you want in your PDF. Annotations are added automatically." />
      <Feature title="Reliable" text="Dedicated servers ensure that downtime is kept to a minimum." />
    </section>
    <section className="grid md:grid-cols-2 mt-8 items-center text-center place-items-center md:text-left p-8">
      <SectionSmallHeading className="col-span-2" text="FAQs" />
      <SectionLargeHeading className="col-span-2" text="Your Questions " textAccent="Answered" />
      <SectionDescription className="col-span-2" text="Below we answer some of the most common questions we get regarding this service." />
      <FAQAccordion />
    </section>
  </>
  )
}
