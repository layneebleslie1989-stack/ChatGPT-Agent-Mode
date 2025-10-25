# API Documentation

This directory contains comprehensive documentation for all public APIs in the project.

## 📋 Overview

Our APIs are designed to be RESTful, well-documented, and easy to use. Each endpoint is thoroughly documented with examples, parameters, and response formats.

## 🚀 Getting Started

### Base URL
```
https://api.example.com/v1
```

### Authentication
All API requests require authentication using API keys:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.example.com/v1/endpoint
```

### Response Format
All responses follow a consistent JSON format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2023-01-01T00:00:00Z"
}
```

## 📚 Available Endpoints

### Core Resources
- [Users API](./endpoints/users.md) - User management operations
- [Authentication API](./endpoints/auth.md) - Authentication and authorization
- [Data API](./endpoints/data.md) - Data retrieval and manipulation

### Utility Endpoints
- [Health Check](./endpoints/health.md) - Service health monitoring
- [Metrics](./endpoints/metrics.md) - Performance and usage metrics

## 🔧 Rate Limiting

All endpoints are subject to rate limiting:
- **Standard**: 1000 requests per hour
- **Premium**: 10000 requests per hour
- **Enterprise**: Unlimited

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 📖 Examples

### Quick Start Example
```javascript
// Initialize API client
const apiClient = new APIClient({
  baseURL: 'https://api.example.com/v1',
  apiKey: 'your-api-key'
});

// Make a simple request
const response = await apiClient.get('/users/me');
console.log(response.data);
```

### Error Handling
```javascript
try {
  const response = await apiClient.post('/users', userData);
  console.log('User created:', response.data);
} catch (error) {
  if (error.status === 400) {
    console.error('Validation error:', error.data.errors);
  } else if (error.status === 429) {
    console.error('Rate limit exceeded');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## 🛠️ SDKs and Libraries

- [JavaScript/Node.js SDK](../examples/javascript-sdk.md)
- [Python SDK](../examples/python-sdk.md)
- [Go SDK](../examples/go-sdk.md)
- [cURL Examples](../examples/curl-examples.md)

## 📞 Support

For API support and questions:
- Documentation: [Full API Reference](./reference.md)
- Examples: [Code Examples](../examples/)
- Issues: [GitHub Issues](https://github.com/your-org/your-repo/issues)