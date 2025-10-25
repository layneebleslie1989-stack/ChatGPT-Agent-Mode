# Button Component

A versatile, accessible button component with multiple variants and sizes.

## Import

```jsx
import { Button } from '@/components/ui/Button';
// or
import { Button } from '@/components';
```

## Basic Usage

```jsx
<Button onClick={handleClick}>
  Click me
</Button>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | No | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | No | Button size |
| `disabled` | `boolean` | `false` | No | Whether the button is disabled |
| `loading` | `boolean` | `false` | No | Shows loading spinner |
| `fullWidth` | `boolean` | `false` | No | Makes button full width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | No | HTML button type |
| `onClick` | `(event: MouseEvent) => void` | - | No | Click handler function |
| `children` | `ReactNode` | - | Yes | Button content |
| `className` | `string` | - | No | Additional CSS classes |
| `testId` | `string` | - | No | Test identifier |

## Variants

### Primary Button
The main call-to-action button with high emphasis.

```jsx
<Button variant="primary" onClick={handleSubmit}>
  Submit Form
</Button>
```

### Secondary Button
Medium emphasis button for secondary actions.

```jsx
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>
```

### Danger Button
High emphasis button for destructive actions.

```jsx
<Button variant="danger" onClick={handleDelete}>
  Delete Item
</Button>
```

### Ghost Button
Low emphasis button with minimal styling.

```jsx
<Button variant="ghost" onClick={handleEdit}>
  Edit
</Button>
```

## Sizes

### Small Button
Compact button for tight spaces.

```jsx
<Button size="small">Small Button</Button>
```

### Medium Button (Default)
Standard button size for most use cases.

```jsx
<Button size="medium">Medium Button</Button>
```

### Large Button
Prominent button for important actions.

```jsx
<Button size="large">Large Button</Button>
```

## States

### Disabled Button
Button that cannot be interacted with.

```jsx
<Button disabled>
  Disabled Button
</Button>
```

### Loading Button
Button showing a loading state with spinner.

```jsx
<Button loading>
  Loading...
</Button>
```

### Full Width Button
Button that spans the full width of its container.

```jsx
<Button fullWidth>
  Full Width Button
</Button>
```

## Advanced Examples

### Form Submit Button
```jsx
<form onSubmit={handleSubmit}>
  <input type="text" name="username" />
  <Button type="submit" variant="primary" loading={isSubmitting}>
    {isSubmitting ? 'Signing In...' : 'Sign In'}
  </Button>
</form>
```

### Button with Icon
```jsx
import { PlusIcon } from '@/components/icons';

<Button variant="primary">
  <PlusIcon size={16} />
  Add Item
</Button>
```

### Conditional Button
```jsx
<Button 
  variant={hasChanges ? 'primary' : 'secondary'}
  disabled={!hasChanges}
  onClick={handleSave}
>
  {hasChanges ? 'Save Changes' : 'No Changes'}
</Button>
```

### Button Group
```jsx
<div className="button-group">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
  <Button variant="danger">Delete</Button>
</div>
```

## Accessibility

The Button component is fully accessible and includes:

- **Keyboard Navigation**: Focusable with Tab, activated with Enter/Space
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Disabled State**: Properly communicated to assistive technologies

### ARIA Attributes
```jsx
<Button 
  aria-label="Delete user account"
  aria-describedby="delete-warning"
  variant="danger"
>
  Delete Account
</Button>
```

## Styling

### Custom Styling with CSS Classes
```jsx
<Button className="custom-button-class">
  Custom Styled Button
</Button>
```

### Styled Components Override
```jsx
import styled from 'styled-components';
import { Button } from '@/components';

const CustomButton = styled(Button)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  
  &:hover {
    background: linear-gradient(45deg, #ff5252, #26a69a);
  }
`;
```

## Testing

### Unit Test Example
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### Integration Test Example
```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from './UserForm';

describe('UserForm Integration', () => {
  it('submits form when submit button is clicked', async () => {
    const mockSubmit = jest.fn();
    render(<UserForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe'
      });
    });
  });
});
```

## Storybook Stories

```jsx
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost'],
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
    <Button variant="ghost">Ghost</Button>
  </div>
);
```

## Best Practices

### Do's ✅
- Use clear, action-oriented text
- Choose appropriate variants for the action importance
- Provide loading states for async actions
- Include proper ARIA labels for accessibility
- Use consistent sizing throughout your application

### Don'ts ❌
- Don't use too many primary buttons on one page
- Don't make buttons too small for touch interfaces
- Don't use vague text like "Click here" or "Submit"
- Don't forget to handle loading and error states
- Don't override core accessibility features

## Related Components

- [IconButton](./IconButton.md) - Button with only an icon
- [LinkButton](./LinkButton.md) - Button styled as a link
- [ButtonGroup](./ButtonGroup.md) - Group of related buttons
- [FloatingActionButton](./FloatingActionButton.md) - Floating action button