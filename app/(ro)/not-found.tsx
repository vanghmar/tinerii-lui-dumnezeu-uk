import { ButtonLink, SectionBand } from "@/components/ui";

export default function NotFound() {
  return (
    <SectionBand tint className="text-center">
      <h1 className="font-serif text-4xl text-stone-800">Pagina nu a fost găsită</h1>
      <p className="text-stone-600 mt-4">
        Ne pare rău — pagina pe care o cauți nu există.
      </p>
      <div className="mt-7">
        <ButtonLink href="/">Înapoi acasă</ButtonLink>
      </div>
    </SectionBand>
  );
}
