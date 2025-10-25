# [API Name] API

Brief description of what this API does and its purpose.

## Base Endpoint
```
/api/v1/[endpoint]
```

## Authentication
Describe authentication requirements (API key, JWT, OAuth, etc.)

---

## GET /endpoint

Brief description of what this endpoint does.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param1` | string | Yes | Description of parameter |
| `param2` | integer | No | Description with default value (default: 10) |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |

### Request Example

```bash
curl -X GET "https://api.example.com/v1/endpoint?param1=value" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "item_123",
        "name": "Example Item",
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "total_pages": 1
    }
  },
  "message": "Success message"
}
```

---

## POST /endpoint

Brief description of what this endpoint does.

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Description of field |
| `email` | string | Yes | Must be valid email format |
| `options` | object | No | Optional configuration object |

### Request Example

```bash
curl -X POST "https://api.example.com/v1/endpoint" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Name",
    "email": "user@example.com"
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "item_124",
    "name": "Example Name",
    "email": "user@example.com",
    "created_at": "2023-01-01T00:00:00Z"
  },
  "message": "Item created successfully"
}
```

---

## PUT /endpoint/{id}

Brief description of what this endpoint does.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Updated name |
| `status` | string | No | Updated status |

### Request Example

```bash
curl -X PUT "https://api.example.com/v1/endpoint/item_124" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "status": "active"
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "item_124",
    "name": "Updated Name",
    "status": "active",
    "updated_at": "2023-01-01T01:00:00Z"
  },
  "message": "Item updated successfully"
}
```

---

## DELETE /endpoint/{id}

Brief description of what this endpoint does.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |

### Request Example

```bash
curl -X DELETE "https://api.example.com/v1/endpoint/item_124" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "item_124",
    "deleted_at": "2023-01-01T02:00:00Z"
  },
  "message": "Item deleted successfully"
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
      "field_name": ["Error message for this field"]
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing authentication token"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions for this operation"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Resource already exists"
  }
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retry_after": 60
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Rate Limiting

- **Standard**: 1000 requests per hour
- **Premium**: 10000 requests per hour
- **Enterprise**: Custom limits

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Code Examples

### JavaScript/Node.js
```javascript
const apiClient = new APIClient({
  baseURL: 'https://api.example.com/v1',
  apiKey: 'your-api-key'
});

// GET request
try {
  const response = await apiClient.get('/endpoint', {
    params: { page: 1, limit: 10 }
  });
  console.log(response.data);
} catch (error) {
  console.error('API Error:', error.response.data);
}

// POST request
try {
  const newItem = await apiClient.post('/endpoint', {
    name: 'New Item',
    email: 'user@example.com'
  });
  console.log('Created:', newItem.data);
} catch (error) {
  if (error.response.status === 409) {
    console.error('Item already exists');
  } else {
    console.error('Creation failed:', error.response.data);
  }
}
```

### Python
```python
import requests

# Configuration
BASE_URL = 'https://api.example.com/v1'
API_KEY = 'your-api-key'
headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

# GET request
response = requests.get(f'{BASE_URL}/endpoint', headers=headers)
if response.status_code == 200:
    data = response.json()
    print(data['data'])
else:
    print(f'Error: {response.status_code} - {response.json()}')

# POST request
payload = {
    'name': 'New Item',
    'email': 'user@example.com'
}
response = requests.post(f'{BASE_URL}/endpoint', json=payload, headers=headers)
if response.status_code == 201:
    print('Created:', response.json()['data'])
else:
    print('Error:', response.json()['error'])
```

### cURL
```bash
# GET request with pagination
curl -X GET "https://api.example.com/v1/endpoint?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"

# POST request with data
curl -X POST "https://api.example.com/v1/endpoint" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Item",
    "email": "user@example.com"
  }'

# PUT request for updates
curl -X PUT "https://api.example.com/v1/endpoint/item_123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'

# DELETE request
curl -X DELETE "https://api.example.com/v1/endpoint/item_123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Testing

### Unit Tests
```javascript
describe('API Endpoint Tests', () => {
  it('should return items with valid parameters', async () => {
    const response = await request(app)
      .get('/api/v1/endpoint')
      .query({ page: 1, limit: 10 })
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toBeInstanceOf(Array);
  });

  it('should create new item with valid data', async () => {
    const newItem = {
      name: 'Test Item',
      email: 'test@example.com'
    };

    const response = await request(app)
      .post('/api/v1/endpoint')
      .send(newItem)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(201);

    expect(response.body.data.name).toBe(newItem.name);
    expect(response.body.data.id).toBeDefined();
  });
});
```

## Changelog

### Version 1.1.0
- Added new optional parameter `options`
- Improved error messages
- Added rate limiting headers

### Version 1.0.0
- Initial API release
- Basic CRUD operations
- Authentication support

## Related Documentation

- [Authentication Guide](../guides/authentication.md)
- [Error Handling Guide](../guides/error-handling.md)
- [Rate Limiting Guide](../guides/rate-limiting.md)
- [SDK Documentation](../examples/sdks.md)