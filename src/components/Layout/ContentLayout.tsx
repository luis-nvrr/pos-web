import React from 'react'

type ContentLayoutProps = {
  children: React.ReactNode
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => (
  <div className="h-full w-full flex justify-center">{children}</div>
)

export default ContentLayout
