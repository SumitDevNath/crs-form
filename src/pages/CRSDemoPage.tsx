import { CRSFormProvider, useCRSForm } from "../context/CRSFormContext";

import CRSInvestigationForm from "../components/crs/CRSInvestigationForm";

function CRSFormDebugOutput() {
  const { formData, isValid } = useCRSForm();

  return (
    <details className="border border-slate-200 bg-white">
      <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-700">
        Development Form State
      </summary>

      <div className="border-t border-slate-200 p-4">
        <p className="mb-3 text-xs text-slate-500">
          Validation: {isValid ? "valid" : "invalid"}
        </p>

        <pre className="max-h-[450px] overflow-auto bg-slate-950 p-4 text-xs leading-5 text-slate-100">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </details>
  );
}

function CRSDemoContent() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] px-3 py-6 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-4 bg-[#1d355d] px-5 py-4 text-white">
          <div className="grid gap-3 md:grid-cols-[1fr_360px] md:items-center">
            <div>
              <h1 className="text-lg font-semibold">Disease Selection</h1>

              <p className="mt-1 text-xs text-blue-100">
                Select the specific surveillance target for clinical branching.
              </p>
            </div>

            <select
              value="crs"
              disabled
              className="h-10 w-full rounded-md border border-blue-200 bg-white px-3 text-sm font-medium text-slate-900"
            >
              <option value="crs">Congenital Rubella Syndrome (CRS)</option>
            </select>
          </div>
        </div>

        <CRSInvestigationForm />

        <div className="mt-5">
          <CRSFormDebugOutput />
        </div>
      </div>
    </main>
  );
}

export default function CRSDemoPage() {
  return (
    <CRSFormProvider>
      <CRSDemoContent />
    </CRSFormProvider>
  );
}
