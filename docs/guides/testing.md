# Testing Guide

Comprehensive guide to testing strategies, tools, and best practices for this project.

## 📋 Testing Philosophy

Our testing approach follows these principles:

- **Test Pyramid**: More unit tests, fewer integration tests, minimal E2E tests
- **Test-Driven Development**: Write tests before implementation when possible
- **Confidence Over Coverage**: Focus on testing critical paths and edge cases
- **Fast Feedback**: Tests should run quickly and provide clear feedback

## 🧪 Testing Stack

### Core Testing Tools

- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **MSW (Mock Service Worker)** - API mocking
- **Playwright** - End-to-end testing
- **Storybook** - Visual component testing

### Additional Tools

- **@testing-library/user-event** - User interaction simulation
- **jest-dom** - Custom Jest matchers for DOM testing
- **@testing-library/jest-dom** - Additional DOM assertions
- **fast-check** - Property-based testing

## 🏗️ Test Structure

### Directory Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   └── __tests__/
│       └── integration/
├── utils/
│   ├── string.ts
│   └── string.test.ts
├── hooks/
│   ├── useApi.ts
│   └── useApi.test.ts
└── __tests__/
    ├── setup.ts
    ├── mocks/
    └── e2e/
```

### Test File Naming

- Unit tests: `ComponentName.test.tsx` or `functionName.test.ts`
- Integration tests: `integration/FeatureName.test.tsx`
- E2E tests: `e2e/UserFlow.spec.ts`
- Storybook stories: `ComponentName.stories.tsx`

## 🔧 Test Setup

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/main.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
};
```

### Test Setup File

```typescript
// src/__tests__/setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

// Setup MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock console methods in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
```

## 🧩 Unit Testing

### Component Testing

```tsx
// src/components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Button 
          aria-label="Save document"
          aria-describedby="save-help"
        >
          Save
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Save document');
      expect(button).toHaveAttribute('aria-describedby', 'save-help');
    });

    it('is keyboard accessible', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard('{Space}');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });
});
```

### Hook Testing

```typescript
// src/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

### Utility Function Testing

```typescript
// src/utils/string.test.ts
import { 
  capitalize, 
  slugify, 
  truncate, 
  isValidEmail 
} from './string';

describe('String Utilities', () => {
  describe('capitalize', () => {
    it('capitalizes first letter of word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('preserves rest of string case', () => {
      expect(capitalize('hELLO')).toBe('HELLO');
    });
  });

  describe('slugify', () => {
    it('converts string to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Hello    World')).toBe('hello-world');
    });

    it('handles unicode characters', () => {
      expect(slugify('Café & Restaurant')).toBe('cafe-restaurant');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.email@domain.co.uk',
        'user+tag@example.org',
      ];

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    it('rejects invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
      ];

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });
});
```

## 🔗 Integration Testing

### Component Integration

```tsx
// src/components/__tests__/integration/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '../../UserForm';
import { TestProvider } from '../../../__tests__/TestProvider';

describe('UserForm Integration', () => {
  it('submits form with valid data', async () => {
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(
      <TestProvider>
        <UserForm onSubmit={mockOnSubmit} />
      </TestProvider>
    );

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Role'), 'admin');

    // Submit form
    await user.click(screen.getByRole('button', { name: 'Create User' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
      });
    });
  });

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup();
    
    render(
      <TestProvider>
        <UserForm onSubmit={jest.fn()} />
      </TestProvider>
    );

    // Submit empty form
    await user.click(screen.getByRole('button', { name: 'Create User' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const mockOnSubmit = jest.fn().mockRejectedValue(
      new Error('User already exists')
    );
    const user = userEvent.setup();
    
    render(
      <TestProvider>
        <UserForm onSubmit={mockOnSubmit} />
      </TestProvider>
    );

    // Fill and submit form
    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByRole('button', { name: 'Create User' }));

    await waitFor(() => {
      expect(screen.getByText('User already exists')).toBeInTheDocument();
    });
  });
});
```

### API Integration Testing

```typescript
// src/services/__tests__/integration/userService.test.ts
import { rest } from 'msw';
import { server } from '../../__tests__/mocks/server';
import { userService } from '../userService';

describe('User Service Integration', () => {
  it('fetches users successfully', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json({ users: mockUsers }));
      })
    );

    const result = await userService.getUsers();
    expect(result.users).toEqual(mockUsers);
  });

  it('handles API errors', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );

    await expect(userService.getUsers()).rejects.toThrow('Server error');
  });

  it('creates user with correct data', async () => {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    const createdUser = { id: '1', ...newUser };

    server.use(
      rest.post('/api/users', async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual(newUser);
        return res(ctx.json({ user: createdUser }));
      })
    );

    const result = await userService.createUser(newUser);
    expect(result.user).toEqual(createdUser);
  });
});
```

## 🎭 End-to-End Testing

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Example

```typescript
// src/__tests__/e2e/userManagement.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/users');
  });

  test('creates new user successfully', async ({ page }) => {
    // Click create user button
    await page.click('[data-testid="create-user-btn"]');

    // Fill out form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.selectOption('[data-testid="role-select"]', 'admin');

    // Submit form
    await page.click('[data-testid="submit-btn"]');

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toContainText(
      'User created successfully'
    );

    // Verify user appears in list
    await expect(page.locator('[data-testid="user-list"]')).toContainText(
      'John Doe'
    );
  });

  test('validates form inputs', async ({ page }) => {
    await page.click('[data-testid="create-user-btn"]');
    
    // Submit empty form
    await page.click('[data-testid="submit-btn"]');

    // Check validation errors
    await expect(page.locator('[data-testid="name-error"]')).toContainText(
      'Name is required'
    );
    await expect(page.locator('[data-testid="email-error"]')).toContainText(
      'Email is required'
    );
  });

  test('searches and filters users', async ({ page }) => {
    // Search for specific user
    await page.fill('[data-testid="search-input"]', 'John');
    await page.press('[data-testid="search-input"]', 'Enter');

    // Verify filtered results
    const userRows = page.locator('[data-testid="user-row"]');
    await expect(userRows).toHaveCount(1);
    await expect(userRows.first()).toContainText('John');

    // Filter by role
    await page.selectOption('[data-testid="role-filter"]', 'admin');
    
    // Verify admin users only
    const adminUsers = page.locator('[data-testid="user-row"][data-role="admin"]');
    await expect(adminUsers).toHaveCountGreaterThan(0);
  });
});
```

## 🎨 Visual Testing

### Storybook Stories

```tsx
// src/components/Button/Button.stories.tsx
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
  </div>
);

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button>Default</Button>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
  </div>
);
```

### Visual Regression Testing

```typescript
// src/__tests__/visual/Button.visual.test.ts
import { test, expect } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test('button variants look correct', async ({ page }) => {
    await page.goto('/storybook/?path=/story/components-button--all-variants');
    
    // Wait for components to load
    await page.waitForSelector('[data-testid="button-variants"]');
    
    // Take screenshot
    await expect(page.locator('[data-testid="button-variants"]')).toHaveScreenshot(
      'button-variants.png'
    );
  });

  test('button states look correct', async ({ page }) => {
    await page.goto('/storybook/?path=/story/components-button--states');
    
    await page.waitForSelector('[data-testid="button-states"]');
    await expect(page.locator('[data-testid="button-states"]')).toHaveScreenshot(
      'button-states.png'
    );
  });
});
```

## 🚀 Performance Testing

### Performance Test Example

```typescript
// src/__tests__/performance/rendering.test.ts
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';
import { LargeList } from '../components/LargeList';

describe('Performance Tests', () => {
  it('renders large list efficiently', () => {
    const items = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    const start = performance.now();
    render(<LargeList items={items} />);
    const end = performance.now();

    const renderTime = end - start;
    expect(renderTime).toBeLessThan(100); // Should render in less than 100ms
  });

  it('handles frequent updates without performance degradation', () => {
    const { rerender } = render(<LargeList items={[]} />);
    
    const start = performance.now();
    
    // Simulate 100 updates
    for (let i = 0; i < 100; i++) {
      const items = Array.from({ length: i * 10 }, (_, j) => ({
        id: j,
        name: `Item ${j}`,
      }));
      rerender(<LargeList items={items} />);
    }
    
    const end = performance.now();
    const totalTime = end - start;
    
    expect(totalTime).toBeLessThan(1000); // All updates should complete in 1s
  });
});
```

## 📊 Test Coverage

### Coverage Configuration

```javascript
// jest.config.js (coverage section)
module.exports = {
  // ... other config
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/components/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};
```

### Running Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/lcov-report/index.html
```

## 🔧 Testing Utilities

### Test Providers

```tsx
// src/__tests__/TestProvider.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

interface TestProviderProps {
  children: React.ReactNode;
}

export function TestProvider({ children }: TestProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Custom render function
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: TestProvider });
}
```

### Custom Matchers

```typescript
// src/__tests__/matchers.ts
import { expect } from '@jest/globals';

expect.extend({
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid email`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid email`,
        pass: false,
      };
    }
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEmail(): R;
    }
  }
}
```

## 📋 Testing Checklist

### Before Writing Tests
- [ ] Understand the requirements
- [ ] Identify critical paths and edge cases
- [ ] Choose appropriate testing strategy
- [ ] Set up necessary mocks and fixtures

### Writing Tests
- [ ] Use descriptive test names
- [ ] Follow AAA pattern (Arrange, Act, Assert)
- [ ] Test one thing at a time
- [ ] Include positive and negative test cases
- [ ] Test accessibility requirements
- [ ] Mock external dependencies

### After Writing Tests
- [ ] Verify tests pass consistently
- [ ] Check test coverage
- [ ] Review test readability
- [ ] Ensure tests are maintainable
- [ ] Document complex test scenarios

## 🎯 Best Practices

### Do's ✅
- Write tests before or alongside code
- Test behavior, not implementation
- Use meaningful test descriptions
- Keep tests simple and focused
- Mock external dependencies
- Test error conditions
- Maintain high test coverage

### Don'ts ❌
- Don't test implementation details
- Don't write overly complex tests
- Don't ignore failing tests
- Don't skip edge cases
- Don't mock everything
- Don't forget to clean up after tests

## 🔗 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)