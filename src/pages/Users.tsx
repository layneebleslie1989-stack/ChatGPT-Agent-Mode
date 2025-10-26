import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Card, Button, Modal, Input, Table } from '../components/ui'
import { UsersService } from '../services/api'
import { User, CreateUserData, UpdateUserData } from '../types'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const UsersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const UsersTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
`

const SearchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex: 1;
  max-width: 400px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const StatusBadge = styled.span<{ $status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'active':
        return theme.colors.success + '20'
      case 'inactive':
        return theme.colors.gray[200]
      case 'pending':
        return theme.colors.warning + '20'
      default:
        return theme.colors.gray[200]
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'active':
        return theme.colors.success
      case 'inactive':
        return theme.colors.gray[600]
      case 'pending':
        return theme.colors.warning
      default:
        return theme.colors.gray[600]
    }
  }};
`

const RoleBadge = styled.span<{ $role: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ $role, theme }) => {
    switch ($role) {
      case 'admin':
        return theme.colors.primary + '20'
      case 'user':
        return theme.colors.gray[200]
      default:
        return theme.colors.gray[200]
    }
  }};
  color: ${({ $role, theme }) => {
    switch ($role) {
      case 'admin':
        return theme.colors.primary
      case 'user':
        return theme.colors.gray[600]
      default:
        return theme.colors.gray[600]
    }
  }};
`

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    name: '',
    password: '',
    role: 'user',
  })

  const queryClient = useQueryClient()

  // Fetch users
  const { data: usersResponse, isLoading, error } = useQuery(
    ['users', searchTerm],
    () => UsersService.getUsers({ search: searchTerm || undefined }),
    {
      keepPreviousData: true,
    }
  )

  // Create user mutation
  const createUserMutation = useMutation(UsersService.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setIsCreateModalOpen(false)
      setFormData({ email: '', name: '', password: '', role: 'user' })
    },
  })

  // Update user mutation
  const updateUserMutation = useMutation(
    ({ id, data }: { id: string; data: UpdateUserData }) =>
      UsersService.updateUser(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        setEditingUser(null)
      },
    }
  )

  // Delete user mutation
  const deleteUserMutation = useMutation(UsersService.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    createUserMutation.mutate(formData)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      password: '',
      role: user.role,
    })
  }

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      updateUserMutation.mutate({
        id: editingUser.id,
        data: {
          name: formData.name,
          role: formData.role,
        },
      })
    }
  }

  const handleDeleteUser = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(user.id)
    }
  }

  const columns = [
    {
      key: 'name' as keyof User,
      title: 'Name',
      render: (value: string, user: User) => (
        <div>
          <div style={{ fontWeight: 500 }}>{value}</div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {user.email}
          </div>
        </div>
      ),
    },
    {
      key: 'role' as keyof User,
      title: 'Role',
      render: (value: string) => <RoleBadge $role={value}>{value}</RoleBadge>,
    },
    {
      key: 'status' as keyof User,
      title: 'Status',
      render: (value: string) => <StatusBadge $status={value}>{value}</StatusBadge>,
    },
    {
      key: 'created_at' as keyof User,
      title: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions' as keyof User,
      title: 'Actions',
      render: (_: any, user: User) => (
        <ActionButtons>
          <Button
            variant="ghost"
            size="small"
            onClick={() => handleEditUser(user)}
            testId={`edit-user-${user.id}`}
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => handleDeleteUser(user)}
            testId={`delete-user-${user.id}`}
          >
            <Trash2 size={16} />
          </Button>
        </ActionButtons>
      ),
    },
  ]

  if (error) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>Error loading users</h3>
          <p>Please try again later.</p>
        </div>
      </Card>
    )
  }

  return (
    <UsersContainer>
      <UsersHeader>
        <UsersTitle>Users</UsersTitle>
        <SearchContainer>
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            testId="search-input"
          />
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
            testId="create-user-button"
          >
            <Plus size={16} />
            Add User
          </Button>
        </SearchContainer>
      </UsersHeader>

      <Card>
        <Table
          data={usersResponse?.data?.users || []}
          columns={columns}
          loading={isLoading}
          emptyMessage="No users found"
          testId="users-table"
        />
      </Card>

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
        testId="create-user-modal"
      >
        <form onSubmit={handleCreateUser}>
          <ModalContent>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              testId="create-name-input"
            />
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              testId="create-email-input"
            />
            <Input
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              testId="create-password-input"
            />
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
                data-testid="create-role-select"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </ModalContent>
          <ModalActions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={createUserMutation.isLoading}
            >
              Create User
            </Button>
          </ModalActions>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User"
        testId="edit-user-modal"
      >
        <form onSubmit={handleUpdateUser}>
          <ModalContent>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              testId="edit-name-input"
            />
            <Input
              type="email"
              label="Email"
              value={formData.email}
              disabled
              testId="edit-email-input"
            />
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
                data-testid="edit-role-select"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </ModalContent>
          <ModalActions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={updateUserMutation.isLoading}
            >
              Update User
            </Button>
          </ModalActions>
        </form>
      </Modal>
    </UsersContainer>
  )
}