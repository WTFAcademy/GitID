import HomeHeader from "@/components/home- header";

function Main() {
  return (
    <section>
      <div className="pt-32 pb-12 md:pt-44 md:pb-20">
        <div className="px-4 sm:px-6">
          <HomeHeader
            className="mb-12"
            title="The software that sparks your imagination"
            description="Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever."
          >
            Waitlist v1 <span className="text-gray-300 mx-1">·</span> Coming
            Soon
          </HomeHeader>
        </div>
      </div>
    </section>
  );
}

export default Main;
