import HomeHeader from "@/components/home-header";
import Accordion from "@/components/accordion";


function Main() {

  const faqs = [
    {
      title: "When the software will be released?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
    {
      title:
        "Are there any limits to the number of exported tools from Waitlist?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
    {
      title: "Do you provide any support?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
    {
      title: "What does the term “per software” mean in the License?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: true,
    },
    {
      title: "How is Waitlist different from X?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
    {
      title: "What happens if I don't renew my license after one year?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
    {
      title: "How does billing work?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
    {
      title: "What is your cancellation or refund policy?",
      text: "One-time Licenses are limited by the number of software. A software is essentially a tool hosted on a single web server or IP Address.",
      active: false,
    },
  ];

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


        <div className="text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <h1 className="font-inter-tight text-5xl md:text-6xl font-bold text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-indigo-200 dark:to-gray-200 pb-4">
            FAQ
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400">
          Here we provide answers for the most common questions. From registering and accessing your account to payments and paid subscriptions.
          </p>
        </div>

        <section>
          <div className="pt-10 pb-12 md:pt-[60px] md:pb-7">
            <div className="px-4 sm:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-1">
                  {faqs.map((faq, index) => (
                    <Accordion
                      key={index}
                      title={faq.title}
                      id={`faqs-${index}`}
                      active={faq.active}
                    >
                      {faq.text}
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <w3m-button />
      </div>
    </section>
  );
}

export default Main;
