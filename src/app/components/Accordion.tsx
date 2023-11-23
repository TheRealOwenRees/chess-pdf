"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { FaPlus, FaMinus } from 'react-icons/fa'

const FAQAccordion = ({ className } : { className: string }) => {
  const itemClasses = {
    base: "py-2",
    title: "font-bold text-lg text-gray-700",
    content: "text-gray-700 text-md",
  }

  return (
    <Accordion
      className={className}
      itemClasses={itemClasses}
      data-test="accordion"
    >
      <AccordionItem
        key="1"
        aria-label="Is this service free?"
        title="Is this service free?"
        indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
        data-test="accordion-item"
      >
        <p data-test="accordion-text">Yes. There are no current plans to charge for this service. If in the future there is a payment plan, it will come with a generous free tier.</p>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Will you be adding more features?"
        title="Will you be adding more features?"
        indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
      >
        <p>We have a lot more features to implement in the near future. If you have a feature that you would like to see implemented, please feel free to send us a message via our contact form.</p>
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Do you hold any copyright on the produced materials?"
        title="Do you hold any copyright on the produced materials?"
        indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
      >
        <p>No. We will never implement any terms whereby we have any interest in the materials created with this service.</p>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQAccordion;