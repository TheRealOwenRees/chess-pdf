"use client";

const FAQAccordion = () => {
  return (
    <div
      className="join join-vertical col-span-2 w-3/4 max-w-lg"
      data-test="accordion"
    >
      <div className="collapse join-item collapse-plus border-b border-base-300">
        <input type="radio" name="faq-accordion" data-test="accordion-item" />
        <div className="collapse-title text-xl font-medium">
          Is this service free?
        </div>
        <div className="collapse-content">
          <p data-test="accordion-text">
            Yes. There are no current plans to charge for this service. If in
            the future there is a payment plan, it will come with a generous
            free tier.
          </p>
        </div>
      </div>
      <div className="collapse join-item collapse-plus border-b border-base-300">
        <input type="radio" name="faq-accordion" data-test="accordion-item" />
        <div className="collapse-title text-xl font-medium">
          Will you be adding more features?
        </div>
        <div className="collapse-content">
          <p data-test="accordion-text">
            We have a lot more features to implement in the near future. If you
            have a feature that you would like to see implemented, please feel
            free to send us a message via our contact form.
          </p>
        </div>
      </div>
      <div className="collapse join-item collapse-plus">
        <input type="radio" name="faq-accordion" data-test="accordion-item" />
        <div className="collapse-title text-xl font-medium">
          Do you hold any copyright on the produced materials?
        </div>
        <div className="collapse-content">
          <p data-test="accordion-text">
            No. We will never implement any terms whereby we have any interest
            in the materials created with this service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
