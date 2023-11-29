import FormField from "@/app/chessboard/components/FormField";

const HeaderFields = () => {
  return (
    <section className="my-4">
      <details className="collapse collapse-plus bg-base-200">
        <summary className="collapse-title text-xl font-medium">Headers - click to edit</summary>
        <div className="collapse-content">
          <form className="form-control grid sm:grid-cols-2 gap-4 mt-4 place-items-center">
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
        </div>
      </details>
    </section>
  )
}

export default HeaderFields