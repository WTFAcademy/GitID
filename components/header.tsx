import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 backdrop-blur w-full z-30 border-b bg-gradient-to-b from-white/30 to-white/25 dark:from-gray-700/80 dark:to-gray-700/70 shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none">
      <div className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center justify-between gap-x-2 h-[60px] px-3">
            <div className="flex-1 h-full flex items-center">
              <Link href="/" className="inline-block">
                <svg
                  height="24"
                  viewBox="0 0 131 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42 7C42 3.13401 38.866 0 35 0H19.5C8.73045 0 0 8.73045 0 19.5V19.5C0 30.2696 8.73045 39 19.5 39H35C38.866 39 42 35.866 42 32V7Z"
                    fill="url(#paint0_linear_86_91)"
                  />
                  <mask
                    id="mask0_86_91"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="42"
                    height="39"
                  >
                    <path
                      d="M42 7C42 3.13401 38.866 0 35 0H19.5C8.73045 0 0 8.73045 0 19.5V19.5C0 30.2696 8.73045 39 19.5 39H35C38.866 39 42 35.866 42 32V7Z"
                      fill="url(#paint1_linear_86_91)"
                    />
                  </mask>
                  <g mask="url(#mask0_86_91)">
                    <rect
                      x="-1.78925"
                      y="33.6432"
                      width="57.4373"
                      height="37.6509"
                      transform="rotate(-44.4878 -1.78925 33.6432)"
                      fill="url(#paint2_linear_86_91)"
                      fill-opacity="0.65"
                    />
                  </g>
                  <g filter="url(#filter0_d_86_91)">
                    <circle
                      cx="28.5"
                      cy="25.5"
                      r="6"
                      fill="url(#paint3_linear_86_91)"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <path
                    d="M71.295 20.625V29.4C70.195 30.21 69.02 30.805 67.77 31.185C66.53 31.555 65.2 31.74 63.78 31.74C62.01 31.74 60.405 31.465 58.965 30.915C57.535 30.365 56.31 29.6 55.29 28.62C54.28 27.64 53.5 26.47 52.95 25.11C52.4 23.75 52.125 22.265 52.125 20.655C52.125 19.025 52.39 17.53 52.92 16.17C53.45 14.81 54.2 13.64 55.17 12.66C56.15 11.68 57.335 10.92 58.725 10.38C60.115 9.84 61.675 9.57 63.405 9.57C64.285 9.57 65.105 9.64 65.865 9.78C66.635 9.92 67.345 10.115 67.995 10.365C68.655 10.605 69.255 10.9 69.795 11.25C70.335 11.6 70.83 11.985 71.28 12.405L70.125 14.235C69.945 14.525 69.71 14.705 69.42 14.775C69.13 14.835 68.815 14.76 68.475 14.55C68.145 14.36 67.815 14.17 67.485 13.98C67.155 13.79 66.785 13.625 66.375 13.485C65.975 13.345 65.52 13.23 65.01 13.14C64.51 13.05 63.93 13.005 63.27 13.005C62.2 13.005 61.23 13.185 60.36 13.545C59.5 13.905 58.765 14.42 58.155 15.09C57.545 15.76 57.075 16.565 56.745 17.505C56.415 18.445 56.25 19.495 56.25 20.655C56.25 21.895 56.425 23.005 56.775 23.985C57.135 24.955 57.635 25.78 58.275 26.46C58.925 27.13 59.705 27.645 60.615 28.005C61.525 28.355 62.54 28.53 63.66 28.53C64.46 28.53 65.175 28.445 65.805 28.275C66.435 28.105 67.05 27.875 67.65 27.585V23.655H64.92C64.66 23.655 64.455 23.585 64.305 23.445C64.165 23.295 64.095 23.115 64.095 22.905V20.625H71.295ZM78.379 16.11V31.5H74.659V16.11H78.379ZM78.889 11.625C78.889 11.945 78.824 12.245 78.694 12.525C78.564 12.805 78.389 13.05 78.169 13.26C77.959 13.47 77.709 13.64 77.419 13.77C77.129 13.89 76.819 13.95 76.489 13.95C76.169 13.95 75.864 13.89 75.574 13.77C75.294 13.64 75.049 13.47 74.839 13.26C74.629 13.05 74.459 12.805 74.329 12.525C74.209 12.245 74.149 11.945 74.149 11.625C74.149 11.295 74.209 10.985 74.329 10.695C74.459 10.405 74.629 10.155 74.839 9.945C75.049 9.735 75.294 9.57 75.574 9.45C75.864 9.32 76.169 9.255 76.489 9.255C76.819 9.255 77.129 9.32 77.419 9.45C77.709 9.57 77.959 9.735 78.169 9.945C78.389 10.155 78.564 10.405 78.694 10.695C78.824 10.985 78.889 11.295 78.889 11.625ZM87.2862 31.74C85.9462 31.74 84.9162 31.365 84.1962 30.615C83.4862 29.855 83.1312 28.81 83.1312 27.48V18.885H81.5562C81.3562 18.885 81.1862 18.82 81.0462 18.69C80.9062 18.56 80.8362 18.365 80.8362 18.105V16.635L83.3112 16.23L84.0912 12.03C84.1412 11.83 84.2362 11.675 84.3762 11.565C84.5162 11.455 84.6962 11.4 84.9162 11.4H86.8362V16.245H90.9462V18.885H86.8362V27.225C86.8362 27.705 86.9512 28.08 87.1812 28.35C87.4212 28.62 87.7462 28.755 88.1562 28.755C88.3862 28.755 88.5762 28.73 88.7262 28.68C88.8862 28.62 89.0212 28.56 89.1312 28.5C89.2512 28.44 89.3562 28.385 89.4462 28.335C89.5362 28.275 89.6262 28.245 89.7162 28.245C89.8262 28.245 89.9162 28.275 89.9862 28.335C90.0562 28.385 90.1312 28.465 90.2112 28.575L91.3212 30.375C90.7812 30.825 90.1612 31.165 89.4612 31.395C88.7612 31.625 88.0362 31.74 87.2862 31.74ZM92.7783 29.46C92.7783 29.15 92.8333 28.855 92.9433 28.575C93.0633 28.295 93.2233 28.055 93.4233 27.855C93.6233 27.655 93.8633 27.495 94.1433 27.375C94.4233 27.255 94.7233 27.195 95.0433 27.195C95.3633 27.195 95.6583 27.255 95.9283 27.375C96.2083 27.495 96.4483 27.655 96.6483 27.855C96.8583 28.055 97.0233 28.295 97.1433 28.575C97.2633 28.855 97.3233 29.15 97.3233 29.46C97.3233 29.78 97.2633 30.08 97.1433 30.36C97.0233 30.63 96.8583 30.865 96.6483 31.065C96.4483 31.265 96.2083 31.42 95.9283 31.53C95.6583 31.65 95.3633 31.71 95.0433 31.71C94.7233 31.71 94.4233 31.65 94.1433 31.53C93.8633 31.42 93.6233 31.265 93.4233 31.065C93.2233 30.865 93.0633 30.63 92.9433 30.36C92.8333 30.08 92.7783 29.78 92.7783 29.46ZM105.072 31.5H101.022V9.81H105.072V31.5ZM129.189 20.655C129.189 22.245 128.924 23.705 128.394 25.035C127.864 26.365 127.119 27.51 126.159 28.47C125.199 29.43 124.044 30.175 122.694 30.705C121.344 31.235 119.844 31.5 118.194 31.5H109.929V9.81H118.194C119.844 9.81 121.344 10.08 122.694 10.62C124.044 11.15 125.199 11.895 126.159 12.855C127.119 13.805 127.864 14.945 128.394 16.275C128.924 17.605 129.189 19.065 129.189 20.655ZM125.049 20.655C125.049 19.465 124.889 18.4 124.569 17.46C124.259 16.51 123.804 15.71 123.204 15.06C122.614 14.4 121.894 13.895 121.044 13.545C120.204 13.195 119.254 13.02 118.194 13.02H113.979V28.29H118.194C119.254 28.29 120.204 28.115 121.044 27.765C121.894 27.415 122.614 26.915 123.204 26.265C123.804 25.605 124.259 24.805 124.569 23.865C124.889 22.915 125.049 21.845 125.049 20.655Z"
                    fill="#090F12"
                  />
                  <defs>
                    <filter
                      id="filter0_d_86_91"
                      x="16.5"
                      y="15"
                      width="24"
                      height="24"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1.5" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_86_91"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_86_91"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_86_91"
                      x1="5.69032"
                      y1="3.75"
                      x2="38.6237"
                      y2="37.9697"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#5E7176" />
                      <stop offset="1" stop-color="#1B202A" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_86_91"
                      x1="5.69032"
                      y1="3.75"
                      x2="38.6237"
                      y2="37.9697"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#4FD4FE" />
                      <stop offset="1" stop-color="#0045F5" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_86_91"
                      x1="26.9294"
                      y1="33.6432"
                      x2="26.9294"
                      y2="71.2941"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#8793A1" />
                      <stop offset="1" stop-color="#1D2A35" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_86_91"
                      x1="28.5"
                      y1="19.5"
                      x2="28.5"
                      y2="31.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0.95" />
                      <stop offset="0.18" stop-color="white" />
                      <stop offset="1" stop-color="white" stop-opacity="0.9" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            </div>
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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
