# Component Documentation

This directory contains comprehensive documentation for all reusable components in the project.

## 📋 Overview

Our components are designed to be reusable, well-documented, and follow consistent patterns. Each component is thoroughly documented with props, usage examples, and best practices.

## 🏗️ Component Architecture

### Component Types
- **UI Components**: Basic building blocks (buttons, inputs, cards)
- **Layout Components**: Structure and positioning (containers, grids, headers)
- **Feature Components**: Business logic components (forms, tables, modals)
- **Higher-Order Components**: Component enhancers and wrappers

### Design Principles
- **Reusability**: Components should be flexible and reusable across different contexts
- **Consistency**: Follow established design patterns and naming conventions
- **Accessibility**: All components should be accessible by default
- **Performance**: Optimize for performance with proper memoization and lazy loading

## 📚 Component Categories

### UI Components
- [Button](./ui/Button.md) - Interactive button component
- [Input](./ui/Input.md) - Form input component
- [Card](./ui/Card.md) - Content container component
- [Modal](./ui/Modal.md) - Overlay dialog component
- [Table](./ui/Table.md) - Data table component

### Layout Components
- [Container](./ui/Container.md) - Main content wrapper
- [Grid](./ui/Grid.md) - Flexible grid system
- [Header](./ui/Header.md) - Page header component
- [Sidebar](./ui/Sidebar.md) - Navigation sidebar

### Form Components
- [Form](./ui/Form.md) - Form wrapper with validation
- [FormField](./ui/FormField.md) - Individual form field
- [Select](./ui/Select.md) - Dropdown selection component
- [Checkbox](./ui/Checkbox.md) - Checkbox input component

## 🎨 Styling and Theming

### CSS-in-JS
Components use styled-components for styling:

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
`;
```

### Theme System
All components support theming through a centralized theme provider:

```jsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## 🔧 Component Props

### Standard Props
All components accept these standard props:

| Prop | Type | Description |
|------|------|-------------|
| `className` | string | Additional CSS classes |
| `testId` | string | Test identifier for testing |
| `children` | ReactNode | Child components |

### Prop Validation
Components use TypeScript for prop validation:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  children: ReactNode;
}
```

## 📖 Usage Examples

### Basic Component Usage
```jsx
import { Button, Card, Input } from '@/components';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
}
```

### Advanced Component Composition
```jsx
import { Form, FormField, Select, Button } from '@/components';

function UserForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Name" required>
        <Input name="name" />
      </FormField>
      
      <FormField label="Role">
        <Select name="role" options={roleOptions} />
      </FormField>
      
      <Button type="submit" variant="primary">
        Save User
      </Button>
    </Form>
  );
}
```

## 🧪 Testing Components

### Unit Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Visual Testing
```jsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};
```

## 📋 Component Checklist

When creating a new component, ensure:

- [ ] TypeScript interfaces are defined
- [ ] Props are properly documented
- [ ] Component is accessible (ARIA labels, keyboard navigation)
- [ ] Unit tests are written
- [ ] Storybook story is created
- [ ] Documentation is complete
- [ ] Component follows design system guidelines

## 🔗 Related Resources

- [Design System](../guides/design-system.md)
- [Accessibility Guidelines](../guides/accessibility.md)
- [Testing Guide](../guides/testing.md)
- [Storybook Documentation](../guides/storybook.md)