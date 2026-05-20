import React from 'react';

const Expertise = () => {
  const expertise = [
    {
      id: 1,
      title: "Quality Construction",
      description: "At Tanavi Properties, we focus on delivering high-quality, sustainable construction with an emphasis on precision and durability. As one of the best real estate builders in Hyderabad, we use top-tier quality materials and cutting-edge technology to ensure every project is built to stand the test of time.",
      icon: "⚙️"
    },
    {
      id: 2,
      title: "Innovative Design",
      description: "We pride ourselves on creating innovative architectural designs that blend functionality with modern aesthetics. Our residential and commercial spaces are carefully planned to offer both comfort and style, making us one of the top builders in Hyderabad.",
      icon: "📐"
    },
    {
      id: 3,
      title: "Luxury Gated Communities",
      description: "We specialize in crafting exclusive gated communities that offer residents a secure and family-friendly environment. Designed with world-class amenities, our communities promote safety, convenience, and a harmonious lifestyle.",
      icon: "🏘️"
    },
    {
      id: 4,
      title: "Timely Project Delivery",
      description: "We understand the importance of delivering projects on time. With a proven track record, we have established ourselves as a reliable residential construction company in Hyderabad, ensuring that our clients' expectations are consistently met without compromising on quality.",
      icon: "⏱️"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">
          OUR EXPERTISE
          <div className="w-24 h-1 bg-red-600 mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {expertise.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-50 p-8 rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">
                {item.title.toUpperCase()}
                <div className="w-16 h-1 bg-red-600 mt-2"></div>
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
