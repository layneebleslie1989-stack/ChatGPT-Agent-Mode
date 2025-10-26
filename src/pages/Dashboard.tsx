import React from 'react'
import styled from 'styled-components'
import { Card } from '../components/ui/Card'
import { Users, FileText, BarChart3, TrendingUp } from 'lucide-react'

const DashboardContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`

const StatIcon = styled.div<{ $color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const StatContent = styled.div`
  flex: 1;
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
  line-height: 1;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const WelcomeSection = styled.div`
  grid-column: 1 / -1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const WelcomeTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
`

const WelcomeSubtitle = styled.p`
  margin: 0;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray[600]};
`

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: Users,
    color: '#007bff',
  },
  {
    title: 'Documents',
    value: '567',
    icon: FileText,
    color: '#28a745',
  },
  {
    title: 'Reports',
    value: '89',
    icon: BarChart3,
    color: '#ffc107',
  },
  {
    title: 'Growth',
    value: '+12%',
    icon: TrendingUp,
    color: '#17a2b8',
  },
]

export const Dashboard: React.FC = () => {
  return (
    <div>
      <WelcomeSection>
        <WelcomeTitle>Welcome to the Dashboard</WelcomeTitle>
        <WelcomeSubtitle>
          Here's an overview of your application's key metrics and recent activity.
        </WelcomeSubtitle>
      </WelcomeSection>

      <DashboardContainer>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon $color={stat.color}>
              <stat.icon size={24} />
            </StatIcon>
            <StatContent>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.title}</StatLabel>
            </StatContent>
          </StatCard>
        ))}
      </DashboardContainer>
    </div>
  )
}