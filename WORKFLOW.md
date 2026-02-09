# Git Workflow Guide

This document describes the Git workflow and branching conventions for this project.

## Branching Strategy

This project uses a **main-branch workflow** with feature branches:

- **`main`**: The primary branch containing production-ready code
- **Feature branches**: Short-lived branches for developing features, fixes, and improvements

All work happens in feature branches, which are merged back into `main` via Pull Requests.

## Branch Naming Convention

Branch names follow a structured format with a type prefix, ticket/issue number, and description:

```
<type>-<number>-<Description-In-Title-Case>
```

### Branch Types

- **`feature-`**: New features or enhancements
- **`bugfix-`**: Bug fixes for non-critical issues
- **`hotfix-`**: Critical bug fixes that need immediate attention
- **`chore-`**: Maintenance tasks, refactoring, or tooling updates
- **`docs-`**: Documentation-only changes

### Examples

```
feature-1-Add-User-Authentication
feature-2-Implement-Shopping-Cart
bugfix-3-Fix-Login-Error
hotfix-4-Fix-Critical-Payment-Bug
chore-5-Update-Dependencies
docs-6-Add-API-Documentation
```

### Naming Guidelines

- Use hyphens (`-`) to separate words
- Use Title Case for descriptions (capitalize first letter of each word)
- Keep descriptions concise but descriptive
- Include a ticket/issue number (sequential or from your issue tracker)

## Workflow Process

### 1. Create a Feature Branch

Start from the latest `main` branch:

```bash
git checkout main
git pull origin main
git checkout -b feature-1-Your-Feature-Name
```

### 2. Make Changes

Work on your feature, making commits as you go:

```bash
git add <files>
git commit -m "feat: add user authentication flow"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format for commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `chore:` for maintenance tasks
- `docs:` for documentation
- `refactor:` for code refactoring
- `test:` for test changes

### 3. Push to Remote

Push your branch to the remote repository:

```bash
git push -u origin feature-1-Your-Feature-Name
```

### 4. Create a Pull Request

Create a PR on GitHub with:
- Clear, descriptive title
- Summary of changes (what and why)
- Testing details
- References to related issues

### 5. Code Review

- Address review feedback
- Push additional commits to the same branch
- Ensure CI checks pass

### 6. Merge to Main

Once approved:
- Squash merge is preferred to keep history clean
- Delete the feature branch after merging

### 7. Keep Your Branch Updated

If `main` has moved forward while you're working:

```bash
git checkout main
git pull origin main
git checkout feature-1-Your-Feature-Name
git rebase main
```

## Best Practices

- Keep feature branches small and focused
- Make frequent, atomic commits
- Write clear commit messages
- Pull latest `main` before creating new branches
- Delete merged branches to keep the repository clean
- Run tests before pushing
- Keep PR descriptions informative

## Questions?

If you're unsure about any workflow aspect, feel free to ask in the team chat or create an issue for discussion.
