import { TIconProps } from "@/types/icon";

export const Icons = {
  loading: (props: TIconProps) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2"
              stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  )
};
