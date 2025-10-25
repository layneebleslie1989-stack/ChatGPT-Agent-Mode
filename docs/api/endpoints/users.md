# Users API

Complete documentation for user management operations.

## Base Endpoint
```
/api/v1/users
```

## Authentication Required
All endpoints require a valid API key or JWT token.

---

## GET /users

Retrieve a list of users with optional filtering and pagination.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |
| `search` | string | No | Search users by name or email |
| `role` | string | No | Filter by user role |
| `status` | string | No | Filter by status (active, inactive, pending) |

### Request Example

```bash
curl -X GET "https://api.example.com/v1/users?page=1&limit=10&role=admin" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "email": "john.doe@example.com",
        "name": "John Doe",
        "role": "admin",
        "status": "active",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "total_pages": 1
    }
  },
  "message": "Users retrieved successfully"
}
```

---

## GET /users/{id}

Retrieve a specific user by ID.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | User ID |

### Request Example

```bash
curl -X GET "https://api.example.com/v1/users/user_123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "admin",
    "status": "active",
    "profile": {
      "bio": "Software engineer with 10+ years experience",
      "avatar_url": "https://example.com/avatars/user_123.jpg",
      "location": "San Francisco, CA"
    },
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  },
  "message": "User retrieved successfully"
}
```

---

## POST /users

Create a new user.

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User email address |
| `name` | string | Yes | User full name |
| `password` | string | Yes | User password (min 8 characters) |
| `role` | string | No | User role (default: "user") |

### Request Example

```bash
curl -X POST "https://api.example.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "name": "Jane Doe",
    "password": "securepassword123",
    "role": "user"
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "user_124",
    "email": "jane.doe@example.com",
    "name": "Jane Doe",
    "role": "user",
    "status": "pending",
    "created_at": "2023-01-01T00:00:00Z"
  },
  "message": "User created successfully"
}
```

---

## PUT /users/{id}

Update an existing user.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | User ID |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | User full name |
| `role` | string | No | User role |
| `status` | string | No | User status |

### Request Example

```bash
curl -X PUT "https://api.example.com/v1/users/user_124" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "status": "active"
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "user_124",
    "email": "jane.doe@example.com",
    "name": "Jane Smith",
    "role": "user",
    "status": "active",
    "updated_at": "2023-01-01T01:00:00Z"
  },
  "message": "User updated successfully"
}
```

---

## DELETE /users/{id}

Delete a user (soft delete).

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | User ID |

### Request Example

```bash
curl -X DELETE "https://api.example.com/v1/users/user_124" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "user_124",
    "deleted_at": "2023-01-01T02:00:00Z"
  },
  "message": "User deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "email": ["Email is required"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found"
  }
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "A user with this email already exists"
  }
}
```

## Code Examples

### JavaScript/Node.js
```javascript
// Get users
const users = await apiClient.get('/users', {
  params: { role: 'admin', limit: 50 }
});

// Create user
const newUser = await apiClient.post('/users', {
  email: 'new.user@example.com',
  name: 'New User',
  password: 'securepassword'
});

// Update user
const updatedUser = await apiClient.put(`/users/${userId}`, {
  name: 'Updated Name',
  status: 'active'
});
```

### Python
```python
# Get users
response = api_client.get('/users', params={'role': 'admin'})
users = response.json()['data']['users']

# Create user
new_user_data = {
    'email': 'new.user@example.com',
    'name': 'New User',
    'password': 'securepassword'
}
response = api_client.post('/users', json=new_user_data)
```