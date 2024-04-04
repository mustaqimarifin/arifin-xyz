"use client";
const HeroImage = () => {
  return (
    <div className="flex rounded-full border-5 overflow-hidden aspect-square">
      <video
        autoPlay
        loop
        muted
        playsInline
        width={200}
        height={200}
        className="flex-1 object-cover box-border border-indigo-700 "
      >
        <source src="/Xyz2.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default HeroImage;
