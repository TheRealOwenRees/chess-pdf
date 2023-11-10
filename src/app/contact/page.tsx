import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import SectionDescription from "@/app/components/SectionDescription";
import ContactForm from "@/app/contact/ContactForm";

const Contact = () => {
    return (
        <section className="grid md:grid-cols-2 place-items-center">
            <SectionLargeHeading className="md:col-span-2" text="Contact" textAccent="Us" />
            <SectionDescription
              className="md:col-span-2"
              text="Do you have suggestions on how to improve this service? Would you like to get involved with this project? Ask us anything you like." />
            <ContactForm />
        </section>
    );
}

export default Contact;