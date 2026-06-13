import { ChurchDetailPage } from "@/components/pages/church-detail";
import { churches } from "@/data/churches";

export function generateStaticParams() {
  return churches.map((c) => ({ id: c.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChurchDetailPage id={id} locale="ro" />;
}
