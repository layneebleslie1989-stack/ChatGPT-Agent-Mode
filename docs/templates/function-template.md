# [Function Name]

Brief description of what this function does and its purpose.

## Import

```typescript
import { functionName } from '@/utils/functionName';
// or
import { functionName } from '@/utils';
```

## Signature

```typescript
function functionName(
  param1: Type1,
  param2: Type2,
  options?: OptionsType
): ReturnType
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param1` | `Type1` | Yes | Description of first parameter |
| `param2` | `Type2` | Yes | Description of second parameter |
| `options` | `OptionsType` | No | Configuration options |
| `options.option1` | `boolean` | No | Description of option1 (default: `false`) |
| `options.option2` | `string` | No | Description of option2 (default: `'default'`) |

## Returns

| Type | Description |
|------|-------------|
| `ReturnType` | Description of what the function returns |

## Basic Usage

```typescript
const result = functionName(param1Value, param2Value);
console.log(result); // Expected output
```

## Advanced Usage

### With Options
```typescript
const result = functionName(param1Value, param2Value, {
  option1: true,
  option2: 'custom-value'
});
```

### Async Usage (if applicable)
```typescript
const result = await functionName(param1Value, param2Value);
```

### Error Handling
```typescript
try {
  const result = functionName(param1Value, param2Value);
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error.message);
}
```

## Examples

### Example 1: Basic Use Case
Description of this example and when you'd use it.

```typescript
// Setup
const input1 = 'example input';
const input2 = 42;

// Usage
const output = functionName(input1, input2);

// Result
console.log(output); // Expected: "processed example input with 42"
```

### Example 2: Complex Scenario
Description of a more complex usage scenario.

```typescript
// Complex input data
const complexInput = {
  data: ['item1', 'item2', 'item3'],
  metadata: { version: '1.0', author: 'user' }
};

// Function usage with options
const result = functionName(complexInput.data, complexInput.metadata, {
  option1: true,
  option2: 'production'
});

// Process results
result.forEach(item => {
  console.log(`Processed: ${item}`);
});
```

### Example 3: Integration with Other Functions
Description of how this function works with other utilities.

```typescript
import { functionName, anotherFunction, thirdFunction } from '@/utils';

// Chain multiple functions
const step1 = functionName(initialData, config);
const step2 = anotherFunction(step1);
const finalResult = thirdFunction(step2);

// Or use in a pipeline
const pipeline = [functionName, anotherFunction, thirdFunction];
const result = pipeline.reduce((data, fn) => fn(data), initialData);
```

## Type Definitions

```typescript
// Input types
interface Type1 {
  property1: string;
  property2: number;
}

interface Type2 {
  setting1: boolean;
  setting2?: string;
}

// Options type
interface OptionsType {
  option1?: boolean;
  option2?: string;
  option3?: {
    nested1: string;
    nested2: number;
  };
}

// Return type
interface ReturnType {
  success: boolean;
  data: ProcessedData;
  metadata: {
    timestamp: Date;
    version: string;
  };
}

interface ProcessedData {
  items: ProcessedItem[];
  summary: Summary;
}
```

## Error Handling

### Possible Errors

| Error Type | Condition | Message |
|------------|-----------|---------|
| `ValidationError` | Invalid input parameters | "Invalid parameter: {paramName}" |
| `ProcessingError` | Processing failure | "Failed to process data: {reason}" |
| `ConfigurationError` | Invalid options | "Invalid configuration: {details}" |

### Error Examples

```typescript
// Validation error
try {
  functionName(null, validParam2);
} catch (error) {
  console.error(error.name); // "ValidationError"
  console.error(error.message); // "Invalid parameter: param1 cannot be null"
}

// Processing error
try {
  functionName(validParam1, invalidParam2);
} catch (error) {
  console.error(error.name); // "ProcessingError"
  console.error(error.message); // "Failed to process data: invalid format"
}

// Safe usage with error handling
function safeFunction(param1, param2, options = {}) {
  try {
    return {
      success: true,
      data: functionName(param1, param2, options),
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: {
        name: error.name,
        message: error.message
      }
    };
  }
}
```

## Performance Considerations

### Time Complexity
- **Best Case**: O(n) where n is the size of input
- **Average Case**: O(n log n)
- **Worst Case**: O(n²)

### Space Complexity
- **Memory Usage**: O(n) additional space required
- **Optimization**: Consider using streaming for large datasets

### Performance Tips
```typescript
// ✅ Good: Use appropriate data structures
const optimizedInput = new Map(entries);
const result = functionName(optimizedInput, config);

// ❌ Avoid: Unnecessary object creation in loops
const inefficient = data.map(item => functionName(item, config));

// ✅ Better: Batch processing
const efficient = functionName(data, config);
```

## Testing

### Unit Tests
```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from './functionName';

describe('functionName', () => {
  it('should return expected result with valid inputs', () => {
    const result = functionName('test', { value: 42 });
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.processed).toBe('test-42');
  });

  it('should handle edge cases', () => {
    const result = functionName('', { value: 0 });
    
    expect(result.success).toBe(true);
    expect(result.data.processed).toBe('empty-0');
  });

  it('should throw error for invalid inputs', () => {
    expect(() => {
      functionName(null, { value: 42 });
    }).toThrow('Invalid parameter: param1 cannot be null');
  });

  it('should work with custom options', () => {
    const options = { option1: true, option2: 'custom' };
    const result = functionName('test', { value: 42 }, options);
    
    expect(result.metadata.customProcessing).toBe(true);
  });
});
```

### Property-Based Testing
```typescript
import { fc, test } from 'fast-check';
import { functionName } from './functionName';

describe('functionName properties', () => {
  test('should always return valid structure', () => {
    fc.assert(fc.property(
      fc.string(),
      fc.record({ value: fc.integer() }),
      (param1, param2) => {
        const result = functionName(param1, param2);
        
        // Properties that should always be true
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('metadata');
        
        if (result.success) {
          expect(result.data).toBeDefined();
          expect(result.metadata.timestamp).toBeInstanceOf(Date);
        }
      }
    ));
  });
});
```

### Integration Tests
```typescript
import { functionName, relatedFunction } from '@/utils';

describe('functionName integration', () => {
  it('should work with related functions', () => {
    const input = { data: 'test', config: { mode: 'production' } };
    
    // Test function composition
    const step1 = functionName(input.data, input.config);
    const step2 = relatedFunction(step1.data);
    
    expect(step2.success).toBe(true);
    expect(step2.data.processed).toContain('test');
  });
});
```

## Benchmarks

### Performance Benchmarks
```typescript
import { performance } from 'perf_hooks';
import { functionName } from './functionName';

// Benchmark different input sizes
const benchmarkSizes = [100, 1000, 10000, 100000];

benchmarkSizes.forEach(size => {
  const testData = generateTestData(size);
  const start = performance.now();
  
  functionName(testData.param1, testData.param2);
  
  const end = performance.now();
  console.log(`Size ${size}: ${end - start}ms`);
});
```

### Memory Usage
```typescript
// Monitor memory usage
const memBefore = process.memoryUsage();
const result = functionName(largeDataSet, config);
const memAfter = process.memoryUsage();

console.log('Memory used:', memAfter.heapUsed - memBefore.heapUsed);
```

## Best Practices

### Do's ✅
- Validate input parameters
- Use TypeScript for type safety
- Handle errors gracefully
- Document complex logic
- Write comprehensive tests
- Consider performance implications

### Don'ts ❌
- Don't mutate input parameters
- Don't ignore error cases
- Don't use `any` type
- Don't skip input validation
- Don't create unnecessary objects
- Don't forget to handle async operations properly

## Common Patterns

### Memoization
```typescript
import { memoize } from '@/utils/memoize';

// Cache expensive function calls
const memoizedFunction = memoize(functionName);

// Usage remains the same, but results are cached
const result1 = memoizedFunction(param1, param2);
const result2 = memoizedFunction(param1, param2); // Returns cached result
```

### Currying
```typescript
// Create partially applied function
const curriedFunction = (param1: Type1) => 
  (param2: Type2, options?: OptionsType) => 
    functionName(param1, param2, options);

// Usage
const processWithFixedParam1 = curriedFunction(fixedValue);
const result = processWithFixedParam1(param2Value);
```

### Pipeline Usage
```typescript
import { pipe } from '@/utils/pipe';

// Create processing pipeline
const pipeline = pipe(
  (data) => functionName(data, config),
  (result) => result.data,
  (processed) => formatOutput(processed)
);

const finalResult = pipeline(inputData);
```

## Migration Guide

### From v1.x to v2.x

```typescript
// Old API (v1.x)
const result = oldFunctionName(param, { 
  oldOption: true 
});

// New API (v2.x)
const result = functionName(param, config, { 
  newOption: true 
});

// Migration helper
function migrateFromV1(param, oldOptions) {
  const newConfig = transformConfig(oldOptions);
  const newOptions = transformOptions(oldOptions);
  return functionName(param, newConfig, newOptions);
}
```

## Related Functions

- [relatedFunction1](./relatedFunction1.md) - Brief description of relationship
- [relatedFunction2](./relatedFunction2.md) - Brief description of relationship
- [utilityFunction](./utilityFunction.md) - Helper function used internally

## Changelog

### Version 2.1.0
- Added new `option3` parameter
- Improved error messages
- Performance optimizations for large datasets

### Version 2.0.0
- **Breaking**: Changed function signature
- Added TypeScript support
- Improved error handling

### Version 1.0.0
- Initial release
- Basic functionality