export default function HomePage() {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      {/* Left */}
      <div>
        <span className="uppercase text-xs tracking-widest text-[#6B6B6B]">
          Premium Real Estate
        </span>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Find your next home <br /> with Cliffton Properties
        </h1>

        <p className="mt-6 max-w-md text-[#6B6B6B] leading-relaxed">
          We showcase thoughtfully curated properties, intuitive listings,
          and personalised guidance to match you with the perfect home.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Buy a Property
          </button>

          <button className="border border-black px-6 py-3 rounded-lg">
            List Your Property
          </button>
        </div>

        <div className="flex gap-8 mt-10 text-sm">
          <div>
            <strong>500+</strong>
            <p className="text-[#6B6B6B]">Properties Sold</p>
          </div>
          <div>
            <strong>25 yrs</strong>
            <p className="text-[#6B6B6B]">Market Experience</p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6">
          <span className="text-xs uppercase text-[#6B6B6B]">
            Featured
          </span>
          <h3 className="mt-2 font-semibold">
            Modern family home in a quiet enclave
          </h3>
          <p className="text-sm text-[#6B6B6B] mt-1">
            4 beds · 3 baths · 2,800 sqft
          </p>
        </div>
      </div>
    </section>
  );
}
