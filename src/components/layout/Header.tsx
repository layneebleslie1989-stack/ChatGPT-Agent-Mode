import React from 'react'
import styled from 'styled-components'
import { Button } from '../ui/Button'
import { User, LogOut, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
  onLogout?: () => void
  user?: {
    name: string
    email: string
  }
  className?: string
  testId?: string
}

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const MenuButton = styled(Button)`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const UserName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[900]};
`

const UserEmail = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
`

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onLogout,
  user,
  className,
  testId,
}) => {
  return (
    <HeaderContainer className={className} data-testid={testId}>
      <LeftSection>
        <MenuButton
          variant="ghost"
          size="small"
          onClick={onMenuClick}
          testId="menu-button"
        >
          <Menu size={20} />
        </MenuButton>
        <Logo>Frontend App</Logo>
      </LeftSection>
      
      <RightSection>
        {user && (
          <UserInfo>
            <User size={16} />
            <div>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </div>
          </UserInfo>
        )}
        <Button
          variant="ghost"
          size="small"
          onClick={onLogout}
          testId="logout-button"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </RightSection>
    </HeaderContainer>
  )
}