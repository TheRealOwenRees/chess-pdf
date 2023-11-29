"use client";

const FAQAccordion = () => {

  return (
    <div className="join join-vertical w-3/4 max-w-lg col-span-2">
      <div className="collapse collapse-plus join-item border-b border-base-300">
        <input type="radio" name="faq-accordion" data-test="accordion-item" />
        <div className="collapse-title text-xl font-medium">
          Is this service free?
        </div>
        <div className="collapse-content">
          <p data-test="accordion-text">Yes. There are no current plans to charge for this service. If in the future there is a payment plan, it will come with a generous free tier.</p>
        </div>
      </div>
      <div className="collapse collapse-plus join-item border-b border-base-300">
        <input type="radio" name="faq-accordion" data-test="accordion-item" />
        <div className="collapse-title text-xl font-medium">
          Will you be adding more features?
        </div>
        <div className="collapse-content">
          <p data-test="accordion-text">We have a lot more features to implement in the near future. If you have a feature that you would like to see implemented, please feel free to send us a message via our contact form.</p>
        </div>
      </div>
      <div className="collapse collapse-plus join-item">
        <input type="radio" name="faq-accordion" data-test="accordion-item" />
        <div className="collapse-title text-xl font-medium">
          Do you hold any copyright on the produced materials?
        </div>
        <div className="collapse-content">
          <p data-test="accordion-text">No. We will never implement any terms whereby we have any interest in the materials created with this service.</p>
        </div>
      </div>
    </div>
    // <Accordion
    //   className={className}
    //   itemClasses={itemClasses}
    //   data-test="accordion"
    // >
    //   <AccordionItem
    //     key="1"
    //     aria-label="Is this service free?"
    //     title="Is this service free?"
    //     indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
    //     data-test="accordion-item"
    //   >
    //     <p data-test="accordion-text">Yes. There are no current plans to charge for this service. If in the future there is a payment plan, it will come with a generous free tier.</p>
    //   </AccordionItem>
    //   <AccordionItem
    //     key="2"
    //     aria-label="Will you be adding more features?"
    //     title="Will you be adding more features?"
    //     indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
    //   >
    //     <p>We have a lot more features to implement in the near future. If you have a feature that you would like to see implemented, please feel free to send us a message via our contact form.</p>
    //   </AccordionItem>
    //   <AccordionItem
    //     key="3"
    //     aria-label="Do you hold any copyright on the produced materials?"
    //     title="Do you hold any copyright on the produced materials?"
    //     indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
    //   >
    //     <p>No. We will never implement any terms whereby we have any interest in the materials created with this service.</p>
    //   </AccordionItem>
    // </Accordion>
  );
};

export default FAQAccordion;