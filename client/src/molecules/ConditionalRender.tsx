import React from 'react'

interface ConditionalRenderProps {
  condition: boolean
  children: React.ReactNode
}

const ConditionalRender: React.FC<ConditionalRenderProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null
}

export default ConditionalRender
