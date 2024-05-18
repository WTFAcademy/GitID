import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

function Header() {
  return (
    <header className="sticky top-0 left-0 backdrop-blur w-full z-30 border-b bg-gradient-to-b from-white/30 to-white/25 dark:from-gray-700/80 dark:to-gray-700/70 shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none">
      <div className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center justify-between gap-x-2 h-[60px] px-3">
            {/* Border with dots in corners */}
            <div
              className="absolute -inset-1.5 rounded-sm -z-10 before:absolute before:inset-y-0 before:left-0 before:w-[10px] before:bg-[length:10px_10px] before:[background-position:top_center,bottom_center] before:bg-no-repeat before:[background-image:radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px)] dark:before:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px)] after:absolute after:inset-y-0 after:right-0 after:w-[10px] after:bg-[length:10px_10px] after:[background-position:top_center,bottom_center] after:bg-no-repeat after:[background-image:radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.indigo.500/.56)_1px,transparent_1px)] dark:after:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px),radial-gradient(circle_at_center,theme(colors.gray.600/.56)_1px,transparent_1px)]"
              aria-hidden="true"
            />
            {/* Site branding */}
            <div className="flex-1">
              {/* Logo */}
              <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                  <path
                    className="fill-indigo-300"
                    d="M16.975 3.036c6.402.475 11.514 5.586 11.99 11.989H24.32a7.345 7.345 0 0 1-7.345-7.345V3.036Zm-1.95 21.284v4.644c-6.402-.475-11.514-5.587-11.989-11.99H7.68a7.345 7.345 0 0 1 7.345 7.346Z"
                  />
                  <path
                    className="fill-indigo-500"
                    d="M3.036 15.025c.475-6.403 5.587-11.514 11.99-11.99V7.68a7.345 7.345 0 0 1-7.346 7.345H3.036Zm21.284 1.95h4.644c-.475 6.402-5.586 11.514-11.989 11.989V24.32a7.345 7.345 0 0 1 7.345-7.345Z"
                  />
                </svg>
              </Link>
            </div>
            {/* Navigation links */}
            <Link href="/lookup" className="flex-[2]">
              <div className="w-full flex items-center gap-2 border border-solid border-[#A5B4FC7A] py-1 px-4 rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66665 1.33333C3.72113 1.33333 1.33331 3.72115 1.33331 6.66667C1.33331 9.61219 3.72113 12 6.66665 12C7.89887 12 9.03349 11.5821 9.93653 10.8803L13.5273 14.4711C13.7877 14.7315 14.2098 14.7315 14.4701 14.4711C14.7305 14.2108 14.7305 13.7887 14.4701 13.5283L10.8795 9.93765C11.5818 9.03443 12 7.89939 12 6.66667C12 3.72115 9.61216 1.33333 6.66665 1.33333ZM2.66665 6.66667C2.66665 4.45753 4.45751 2.66667 6.66665 2.66667C8.87578 2.66667 10.6666 4.45753 10.6666 6.66667C10.6666 8.87581 8.87578 10.6667 6.66665 10.6667C4.45751 10.6667 2.66665 8.87581 2.66665 6.66667Z"
                    fill="#9CA3AF"
                  />
                </svg>
                <span className="text-[#9CA3AF]">Search</span>
              </div>
            </Link>

            {/* Light switch */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
