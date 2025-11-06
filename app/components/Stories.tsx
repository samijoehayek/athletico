"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TopStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const stories = [
    {
      nationality: "LEBANESE",
      name: "LIAM DUARTE",
      age: "AGE 15",
      topSpeed: "35.4 KM/H",
      shootingPower: "112 KM/H",
      shootingAccuracy: "82%",
      mainImage:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=200&h=200&fit=crop",
    },
    {
      nationality: "BRAZILIAN",
      name: "CARLOS SILVA",
      age: "AGE 17",
      topSpeed: "38.2 KM/H",
      shootingPower: "118 KM/H",
      shootingAccuracy: "85%",
      mainImage:
        "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&h=200&fit=crop",
    },
    {
      nationality: "SPANISH",
      name: "DIEGO MARTINEZ",
      age: "AGE 16",
      topSpeed: "36.8 KM/H",
      shootingPower: "115 KM/H",
      shootingAccuracy: "88%",
      mainImage:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=200&h=200&fit=crop",
    },
    {
      nationality: "ARGENTINIAN",
      name: "MATEO FERNANDEZ",
      age: "AGE 18",
      topSpeed: "37.5 KM/H",
      shootingPower: "120 KM/H",
      shootingAccuracy: "90%",
      mainImage:
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1564513148692-30f17e448f3d?w=200&h=200&fit=crop",
    },
  ];

  const nextStory = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextStory();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const currentStory = stories[currentIndex];
  const nextStoryData = stories[(currentIndex + 1) % stories.length];

  return (
    <section className="bg-white w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column - Title and Player Info */}
        <div className="lg:w-[35%] flex flex-col justify-between">
          {/* Title */}
          <div className="mb-8 lg:mb-0">
            <h2 className="text-[#3050FD] font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase">
              TOP
              <br />
              STORIES
            </h2>
          </div>

          {/* Player Info */}
          <div className="space-y-6">
            {/* Profile Image and Details */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={currentStory.profileImage}
                  alt={currentStory.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[#171717] text-[20px] font-normal uppercase">
                  {currentStory.nationality}
                </p>
                <p className="text-[#171717] text-[30px] font-bold uppercase leading-tight">
                  {currentStory.name}
                </p>
                <p className="text-[#171717] text-[20px] font-normal uppercase">
                  {currentStory.age}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              <div>
                <p className="text-[#171717] text-[16px] font-normal uppercase">
                  TOP SPEED
                </p>
                <p className="text-[#171717] text-[16px] font-bold">
                  {currentStory.topSpeed}
                </p>
              </div>
              <div>
                <p className="text-[#171717] text-[16px] font-normal uppercase">
                  SHOOTING POWER
                </p>
                <p className="text-[#171717] text-[16px] font-bold">
                  {currentStory.shootingPower}
                </p>
              </div>
              <div>
                <p className="text-[#171717] text-[16px] font-normal uppercase">
                  SHOOTING ACCURACY
                </p>
                <p className="text-[#171717] text-[16px] font-bold">
                  {currentStory.shootingAccuracy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Main Image */}
        <div className="lg:w-[45%] relative overflow-hidden">
          <div
            className={`relative w-full h-[500px] md:h-[600px] transition-transform duration-500 ease-in-out ${
              isAnimating ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <Image
              src={currentStory.mainImage}
              alt={currentStory.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column - Next Up */}
        <div className="lg:w-[20%] flex flex-col items-end">
          <div className="text-right mb-4">
            <p className="text-[#171717] text-[16px] font-bold uppercase">
              NEXT UP
            </p>
          </div>
          <div
            className="relative w-full h-[300px] md:h-[400px] overflow-hidden cursor-pointer"
            onClick={nextStory}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 ease-in-out ${
                isAnimating
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <Image
                src={nextStoryData.mainImage}
                alt={nextStoryData.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
