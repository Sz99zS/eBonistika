import { notFound } from "next/navigation";

import { InstanceView } from "@/components/instance/InstanceView";
import { PageMeta } from "@/components/layout/PageMeta";
import { fetchCollections } from "@/lib/api/collections";
import { fetchItemsBySeries } from "@/lib/api/items";
import { fetchSeriesById } from "@/lib/api/series";

export default async function InstancePage({
  params,
}: PageProps<"/collections/[id]/series/[seriesId]/items/[itemId]">) {
  const { id, seriesId, itemId } = await params;

  const [collections, series, items] = await Promise.all([
    fetchCollections(),
    fetchSeriesById(seriesId),
    fetchItemsBySeries(seriesId),
  ]);

  const collection = collections.find((c) => c.id === id);
  console.log("[item-page] id:", id, "seriesId:", seriesId, "itemId:", itemId);
  console.log("[item-page] collection:", collection?.id ?? "NOT FOUND");
  console.log("[item-page] series:", series ? `${series.id} collectionId=${series.collectionId}` : "NULL");
  console.log("[item-page] items count:", items.length, "ids:", items.map(i => i.id));
  if (!collection || !series || series.collectionId !== id) {
    console.log("[item-page] notFound via collection/series check");
    notFound();
  }

  const index = items.findIndex((i) => i.id === itemId);
  if (index < 0) {
    console.log("[item-page] notFound: itemId not in items list");
    notFound();
  }
  const item = items[index];

  const base = `/collections/${collection.id}/series/${series.id}/items`;
  const prevHref = index > 0 ? `${base}/${items[index - 1].id}` : null;
  const nextHref = index < items.length - 1 ? `${base}/${items[index + 1].id}` : null;
  const closeHref = `/collections/${collection.id}/series/${series.id}`;

  return (
    <>
      <PageMeta
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: collection.name, href: `/collections/${collection.id}` },
          { label: series.name, href: closeHref },
          { label: `${item.nominal} ${item.currency}, ${item.year}` },
        ]}
      />
      <section className="mx-auto max-w-6xl">
        <InstanceView
          item={item}
          prevHref={prevHref}
          nextHref={nextHref}
          closeHref={closeHref}
        />
      </section>
    </>
  );
}
