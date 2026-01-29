import Image from 'next/image';
import {
  Building2,
  ShieldCheck,
  Users,
  Target,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-[#faf7f3]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6f4e37]/90 via-[#8b6f4e]/70 to-[#c6a15b]/40" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-white">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Building Trust. <br className="hidden sm:block" />
            Delivering Exceptional Properties.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/90">
            We are a modern real estate platform focused on transparency,
            quality, and long-term value — helping people discover spaces
            they’re proud to own or occupy.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold text-[#1f1f1f]">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              We are a forward-thinking real estate company committed to
              simplifying property discovery across residential, commercial,
              and land segments. Our platform combines verified listings,
              detailed insights, and a refined user experience.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether you’re buying, selling, or leasing, our mission is to
              remove friction, build confidence, and help you make informed
              decisions backed by real data and local expertise.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ede3d5] text-[#6f4e37]">
                <Building2 />
              </div>
              <span className="font-semibold text-gray-800">
                Trusted by buyers, sellers, and investors
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-lg sm:h-[420px]">
            <Image
              src="/placeholder.png"
              alt="About us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
            Our Core Values
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Everything we do is guided by principles that prioritize trust,
            clarity, and long-term relationships.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={<ShieldCheck />}
              title="Transparency"
              description="Clear pricing, verified listings, and honest property insights at every step."
            />
            <ValueCard
              icon={<Users />}
              title="Customer First"
              description="We design every experience around the needs of buyers, sellers, and tenants."
            />
            <ValueCard
              icon={<Target />}
              title="Precision"
              description="Accurate data, refined search, and thoughtfully curated property details."
            />
            <ValueCard
              icon={<Award />}
              title="Excellence"
              description="We aim to exceed expectations through design, service, and reliability."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#6f4e37]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Find Your Next Property?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Explore verified listings across residential, commercial, and land
            categories — designed for clarity and confidence.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/properties"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#6f4e37] transition-all duration-300 hover:bg-[#ede3d5]"
            >
              Browse Properties
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#efe6dc] bg-[#faf7f3] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ede3d5] text-[#6f4e37]">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-[#1f1f1f]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
}
