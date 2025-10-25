# Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you understand our development process and how to contribute effectively.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Documentation Standards](#documentation-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 🤝 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js (version 16 or higher)
- Git
- A code editor (VS Code recommended)
- Basic understanding of the project's technology stack

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Verify Setup**
   ```bash
   npm test
   npm run lint
   ```

## 🔄 Development Process

### Branch Naming Convention

Use descriptive branch names that follow this pattern:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

Examples:
- `feature/user-authentication`
- `fix/login-validation-error`
- `docs/api-documentation-update`

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add user registration endpoint

fix(validation): resolve email validation bug

docs(api): update user endpoints documentation

test(utils): add tests for string utility functions
```

## 📚 Documentation Standards

### Required Documentation

When contributing code, you must also provide:

1. **API Documentation** - For new endpoints or API changes
2. **Component Documentation** - For new React components
3. **Function Documentation** - For utility functions and helpers
4. **Usage Examples** - Practical examples showing how to use your code
5. **Tests** - Unit tests and integration tests

### Documentation Guidelines

- Follow our [Documentation Standards](./docs/STANDARDS.md)
- Include JSDoc comments for all public functions
- Provide complete usage examples
- Document error conditions and edge cases
- Update existing documentation when making changes

### Example Documentation

```typescript
/**
 * Validates user email address format and domain
 * 
 * @param email - Email address to validate
 * @param options - Validation options
 * @param options.allowDisposable - Allow disposable email addresses
 * @param options.requireMX - Require MX record verification
 * @returns Promise resolving to validation result
 * 
 * @example
 * ```typescript
 * const result = await validateEmail('user@example.com');
 * if (result.isValid) {
 *   console.log('Email is valid');
 * } else {
 *   console.log('Validation errors:', result.errors);
 * }
 * ```
 * 
 * @throws {ValidationError} When email format is invalid
 * @since 1.2.0
 */
export async function validateEmail(
  email: string,
  options: ValidationOptions = {}
): Promise<ValidationResult> {
  // Implementation
}
```

## 🧪 Testing Requirements

### Test Coverage

All contributions must include appropriate tests:

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows (for major features)

### Testing Guidelines

1. **Write Tests First** (TDD approach recommended)
2. **Test Edge Cases** - Include error conditions and boundary cases
3. **Use Descriptive Test Names** - Clearly describe what is being tested
4. **Mock External Dependencies** - Use mocks for API calls, databases, etc.
5. **Maintain High Coverage** - Aim for 80%+ code coverage

### Test Examples

```typescript
// Unit Test Example
describe('validateEmail', () => {
  it('should validate correct email format', async () => {
    const result = await validateEmail('user@example.com');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject invalid email format', async () => {
    const result = await validateEmail('invalid-email');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });

  it('should handle disposable email addresses', async () => {
    const result = await validateEmail('user@tempmail.com', {
      allowDisposable: false
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Disposable email addresses not allowed');
  });
});

// Component Test Example
describe('LoginForm', () => {
  it('should submit form with valid credentials', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123'
    });
  });
});
```

## 🔍 Pull Request Process

### Before Submitting

1. **Update Documentation** - Ensure all documentation is current
2. **Run Tests** - All tests must pass
3. **Check Linting** - Code must pass linting rules
4. **Update Changelog** - Add entry to CHANGELOG.md if applicable
5. **Rebase on Main** - Ensure your branch is up to date

### Pull Request Template

Use this template for your pull request description:

```markdown
## Description
Brief description of the changes and their purpose.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Manual testing completed

## Documentation
- [ ] Code is documented with JSDoc comments
- [ ] API documentation updated
- [ ] Component documentation updated
- [ ] Usage examples provided
- [ ] README updated (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No console.log statements left in code
- [ ] Breaking changes documented
- [ ] Tests added for new functionality

## Screenshots (if applicable)
Include screenshots for UI changes.

## Additional Notes
Any additional information or context.
```

### Review Process

1. **Automated Checks** - CI/CD pipeline runs tests and linting
2. **Code Review** - Team members review for quality and standards
3. **Documentation Review** - Ensure documentation is complete and accurate
4. **Testing Review** - Verify test coverage and quality
5. **Final Approval** - Maintainer approves and merges

## 🎨 Style Guidelines

### Code Style

We use automated tools to enforce consistent code style:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Stylelint** - CSS/SCSS linting

### Configuration Files

```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use generic types where appropriate
- Avoid `any` type - use `unknown` instead
- Document complex types with JSDoc

### React Guidelines

- Use functional components with hooks
- Implement proper prop validation with TypeScript
- Use meaningful component and prop names
- Follow React best practices for performance
- Implement proper error boundaries

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Clear Description** - What happened vs what was expected
2. **Steps to Reproduce** - Detailed steps to recreate the issue
3. **Environment** - OS, browser, Node.js version, etc.
4. **Screenshots** - Visual evidence if applicable
5. **Error Messages** - Complete error messages and stack traces

### Feature Requests

When requesting features, include:

1. **Use Case** - Why is this feature needed?
2. **Proposed Solution** - How should it work?
3. **Alternatives** - What alternatives have you considered?
4. **Additional Context** - Any other relevant information

## 💬 Getting Help

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Discord/Slack** - Real-time chat (if applicable)
- **Email** - Direct contact for sensitive issues

### Resources

- [Project Documentation](./docs/README.md)
- [API Documentation](./docs/api/README.md)
- [Component Documentation](./docs/components/README.md)
- [Examples](./docs/examples/README.md)

## 🏆 Recognition

Contributors who make significant contributions will be:

- Added to the CONTRIBUTORS.md file
- Mentioned in release notes
- Invited to join the core team (for ongoing contributors)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! Your efforts help make this project better for everyone. 🚀