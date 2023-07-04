import React, { useState, FC } from 'react'

interface IPropsBanReasonComponent {
  message: string
}

const BanReasonComponent: FC<IPropsBanReasonComponent> = ({ message }) => {
  const [isHovered, setIsHovered] = useState(false)

  const toggleHover = () => {
    setIsHovered(!isHovered)
  }

  const getShortenedMessage = (message: string, maxLength: number) => {
    if (message.length <= maxLength) {
      return message
    }

    return `${message.slice(0, maxLength)}...`
  }

  return (
    <div
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      {isHovered ? <span>{message}</span> : <span>{getShortenedMessage(message, 20)}</span>}
    </div>
  )
}

export default BanReasonComponent
