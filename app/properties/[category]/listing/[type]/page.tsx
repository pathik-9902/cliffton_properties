import ListingClient from './ListingClient';

/* ---------------- PAGE ---------------- */

export default async function ListingPage({
  params,
}: {
  params: Promise<{ category: string; type: string }>;
}) {
  const { category, type } = await params;

  return (
    <ListingClient
      category={category}
      type={type}
    />
  );
}