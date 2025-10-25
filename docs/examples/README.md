# Code Examples

This directory contains practical, real-world examples demonstrating how to use the APIs, components, and functions in this project.

## 📚 Example Categories

### API Examples
- [JavaScript SDK Usage](./javascript-sdk.md) - Complete JavaScript/Node.js examples
- [Python SDK Usage](./python-sdk.md) - Python integration examples
- [cURL Examples](./curl-examples.md) - Command-line API usage
- [Authentication Examples](./authentication.md) - Various auth patterns

### Component Examples
- [Form Examples](./forms.md) - Complete form implementations
- [Dashboard Examples](./dashboard.md) - Dashboard and data visualization
- [Navigation Examples](./navigation.md) - Navigation patterns and components
- [Modal Examples](./modals.md) - Modal dialogs and overlays

### Integration Examples
- [Full Stack Examples](./fullstack.md) - Complete application examples
- [Third-party Integrations](./integrations.md) - External service integrations
- [Testing Examples](./testing.md) - Comprehensive testing patterns
- [Performance Examples](./performance.md) - Optimization techniques

## 🚀 Quick Start Examples

### Basic API Usage
```javascript
// Initialize the API client
import { APIClient } from '@/lib/api';

const client = new APIClient({
  baseURL: 'https://api.example.com/v1',
  apiKey: process.env.API_KEY
});

// Fetch user data
async function getUser(userId) {
  try {
    const response = await client.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Create a new user
async function createUser(userData) {
  try {
    const response = await client.post('/users', userData);
    console.log('User created:', response.data);
    return response.data;
  } catch (error) {
    if (error.status === 409) {
      throw new Error('User already exists');
    }
    throw error;
  }
}
```

### Basic Component Usage
```jsx
import React, { useState } from 'react';
import { Button, Input, Card, Form } from '@/components';

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await createUser(formData);
      alert('User created successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))}
          required
        />
        
        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))}
          required
        />
        
        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            password: e.target.value
          }))}
          required
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          loading={isLoading}
          fullWidth
        >
          Create Account
        </Button>
      </Form>
    </Card>
  );
}
```

### Utility Functions Usage
```javascript
import { 
  formatCurrency,
  validateEmail,
  debounce,
  groupBy
} from '@/utils';

// Format prices
const price = formatCurrency(1234.56); // "$1,234.56"

// Validate user input
const isValidEmail = validateEmail('user@example.com'); // true

// Debounce search function
const debouncedSearch = debounce(async (query) => {
  const results = await searchAPI(query);
  setSearchResults(results);
}, 300);

// Group data by category
const products = [
  { name: 'Laptop', category: 'Electronics', price: 999 },
  { name: 'Shirt', category: 'Clothing', price: 29 },
  { name: 'Phone', category: 'Electronics', price: 599 }
];

const grouped = groupBy(products, 'category');
// {
//   Electronics: [laptop, phone],
//   Clothing: [shirt]
// }
```

## 🏗️ Complete Application Examples

### E-commerce Product Listing
```jsx
import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  Button, 
  Input, 
  Select,
  Pagination 
} from '@/components';
import { useAPI } from '@/hooks';
import { formatCurrency, debounce } from '@/utils';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: 'name'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0
  });

  const { loading, error, request } = useAPI();

  // Debounced search function
  const debouncedSearch = debounce(async (searchTerm) => {
    await fetchProducts({ ...filters, search: searchTerm });
  }, 300);

  const fetchProducts = async (filterParams = filters) => {
    try {
      const response = await request('/products', {
        params: {
          ...filterParams,
          page: pagination.page,
          limit: pagination.limit
        }
      });
      
      setProducts(response.data.products);
      setPagination(prev => ({
        ...prev,
        total: response.data.total
      }));
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, filters.category, filters.sortBy]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setFilters(prev => ({ ...prev, search: searchTerm }));
    debouncedSearch(searchTerm);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="product-listing">
      {/* Filters */}
      <div className="filters">
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={handleSearchChange}
        />
        
        <Select
          placeholder="Category"
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'books', label: 'Books' }
          ]}
        />
        
        <Select
          value={filters.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          options={[
            { value: 'name', label: 'Name' },
            { value: 'price', label: 'Price' },
            { value: 'rating', label: 'Rating' }
          ]}
        />
      </div>

      {/* Product Grid */}
      <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="1rem">
        {products.map(product => (
          <Card key={product.id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">
                {formatCurrency(product.price)}
              </p>
              <div className="product-rating">
                {'★'.repeat(Math.floor(product.rating))}
                <span>({product.reviewCount})</span>
              </div>
              <Button 
                variant="primary" 
                fullWidth
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </Grid>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <p>Loading products...</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={Math.ceil(pagination.total / pagination.limit)}
        onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
      />
    </div>
  );
}

export default ProductListing;
```

### User Dashboard with Real-time Updates
```jsx
import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  Chart, 
  Table,
  Badge,
  Button 
} from '@/components';
import { useWebSocket, useAPI } from '@/hooks';
import { formatCurrency, formatDate } from '@/utils';

function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  
  const { request } = useAPI();
  const { connected, lastMessage } = useWebSocket('/dashboard-updates');

  // Fetch initial dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, activityResponse] = await Promise.all([
          request('/dashboard/stats'),
          request('/dashboard/activity')
        ]);
        
        setDashboardData(statsResponse.data);
        setRecentActivity(activityResponse.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (lastMessage) {
      const update = JSON.parse(lastMessage.data);
      
      switch (update.type) {
        case 'stats_update':
          setDashboardData(prev => ({
            ...prev,
            ...update.data
          }));
          break;
          
        case 'new_activity':
          setRecentActivity(prev => [update.data, ...prev.slice(0, 9)]);
          break;
      }
    }
  }, [lastMessage]);

  if (!dashboardData) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Connection Status */}
      <div className="connection-status">
        <Badge variant={connected ? 'success' : 'warning'}>
          {connected ? 'Live Updates Active' : 'Reconnecting...'}
        </Badge>
      </div>

      {/* Key Metrics */}
      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="1rem">
        <Card>
          <h3>Total Revenue</h3>
          <p className="metric-value">
            {formatCurrency(dashboardData.totalRevenue)}
          </p>
          <p className="metric-change positive">
            +{dashboardData.revenueGrowth}% from last month
          </p>
        </Card>
        
        <Card>
          <h3>Active Users</h3>
          <p className="metric-value">
            {dashboardData.activeUsers.toLocaleString()}
          </p>
          <p className="metric-change positive">
            +{dashboardData.userGrowth}% from last month
          </p>
        </Card>
        
        <Card>
          <h3>Orders</h3>
          <p className="metric-value">
            {dashboardData.totalOrders.toLocaleString()}
          </p>
          <p className="metric-change negative">
            -{dashboardData.orderDecline}% from last month
          </p>
        </Card>
        
        <Card>
          <h3>Conversion Rate</h3>
          <p className="metric-value">
            {dashboardData.conversionRate}%
          </p>
          <p className="metric-change positive">
            +{dashboardData.conversionImprovement}% from last month
          </p>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid columns={{ xs: 1, lg: 2 }} gap="1rem">
        <Card>
          <h3>Revenue Trend</h3>
          <Chart
            type="line"
            data={dashboardData.revenueChart}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatCurrency(value)
                  }
                }
              }
            }}
          />
        </Card>
        
        <Card>
          <h3>User Acquisition</h3>
          <Chart
            type="bar"
            data={dashboardData.userChart}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                }
              }
            }}
          />
        </Card>
      </Grid>

      {/* Recent Activity */}
      <Card>
        <div className="card-header">
          <h3>Recent Activity</h3>
          <Button variant="ghost" size="small">
            View All
          </Button>
        </div>
        
        <Table
          columns={[
            {
              key: 'type',
              title: 'Type',
              render: (value) => <Badge variant="secondary">{value}</Badge>
            },
            {
              key: 'description',
              title: 'Description'
            },
            {
              key: 'user',
              title: 'User'
            },
            {
              key: 'timestamp',
              title: 'Time',
              render: (value) => formatDate(value, 'relative')
            }
          ]}
          data={recentActivity}
          emptyMessage="No recent activity"
        />
      </Card>
    </div>
  );
}

export default UserDashboard;
```

## 🧪 Testing Examples

### Component Testing with React Testing Library
```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserRegistrationForm } from './UserRegistrationForm';

// Mock the API
jest.mock('@/lib/api', () => ({
  createUser: jest.fn()
}));

describe('UserRegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<UserRegistrationForm />);
    
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockCreateUser = require('@/lib/api').createUser;
    mockCreateUser.mockResolvedValue({ id: 1, name: 'John Doe' });

    const user = userEvent.setup();
    render(<UserRegistrationForm />);

    // Fill out the form
    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');

    // Submit the form
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    // Verify API was called
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
    });
  });

  it('shows loading state during submission', async () => {
    const mockCreateUser = require('@/lib/api').createUser;
    mockCreateUser.mockImplementation(() => new Promise(resolve => 
      setTimeout(resolve, 1000)
    ));

    const user = userEvent.setup();
    render(<UserRegistrationForm />);

    // Fill and submit form
    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    // Check loading state
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/creating/i)).toBeInTheDocument();
  });
});
```

## 📋 Example Checklist

When creating examples, ensure:

- [ ] Examples are complete and runnable
- [ ] Error handling is demonstrated
- [ ] Loading states are shown
- [ ] Accessibility considerations are included
- [ ] Performance best practices are followed
- [ ] Code is well-commented
- [ ] Examples cover common use cases
- [ ] Integration patterns are demonstrated

## 🔗 Related Resources

- [API Documentation](../api/README.md)
- [Component Documentation](../components/README.md)
- [Function Documentation](../functions/README.md)
- [Testing Guide](../guides/testing.md)