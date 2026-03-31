import ListingClient from './ListingClient';

/* ---------------- PAGE ---------------- */

export default async function ListingPage({
  params,
}: {
  params: Promise<{ category: string; type: string }>;
}) {
  const { category, type } = await params;

  return (
    <main className="bg-[#F4EFE9] min-h-screen">
      {/* LUXURY CONTAINER WRAPPER */}
      <div className="relative">
        {/* SUBTLE TOP GRADIENT (PREMIUM TOUCH) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D8CBBE]/40 to-transparent pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10">
          <ListingClient
            category={category}
            type={type}
          />
        </div>
      </div>
    </main>
  );
}