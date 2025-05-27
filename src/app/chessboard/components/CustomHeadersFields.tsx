import FormField from "@/app/chessboard/components/FormField";

const CustomHeaderFields = () => {
  return (
    <section className="my-4">
      <details className="collapse collapse-plus bg-base-200">
        <summary className="collapse-title text-xl font-medium">
          Custom Headers (PDF)
          <p className="text-sm font-normal">
            Text in these fields will overwrite the PGN headers in the generated
            PDF
          </p>
        </summary>
        <div className="collapse-content">
          <form className="form-control mt-4 grid place-items-center gap-4 sm:grid-cols-2">
            <FormField fieldName="title" type="text" />
            <FormField fieldName="subtitle" type="text" />
          </form>
        </div>
      </details>
    </section>
  );
};

export default CustomHeaderFields;
