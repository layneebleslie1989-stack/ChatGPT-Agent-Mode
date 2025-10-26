import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Button, Input } from '../components/ui'
import { User, Mail, MapPin, Calendar, Edit3, Save, X } from 'lucide-react'

interface ProfileProps {
  user?: {
    id: string
    name: string
    email: string
    role: string
    status: string
    profile?: {
      bio?: string
      avatar_url?: string
      location?: string
    }
    created_at: string
  }
}

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.secondary}20);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const Avatar = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  flex-shrink: 0;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
`

const ProfileEmail = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 1.125rem;
`

const ProfileRole = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: ${({ theme }) => theme.spacing.sm};
`

const EditButton = styled(Button)`
  align-self: flex-start;
`

const ProfileDetails = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const DetailIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const DetailContent = styled.div`
  flex: 1;
`

const DetailLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 0.25rem;
`

const DetailValue = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[900]};
`

const BioSection = styled(Card)`
  grid-column: 1 / -1;
`

const BioContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[700]};
`

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to update the user profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.profile?.bio || '',
      location: user?.profile?.location || '',
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>User not found</h3>
          <p>Please log in to view your profile.</p>
        </div>
      </Card>
    )
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <ProfileInfo>
          <ProfileName>{user.name}</ProfileName>
          <ProfileEmail>
            <Mail size={20} />
            {user.email}
          </ProfileEmail>
          <ProfileRole>{user.role}</ProfileRole>
        </ProfileInfo>
        <EditButton
          variant="secondary"
          onClick={() => setIsEditing(!isEditing)}
          testId="edit-profile-button"
        >
          <Edit3 size={16} />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </EditButton>
      </ProfileHeader>

      <ProfileDetails>
        <DetailItem>
          <DetailIcon>
            <User size={20} />
          </DetailIcon>
          <DetailContent>
            <DetailLabel>Full Name</DetailLabel>
            <DetailValue>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  testId="edit-name-input"
                />
              ) : (
                user.name
              )}
            </DetailValue>
          </DetailContent>
        </DetailItem>

        <DetailItem>
          <DetailIcon>
            <Mail size={20} />
          </DetailIcon>
          <DetailContent>
            <DetailLabel>Email Address</DetailLabel>
            <DetailValue>{user.email}</DetailValue>
          </DetailContent>
        </DetailItem>

        <DetailItem>
          <DetailIcon>
            <MapPin size={20} />
          </DetailIcon>
          <DetailContent>
            <DetailLabel>Location</DetailLabel>
            <DetailValue>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your location"
                  testId="edit-location-input"
                />
              ) : (
                user.profile?.location || 'Not specified'
              )}
            </DetailValue>
          </DetailContent>
        </DetailItem>

        <DetailItem>
          <DetailIcon>
            <Calendar size={20} />
          </DetailIcon>
          <DetailContent>
            <DetailLabel>Member Since</DetailLabel>
            <DetailValue>
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </DetailValue>
          </DetailContent>
        </DetailItem>
      </ProfileDetails>

      <BioSection title="About">
        {isEditing ? (
          <EditForm onSubmit={handleSave}>
            <Input
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              testId="edit-bio-input"
            />
            <FormActions>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                testId="cancel-edit-button"
              >
                <X size={16} />
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                testId="save-profile-button"
              >
                <Save size={16} />
                Save Changes
              </Button>
            </FormActions>
          </EditForm>
        ) : (
          <BioContent>
            {user.profile?.bio || 'No bio available. Click "Edit Profile" to add one.'}
          </BioContent>
        )}
      </BioSection>
    </ProfileContainer>
  )
}