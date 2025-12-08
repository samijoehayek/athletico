// app/team/components/TeamHero.tsx

export default function TeamHero() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-16 pt-32 md:pt-40 pb-16">
      {/* ATHLETICO */}
      <h1
        className="text-white font-extrabold uppercase leading-none tracking-wide"
        style={{
          fontSize: "clamp(60px, 10vw, 120px)",
          letterSpacing: "0.05em",
        }}
      >
        ATHLETICO
      </h1>

      {/* TEAM */}
      <h2
        className="text-white font-extrabold uppercase leading-none tracking-wide mt-2"
        style={{
          fontSize: "clamp(40px, 7vw, 80px)",
          letterSpacing: "0.05em",
        }}
      >
        TEAM
      </h2>
    </section>
  );
}
