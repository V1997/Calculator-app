# Contributing to Enhanced Calculator

We love your input! We want to make contributing to Enhanced Calculator as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Quick Start for Contributors

### Prerequisites
- Node.js 16+ and npm
- Git
- A code editor (VS Code recommended)

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/enhanced-calculator.git
cd enhanced-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🛠️ Development Process

We use [GitHub Flow](https://guides.github.com/introduction/flow/), so all code changes happen through pull requests:

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Add tests for your changes
4. Ensure the test suite passes
5. Make sure your code follows our style guidelines
6. Issue a pull request!

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code improvements
- `test/description` - Test additions/improvements

## 📋 Pull Request Process

1. **Update Documentation**: Update the README.md and relevant docs
2. **Add Tests**: Include tests for new functionality
3. **Follow Code Style**: Run `npm run lint` and `npm run format`
4. **Update Changelog**: Add your changes to CHANGELOG.md
5. **Test Thoroughly**: Ensure all tests pass with `npm test`

### Pull Request Template
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## 🧪 Testing Guidelines

### Writing Tests
- Place unit tests in `tests/unit/`
- Place integration tests in `tests/integration/`
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test type
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Test Example
```javascript
describe('Calculator', () => {
  test('should add two numbers correctly', () => {
    // Arrange
    const calculator = new Calculator();
    
    // Act
    calculator.add(2, 3);
    
    // Assert
    expect(calculator.result).toBe(5);
  });
});
```

## 🎨 Code Style Guidelines

### JavaScript Style
- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names
- Write pure functions when possible
- Add JSDoc comments for public methods

### CSS Style
- Use BEM methodology for class naming
- Prefer CSS Grid and Flexbox over floats
- Use CSS custom properties for theming
- Mobile-first responsive design

### Code Formatting
We use Prettier for code formatting:
```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 🐛 Bug Reports

We use GitHub issues to track bugs. Report a bug by [opening a new issue](https://github.com/your-username/enhanced-calculator/issues/new/choose).

**Great Bug Reports** tend to have:
- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Screenshots (if applicable)
- Browser and device information

## 💡 Feature Requests

We welcome feature requests! Please:
1. Check if the feature already exists
2. Use our [feature request template](https://github.com/your-username/enhanced-calculator/issues/new/choose)
3. Provide clear use cases and examples
4. Consider the scope and maintenance burden

## 📝 Documentation

Documentation improvements are always welcome:
- README.md updates
- Code comments
- API documentation
- Tutorials and guides

## 🚀 Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release PR to `main`
4. Tag release after merge
5. GitHub Actions will handle deployment

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community

### Enforcement
Project maintainers are responsible for clarifying standards and may take corrective action.

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/your-username/enhanced-calculator/discussions) - For questions and general discussion
- 🐛 [GitHub Issues](https://github.com/your-username/enhanced-calculator/issues) - For bugs and feature requests
- 📧 Email: your-email@example.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors are recognized in our [README.md](README.md#contributors) and release notes.

---

Thank you for contributing! 🎉
