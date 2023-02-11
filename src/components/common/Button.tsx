import { FC, ReactNode } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | undefined
  children: ReactNode
}

export const Button: FC<Props> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={
      'h-[21px] min-w-[90px] rounded-[4px] px-2 text-left text-white hover:opacity-70 ' +
      className
    }
  >
    {children}
  </button>
)
