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
    <main className="bg-[#F4EFE9] text-[#1F1F1F]">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8CBBE] via-[#F4EFE9] to-[#F4EFE9]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <h1 className="max-w-3xl text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
            Building Trust. <br className="hidden sm:block" />
            Delivering Exceptional Properties.
          </h1>

          <p className="mt-6 max-w-2xl text-[#6B6B6B] text-lg">
            A modern real estate platform focused on transparency,
            quality, and long-term value — helping people discover
            spaces they’re proud to own or occupy.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-semibold">
              Who We Are
            </h2>

            <p className="mt-6 text-[#6B6B6B] leading-relaxed">
              We are a forward-thinking real estate company committed to
              simplifying property discovery across residential, commercial,
              and land segments. Our platform combines verified listings,
              detailed insights, and a refined user experience.
            </p>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">
              Whether you’re buying, selling, or leasing, our mission is to
              remove friction, build confidence, and help you make informed
              decisions backed by real data and local expertise.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4EFE9] border border-[#E8E2DA] text-[#C9A24D]">
                <Building2 />
              </div>
              <span className="font-medium">
                Trusted by buyers, sellers, and investors
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-[320px] sm:h-[420px] w-full overflow-hidden rounded-3xl border border-[#E8E2DA] shadow-sm">
            <Image
              src="/placeholder.png"
              alt="About us"
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              Our Core Values
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[#6B6B6B]">
              Everything we do is guided by principles that prioritize trust,
              clarity, and long-term relationships.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={<ShieldCheck />}
              title="Transparency"
              description="Clear pricing, verified listings, and honest insights."
            />
            <ValueCard
              icon={<Users />}
              title="Customer First"
              description="Every experience is designed around real user needs."
            />
            <ValueCard
              icon={<Target />}
              title="Precision"
              description="Accurate data and refined property discovery."
            />
            <ValueCard
              icon={<Award />}
              title="Excellence"
              description="We aim to exceed expectations consistently."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-[#E8E2DA]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">

          <h2 className="text-3xl sm:text-4xl font-semibold">
            Ready to Find Your Next Property?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#6B6B6B]">
            Explore verified listings across residential, commercial, and land
            categories — designed for clarity and confidence.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/properties"
              className="group inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
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

/* VALUE CARD */

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
    <div className="rounded-3xl border border-[#E8E2DA] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4EFE9] border border-[#E8E2DA] text-[#C9A24D]">
        {icon}
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="mt-2 text-sm text-[#6B6B6B]">
        {description}
      </p>
    </div>
  );
}