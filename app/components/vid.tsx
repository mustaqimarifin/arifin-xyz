const HeroImage = () => {
  return (
    <div className="justify-between size-24 border-gray-200 flex overflow-hidden aspect-square">
      <video
        autoPlay
        loop
        muted
        playsInline
        //width={200}
        //height={200}
        className="flex-1 rounded-full object-cover box-border border-indigo-700 "
      >
        <source src="/Xyz2.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default HeroImage;
