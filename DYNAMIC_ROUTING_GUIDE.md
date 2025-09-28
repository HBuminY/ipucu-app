# Dynamic Routing System - Usage Guide

This guide explains how to use the dynamic routing system that has been implemented in your application.

## Overview

The system provides:
- Dynamic URL parameters (like `/spaces/:spaceId`)
- Type-safe parameter extraction
- Helper functions for navigation
- Reusable hooks for accessing route parameters

## Files Created/Modified

1. **`utils/routeHelpers.ts`** - Route constants and path generation utilities
2. **`hooks/useRouteParams.ts`** - Custom hooks for extracting route parameters
3. **`pages/editSpace.tsx`** - Updated to use route parameters from URL
4. **`components/SpaceCard.tsx`** - Updated to navigate to dynamic routes

## How It Works

### 1. Route Configuration (already done in routes.tsx)

```tsx
{
  path: '/spaces/',
  element: <Layout />,
  children: [{ path: ':spaceId', element: <EditSpace /> }]
}
```

This creates the route pattern `/spaces/:spaceId` where `:spaceId` is a dynamic parameter.

### 2. Accessing Route Parameters

In any component that's rendered by a route with parameters, use the `useSpaceId` hook:

```tsx
import { useSpaceId } from '../hooks/useRouteParams'

const EditSpace: React.FC = () => {
  const { spaceId, isValid, isInvalid } = useSpaceId()
  
  if (isInvalid) {
    return <div>Invalid space ID</div>
  }
  
  return <div>Editing space {spaceId}</div>
}
```

### 3. Navigating to Dynamic Routes

Use the route helper functions to generate paths:

```tsx
import { useNavigate } from 'react-router-dom'
import { getEditSpacePath } from '../utils/routeHelpers'

const SomeComponent: React.FC = () => {
  const navigate = useNavigate()
  
  const goToSpace = (id: number) => {
    const path = getEditSpacePath(id)  // Returns "/spaces/123"
    navigate(path)
  }
  
  return (
    <button onClick={() => goToSpace(123)}>
      Go to Space 123
    </button>
  )
}
```

### 4. Using Link Components

For declarative navigation:

```tsx
import { Link } from 'react-router-dom'
import { getEditSpacePath } from '../utils/routeHelpers'

const SpaceList: React.FC = () => {
  const spaces = [
    { id: 1, title: "Space 1" },
    { id: 2, title: "Space 2" }
  ]
  
  return (
    <div>
      {spaces.map(space => (
        <Link key={space.id} to={getEditSpacePath(space.id)}>
          {space.title}
        </Link>
      ))}
    </div>
  )
}
```

## Example URLs

With this system, these URLs will work:
- `/spaces/1` - Edit space with ID 1
- `/spaces/42` - Edit space with ID 42  
- `/spaces/999` - Edit space with ID 999

## Available Utilities

### Route Constants
```tsx
import { ROUTES } from '../utils/routeHelpers'

// Available routes:
ROUTES.HOME          // "/"
ROUTES.SPACES        // "/spaces"
ROUTES.NEW_SPACE     // "/new-space"
ROUTES.EDIT_SPACE    // "/spaces/:spaceId"
```

### Path Generation
```tsx
import { getEditSpacePath, generatePath } from '../utils/routeHelpers'

// Generate specific paths
const spacePath = getEditSpacePath(123)  // "/spaces/123"

// Generic path generation
const customPath = generatePath('/spaces/:spaceId', { spaceId: 456 })
```

### Parameter Extraction
```tsx
import { useSpaceId, useSpaceParams } from '../hooks/useRouteParams'

// Get space ID as number with validation
const { spaceId, isValid, isInvalid } = useSpaceId()

// Get raw parameters
const { spaceId: rawSpaceId } = useSpaceParams()
```

## Testing the System

1. Navigate to `/spaces/123` - should show "Edit Space: (ID: 123)"
2. Navigate to `/spaces/invalid` - should show "Invalid space ID"
3. Click on any SpaceCard - should navigate to the correct edit page
4. Use browser back/forward buttons - should work correctly

## Extending the System

To add more dynamic routes:

1. Add route patterns to `routes.tsx`
2. Add constants to `ROUTES` in `routeHelpers.ts`
3. Create helper functions like `getEditSpacePath`
4. Create typed hooks like `useSpaceId` for parameter extraction

Example for a user profile route:

```tsx
// In routes.tsx
{ path: '/users/:userId/profile', element: <UserProfile /> }

// In routeHelpers.ts
ROUTES.USER_PROFILE = '/users/:userId/profile'
export const getUserProfilePath = (userId: string | number): string => {
  return generatePath(ROUTES.USER_PROFILE, { userId })
}

// In useRouteParams.ts
export const useUserId = () => {
  const { userId } = useParams<{ userId?: string }>()
  return {
    userId: userId ? parseInt(userId, 10) : null,
    userIdString: userId,
    isValid: userId ? !isNaN(parseInt(userId, 10)) : false
  }
}
```
