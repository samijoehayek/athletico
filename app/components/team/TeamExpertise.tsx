// app/team/components/TeamExpertise.tsx

export default function TeamExpertise() {
  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-16 py-20 md:py-28">
      <div className="max-w6xl">
        {/* Main Heading */}
        <h2
          className="text-[#171717] leading-tight font-outfit"
          style={{
            fontSize: "clamp(50px, 8vw, 100px)",
          }}
        >
          <span className="font-normal">Alongside our </span>
          <span className="font-bold">core team,</span>
          <br />
          <span className="font-normal">we offer the expertise of a</span>
        </h2>

        {/* Subheading */}
        <p
          className="text-[#171717] mt-8 leading-relaxed"
          style={{
            fontSize: "clamp(18px, 3vw, 30px)",
          }}
        >
          <span className="font-bold">Psychologist, nutritionist, </span>
          <span className="font-normal">and </span>
          <span className="font-bold">physiotherapist</span>
          <br />
          <span className="font-normal">for complete mind-body guidance.</span>
        </p>
      </div>
    </section>
  );
}
