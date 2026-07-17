import type { Metadata } from "next";
import { ChurchDetailPage } from "@/components/pages/church-detail";
import { churches, getChurch } from "@/data/churches";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return churches.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const church = getChurch(id);
  if (!church) return {};

  return {
    title: `${church.name}, ${church.city}`,
    description: t(church.description, "en"),
    alternates: {
      canonical: `/en/biserici/${id}`,
      languages: { ro: `/biserici/${id}`, en: `/en/biserici/${id}` },
    },
    openGraph: church.image ? { images: [{ url: church.image, width: 640, height: 420, alt: church.name }] } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChurchDetailPage id={id} locale="en" />;
}
