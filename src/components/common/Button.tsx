import { FC, ReactNode } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | undefined
  children: ReactNode
}

export const Button: FC<Props> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={
      'text-white rounded-[4px] min-w-[90px] h-[21px] text-left px-2 hover:opacity-70 ' +
      className
    }
  >
    {children}
  </button>
)
