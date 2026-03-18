import { Card } from "@/components/ui/Card";

export default function DocsPage() {
  return (
    <div className="w-full min-w-0 px-4 py-5 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm text-[#94a3b8]">Docs</p>
        <h1 className="text-xl sm:text-2xl font-bold text-[#f1f5f9]">Global Gateway Docs</h1>
      </div>
      <Card hover={false}>
        <p className="text-[#94a3b8]">
          MDX-powered gateway documentation — add your docs content here.
        </p>
      </Card>
    </div>
  );
}
