# [Component Name]

Brief description of what this component does and its purpose.

## Import

```jsx
import { ComponentName } from '@/components/ComponentName';
// or
import { ComponentName } from '@/components';
```

## Basic Usage

```jsx
<ComponentName 
  prop1="value1"
  prop2={value2}
>
  Content
</ComponentName>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `prop1` | `string` | `''` | No | Description of prop1 |
| `prop2` | `number \| string` | `0` | Yes | Description of prop2 |
| `prop3` | `boolean` | `false` | No | Description of prop3 |
| `onEvent` | `(data: EventData) => void` | - | No | Event handler function |
| `children` | `ReactNode` | - | No | Child components |
| `className` | `string` | - | No | Additional CSS classes |
| `testId` | `string` | - | No | Test identifier |

## Variants/Types

### Variant 1
Description of this variant and when to use it.

```jsx
<ComponentName variant="variant1" prop1="value">
  Variant 1 Content
</ComponentName>
```

### Variant 2
Description of this variant and when to use it.

```jsx
<ComponentName variant="variant2" prop1="value">
  Variant 2 Content
</ComponentName>
```

## Sizes

### Small
```jsx
<ComponentName size="small">Small Component</ComponentName>
```

### Medium (Default)
```jsx
<ComponentName size="medium">Medium Component</ComponentName>
```

### Large
```jsx
<ComponentName size="large">Large Component</ComponentName>
```

## States

### Default State
```jsx
<ComponentName>Default State</ComponentName>
```

### Loading State
```jsx
<ComponentName loading>Loading State</ComponentName>
```

### Disabled State
```jsx
<ComponentName disabled>Disabled State</ComponentName>
```

### Error State
```jsx
<ComponentName error="Error message">Error State</ComponentName>
```

## Advanced Examples

### Example 1: Complex Usage
Description of this complex usage scenario.

```jsx
import { ComponentName, OtherComponent } from '@/components';
import { useState } from 'react';

function ExampleUsage() {
  const [state, setState] = useState(initialValue);

  const handleEvent = (data) => {
    // Handle event logic
    setState(data);
  };

  return (
    <ComponentName
      prop1="advanced-value"
      prop2={state.value}
      onEvent={handleEvent}
      className="custom-class"
    >
      <OtherComponent />
    </ComponentName>
  );
}
```

### Example 2: Integration with Forms
Description of form integration.

```jsx
import { ComponentName, Form, Button } from '@/components';
import { useForm } from 'react-hook-form';

function FormExample() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ComponentName
        {...register('fieldName', { required: true })}
        error={errors.fieldName && 'This field is required'}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Example 3: Conditional Rendering
Description of conditional rendering scenario.

```jsx
function ConditionalExample({ user, isLoading, error }) {
  if (isLoading) {
    return <ComponentName loading />;
  }

  if (error) {
    return <ComponentName error={error.message} />;
  }

  return (
    <ComponentName
      prop1={user.name}
      prop2={user.id}
      variant={user.isPremium ? 'premium' : 'standard'}
    >
      {user.content}
    </ComponentName>
  );
}
```

## Accessibility

The ComponentName is fully accessible and includes:

- **Keyboard Navigation**: Describe keyboard interactions
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Screen Reader Support**: Appropriate ARIA attributes

### ARIA Attributes
```jsx
<ComponentName 
  aria-label="Descriptive label"
  aria-describedby="description-id"
  role="appropriate-role"
>
  Content
</ComponentName>
```

### Keyboard Interactions
| Key | Action |
|-----|--------|
| `Tab` | Move focus to/from component |
| `Enter` | Activate component |
| `Space` | Alternative activation |
| `Escape` | Close/cancel (if applicable) |

## Styling

### CSS Classes
The component applies these CSS classes:

```css
.component-name {
  /* Base styles */
}

.component-name--variant1 {
  /* Variant 1 styles */
}

.component-name--size-small {
  /* Small size styles */
}

.component-name--loading {
  /* Loading state styles */
}

.component-name--disabled {
  /* Disabled state styles */
}
```

### Custom Styling
```jsx
// Using className prop
<ComponentName className="custom-component">
  Custom Styled Component
</ComponentName>

// Using styled-components
import styled from 'styled-components';

const StyledComponent = styled(ComponentName)`
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;
```

### CSS Custom Properties
```css
.component-name {
  --component-bg-color: #ffffff;
  --component-text-color: #333333;
  --component-border-radius: 4px;
}
```

## Theming

### Theme Variables
```javascript
const theme = {
  components: {
    ComponentName: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      borderRadius: '4px',
      variants: {
        variant1: {
          backgroundColor: '#f0f0f0'
        }
      }
    }
  }
};
```

### Usage with Theme
```jsx
import { ThemeProvider } from 'styled-components';
import { ComponentName } from '@/components';

function ThemedApp() {
  return (
    <ThemeProvider theme={customTheme}>
      <ComponentName>Themed Component</ComponentName>
    </ThemeProvider>
  );
}
```

## Testing

### Unit Tests
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles prop changes correctly', () => {
    const { rerender } = render(<ComponentName prop1="initial" />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
    
    rerender(<ComponentName prop1="updated" />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });

  it('calls event handlers', async () => {
    const handleEvent = jest.fn();
    const user = userEvent.setup();
    
    render(<ComponentName onEvent={handleEvent} />);
    
    await user.click(screen.getByRole('button'));
    expect(handleEvent).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<ComponentName className="custom-class">Content</ComponentName>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('shows loading state', () => {
    render(<ComponentName loading />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Something went wrong';
    render(<ComponentName error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
```

### Integration Tests
```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentName } from './ComponentName';
import { TestProvider } from '@/test-utils';

describe('ComponentName Integration', () => {
  it('integrates with form validation', async () => {
    const mockSubmit = jest.fn();
    
    render(
      <TestProvider>
        <form onSubmit={mockSubmit}>
          <ComponentName name="testField" required />
          <button type="submit">Submit</button>
        </form>
      </TestProvider>
    );

    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

### Visual Testing (Storybook)
```jsx
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComponentName } from './ComponentName';

export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['variant1', 'variant2'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} as ComponentMeta<typeof ComponentName>;

const Template: ComponentStory<typeof ComponentName> = (args) => (
  <ComponentName {...args} />
);

export const Default = Template.bind({});
Default.args = {
  prop1: 'default value',
  children: 'Default Component',
};

export const Variant1 = Template.bind({});
Variant1.args = {
  variant: 'variant1',
  children: 'Variant 1 Component',
};

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <ComponentName variant="variant1">Variant 1</ComponentName>
    <ComponentName variant="variant2">Variant 2</ComponentName>
  </div>
);

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <ComponentName size="small">Small</ComponentName>
    <ComponentName size="medium">Medium</ComponentName>
    <ComponentName size="large">Large</ComponentName>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <ComponentName>Default</ComponentName>
    <ComponentName loading>Loading</ComponentName>
    <ComponentName disabled>Disabled</ComponentName>
    <ComponentName error="Error message">Error</ComponentName>
  </div>
);
```

## Performance Considerations

### Optimization Tips
- Use `React.memo()` for expensive re-renders
- Implement proper `useMemo()` and `useCallback()` where needed
- Consider lazy loading for heavy components
- Optimize images and assets

### Example Optimization
```jsx
import React, { memo, useMemo, useCallback } from 'react';

const ComponentName = memo(({ 
  expensiveProp, 
  onEvent, 
  children 
}) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(expensiveProp);
  }, [expensiveProp]);

  const handleEvent = useCallback((data) => {
    onEvent?.(data);
  }, [onEvent]);

  return (
    <div>
      {processedData}
      {children}
    </div>
  );
});
```

## Best Practices

### Do's ✅
- Use semantic HTML elements
- Provide proper ARIA labels
- Handle loading and error states
- Use TypeScript for prop validation
- Include comprehensive tests
- Follow consistent naming conventions

### Don'ts ❌
- Don't use inline styles for complex styling
- Don't ignore accessibility requirements
- Don't skip error handling
- Don't use generic prop names
- Don't forget to handle edge cases

## Troubleshooting

### Common Issues

**Issue**: Component not rendering correctly
**Solution**: Check that all required props are provided and have correct types

**Issue**: Styling not applied
**Solution**: Verify CSS classes are imported and theme provider is configured

**Issue**: Event handlers not firing
**Solution**: Ensure event handlers are properly bound and not undefined

### Debug Mode
```jsx
<ComponentName 
  debug={process.env.NODE_ENV === 'development'}
  onDebug={(debugInfo) => console.log(debugInfo)}
>
  Debug Content
</ComponentName>
```

## Related Components

- [RelatedComponent1](./RelatedComponent1.md) - Brief description
- [RelatedComponent2](./RelatedComponent2.md) - Brief description
- [ParentComponent](./ParentComponent.md) - Component that often contains this one

## Migration Guide

### From v1.x to v2.x
```jsx
// Old API (v1.x)
<ComponentName 
  oldProp="value"
  deprecatedProp={true}
/>

// New API (v2.x)
<ComponentName 
  newProp="value"
  improvedProp={true}
/>
```

## Changelog

### Version 2.1.0
- Added new `variant3` option
- Improved accessibility support
- Performance optimizations

### Version 2.0.0
- **Breaking**: Renamed `oldProp` to `newProp`
- Added TypeScript support
- New theming system

### Version 1.0.0
- Initial release
- Basic functionality