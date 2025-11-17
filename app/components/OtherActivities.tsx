"use client";

export default function OtherActivitiesSection() {
  // Adjustable diagonal angle - increase this number to make the diagonal steeper
  // Lower values = more horizontal, Higher values = more vertical
  const diagonalAngle = 22; // Percentage - adjusts the slope of the diagonal

  return (
    <section className="w-full min-h-screen relative overflow-hidden -mt-1">
      {/* Diagonal split background */}
      <div className="absolute inset-0">
        {/* Dark section (top) - #171717 */}
        <div
          className="absolute inset-0 bg-[#171717]"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% ${50 - diagonalAngle}%, 0 ${
              50 + diagonalAngle
            }%)`,
          }}
        />

        {/* White section (bottom) */}
        <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: `polygon(0 ${50 + diagonalAngle}%, 100% ${
              50 - diagonalAngle
            }%, 100% 100%, 0 100%)`,
          }}
        />
      </div>

      {/* Content container - relative positioning for content to sit above background */}
      <div className="relative z-10 w-full min-h-screen p-20">
        {/* Content will go here */}
      </div>
    </section>
  );
}
