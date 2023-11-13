import FormField from "@/app/chessboard/FormField";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { FaPlus, FaMinus } from 'react-icons/fa'

const HeaderFields = () => {
  const itemClasses = {
    base: "py-2",
    title: "font-bold text-lg text-gray-700",
    content: "text-gray-700 text-md",
  }

  return (
    <section className="mt-4">
      <Accordion
        itemClasses={itemClasses}
      >
        <AccordionItem
          key="1"
          title="Headers"
          aria-label="Headers"
          indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
        >
          <form className="grid sm:grid-cols-2 gap-4 mt-4 place-items-center">
            <FormField fieldName="event" type="text" />
            <FormField fieldName="site" type="text" />
            <FormField fieldName="date" type="text" />
            <FormField fieldName="round" type="text" />
            <FormField fieldName="white" type="text" />
            <FormField fieldName="black" type="text" />
            <FormField fieldName="result" type="text" />
            <FormField fieldName="eco" type="text" />
            <FormField fieldName="whiteElo" type="text" />
            <FormField fieldName="blackElo" type="text" />
            <FormField fieldName="plyCount" type="text" />
            <FormField fieldName="eventDate" type="text" />
            <FormField fieldName="source" type="text" />
          </form>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default HeaderFields