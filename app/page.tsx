import { restaurants } from "@/data";
import RestaurantGrid from "@/components/RestaurantGrid";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#4A2C17] via-[#6B3F22] to-[#8C5230] overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4380D]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F07427]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-xl">
            <p className="text-amber-300/80 text-sm tracking-widest uppercase mb-3 font-medium">
              Taste of Bundelkhand
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Real Food,
              <br />
              <span className="text-[#F5A623]">Real Flavours.</span>
            </h1>
            <p className="text-amber-100/70 text-base sm:text-lg leading-relaxed max-w-md">
              Discover the best local restaurants around you — fresh food
              delivered straight to your door.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurant listings */}
      <RestaurantGrid restaurants={restaurants} />
    </div>
  );
}
