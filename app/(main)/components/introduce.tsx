function IntroduceItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  );
}

function Introduce() {
  const introduces = [
    {
      icon: "",
      title: "Acquisition",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      icon: "",
      title: "Activation",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      icon: "Retention",
      title: "Acquisition",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  return (
    <div className="flex items-center max-w-3xl mx-auto">
      {introduces.map((introduce, index) => (
        <IntroduceItem
          key={index}
          title={introduce.title}
          description={introduce.description}
          icon={introduce.icon}
        ></IntroduceItem>
      ))}
    </div>
  );
}

export default Introduce;
