import { FC, MouseEventHandler } from 'react'

type IconButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  className?: string
  icon?: React.ReactElement
  text?: string
}

const IconButton: FC<IconButtonProps> = ({ className, onClick, icon, text }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition ${className}`}
    >
      {text}
      {icon}
    </button>
  )
}

export default IconButton
