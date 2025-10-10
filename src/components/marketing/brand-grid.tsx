import Image from "next/image";

const brands = [
  {
    id: 1,
    title: "Frontix",
    description: "Monitor and optimize environmental impact in real-time through data analytics.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/3d7405dcabc4b2834386ca40862571ef89da0b9b?width=1304",
    color: "#545454",
    position: "col-start-1 row-start-1",
  },
  {
    id: 2,
    title: "Bitfirst",
    description: "Transform any space into a smart home with customizable automation options.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/f3853daecf41ae7421da3fb9963284be380a3d20?width=1310",
    color: "#545454",
    position: "col-start-2 row-start-1 md:translate-y-16",
  },
  {
    id: 3,
    title: "Vernacula",
    description: "Monitor and optimize environmental impact in real-time through data analytics.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a427c717b2d578c04ac63a52598ce725a05877de?width=1368",
    color: "#545454",
    position: "col-start-1 row-start-2",
  },
  {
    id: 4,
    title: "Easedo",
    description: "Transform any space into a smart home with customizable automation options.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ab7997ef40116660302a3e537499c5ccd5dd377e?width=1334",
    color: "#545454",
    position: "col-start-2 row-start-2 md:translate-y-16",
  },
  {
    id: 5,
    title: "Tabitha Properties",
    description: "Monitor and optimize environmental impact in real-time through data analytics.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/ed26ae1bd73d6359ddf4105b7a242bff5a666270?width=1576",
    color: "#545454",
    position: "col-start-1 row-start-3",
  },
  {
    id: 6,
    title: "WOW",
    description: "Transform any space into a smart home with customizable automation options.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/7a4b8168fde60eff6e0e280d7e1134c79b53c27c?width=1598",
    color: "#545454",
    position: "col-start-2 row-start-3 md:translate-y-32",
  },
  {
    id: 7,
    title: "Jolakin",
    description: "Monitor and optimize environmental impact in real-time through data analytics.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/7c17df4df7de17f72702585a75d50d201fa2e5b4?width=1576",
    color: "#545454",
    position: "col-start-1 row-start-4",
  },
  {
    id: 8,
    title: "LordFrank",
    description: "Transform any space into a smart home with customizable automation options.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/38517cc3338b4d18c4a09991bb55a7c90cef1eb1?width=1598",
    color: "#545454",
    position: "col-start-2 row-start-4 md:translate-y-32",
  },
];

export function BrandGrid() {
  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-52">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-12">
        {brands.map((brand) => (
          <div key={brand.id} className={`flex flex-col items-center gap-5 ${brand.position}`}>
            <div
              className="flex h-auto w-full max-w-md items-center justify-center overflow-hidden rounded-[50px]"
              style={{ backgroundColor: brand.color }}
            >
              <Image
                src={brand.image}
                alt={brand.title}
                width={788}
                height={591}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex w-full max-w-md flex-col items-start gap-2.5 px-1 pt-1">
              <h3 className="text-3xl font-medium leading-tight text-[#F7F6FF]">{brand.title}</h3>
              <p className="text-lg leading-6 text-[#9BA1A6]">{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
