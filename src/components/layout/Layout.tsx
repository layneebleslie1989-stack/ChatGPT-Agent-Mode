import React, { useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
  }
  onLogout?: () => void
  className?: string
  testId?: string
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 16rem;
  }
`

const ContentArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  onLogout,
  className,
  testId,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    onLogout?.()
    setSidebarOpen(false)
  }

  return (
    <LayoutContainer className={className} data-testid={testId}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        testId="sidebar"
      />
      
      <MainContent>
        <Header
          onMenuClick={handleMenuClick}
          onLogout={handleLogout}
          user={user}
          testId="header"
        />
        
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  )
}