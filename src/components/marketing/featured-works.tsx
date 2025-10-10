import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "EcoTrack",
    description: "Monitor and optimize environmental impact in real-time through data analytics.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/bcb8d48b109cabb767cfef3995a7ddbf14a6331a?width=1576",
    color: "#545454",
    position: "col-start-1 row-start-1",
  },
  {
    id: 2,
    title: "HomeNest",
    description: "Transform any space into a smart home with customizable automation options.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/d1e3b79c7882105a073f340d0c30a1a900f0c949?width=1598",
    color: "#545454",
    position: "col-start-2 row-start-1 md:translate-y-16",
  },
  {
    id: 3,
    title: "FitFlex",
    description: "Personalized workout and nutrition plans that adapt to user progress and feedback.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/eaf534945d725f799b9272c318be0a739d9d1f45?width=1102",
    color: "#545454",
    position: "col-start-1 row-start-2",
  },
  {
    id: 4,
    title: "BlockChainEd",
    description: "A decentralized platform for learning and sharing blockchain technology skills.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/aad2392e0bb258e9218c5d85571b5c9bf436041b?width=992",
    color: "#545454",
    position: "col-start-2 row-start-2 md:translate-y-16",
  },
  {
    id: 5,
    title: "TravelSphere",
    description: "Curate unique travel experiences based on user preferences and local insights.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/102f3110d5fdd2b33ff7050b860f9718c7afcadb?width=1600",
    color: "#545454",
    position: "col-start-1 row-start-3",
  },
  {
    id: 6,
    title: "BookCaddy",
    description: "A social platform for book lovers to share, review, and recommend their favorite reads.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/573c7ff44d2188cf791374291f32ab1b5507b47f?width=992",
    color: "#545454",
    position: "col-start-2 row-start-3 md:translate-y-32",
  },
];

export function FeaturedWorksSection() {
  return (
    <section className="w-full rounded-t-[50px] bg-[#131313] px-6 py-16 md:px-12 lg:px-52">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-20">
        <h2 className="text-center text-4xl font-medium leading-[1.25] text-[#F7F6FF]">Our Featured Work</h2>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-12">
          {projects.map((project) => (
            <div key={project.id} className={`flex flex-col items-center gap-5 ${project.position}`}>
              <div
                className="flex h-auto w-full max-w-md items-center justify-center overflow-hidden rounded-[50px]"
                style={{ backgroundColor: project.color }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={788}
                  height={591}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="flex w-full max-w-md flex-col items-start gap-2.5 px-1 pt-1">
                <h3 className="text-3xl font-medium leading-tight text-[#F7F6FF]">{project.title}</h3>
                <p className="text-lg leading-6 text-[#9BA1A6]">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/portfolio"
          className="flex h-14 items-center justify-center rounded-full border border-[#3E3E3E] px-7 text-2xl font-medium text-white transition-transform hover:scale-105"
        >
          See All
        </Link>
      </div>
    </section>
  );
}
