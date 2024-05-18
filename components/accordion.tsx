"use client";

import { useState, useEffect } from "react";

type AccordionpProps = {
  children: React.ReactNode;
  title: string;
  id: string;
  active?: boolean;
};

export default function Accordion({
  children,
  title,
  id,
  active = false,
}: AccordionpProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccordionOpen(active);
  }, []);

  return (
    <div className="bg-gradient-to-tr from-white/70 to-white/50 dark:bg-gradient-to-b dark:from-gray-700/50 dark:to-gray-700/40 rounded-lg shadow shadow-black/5 py-1">
      <h2>
        <button
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 dark:text-gray-200 px-4 py-2"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
          }}
          aria-expanded={accordionOpen}
          aria-controls={`faqs-text-${id}`}
        >
          <span>{title}</span>
          <span className="shrink-0 w-5 h-5 flex items-center justify-center bg-white dark:bg-gray-600 shadow-sm rounded-full ml-2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="10"
              height="6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity=".72"
                d="m2 .586 3 3 3-3L9.414 2 5.707 5.707a1 1 0 0 1-1.414 0L.586 2 2 .586Z"
                className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"}`}
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={`faqs-text-${id}`}
        role="region"
        aria-labelledby={`faqs-title-${id}`}
        className={`grid text-sm text-gray-600 dark:text-gray-500 overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-2">{children}</p>
        </div>
      </div>
    </div>
  );
}
