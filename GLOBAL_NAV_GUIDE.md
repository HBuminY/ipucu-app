# Global Dynamic Navigation - Usage Guide

## The Problem with the Old Hook
```tsx
// ❌ OLD WAY - Each component had its own isolated state
const Component1 = () => {
  const { addButton } = useDynamicNavButtons() // Own state instance
  // Adding button here only affects Component1
}

const Component2 = () => {
  const { addButton } = useDynamicNavButtons() // Different state instance
  // Adding button here only affects Component2
}
```

## The Solution - Global Context
```tsx
// ✅ NEW WAY - All components share the same global state
const Component1 = () => {
  const { addButton } = useDynamicNav() // Shared global state
  // Adding button here affects ALL components
}

const Component2 = () => {
  const { addButton } = useDynamicNav() // Same shared global state
  // Adding button here affects ALL components
}
```

## Setup (Already Done)
1. ✅ Created `DynamicNavContext.tsx` with global state
2. ✅ Wrapped App with `<DynamicNavProvider>`
3. ✅ Updated Navbar to use `useDynamicNav()`

## Usage Examples

### 1. From a Space Card Component
```tsx
import { useDynamicNav } from '../context/DynamicNavContext'

const SpaceCard = ({ spaceId, spaceName }) => {
  const { addButton } = useDynamicNav()
  
  const handleClick = () => {
    // This adds a button that ALL components can see!
    addButton({
      to: 'spaces', // or create dynamic routes for specific spaces
      children: spaceName,
      id: `space-${spaceId}`
    })
  }
  
  return <div onClick={handleClick}>{spaceName}</div>
}
```

### 2. From the Spaces Page
```tsx
const SpacesPage = () => {
  const { addButton, removeButtonByRoute } = useDynamicNav()
  
  useEffect(() => {
    // Add "Create New" when viewing spaces
    addButton({ to: 'new-space', children: '+ New Space' })
    
    return () => {
      // Clean up when leaving
      removeButtonByRoute('new-space')
    }
  }, [])
}
```

### 3. From Any Other Component
```tsx
const AnyComponent = () => {
  const { dynamicButtons, clearButtons } = useDynamicNav()
  
  return (
    <div>
      <p>Current nav buttons: {dynamicButtons.length}</p>
      <button onClick={clearButtons}>Clear All Nav Buttons</button>
    </div>
  )
}
```

## Key Benefits
- ✅ **Global State**: Changes from any component affect the entire app
- ✅ **Persistent**: Buttons stay visible across all components 
- ✅ **Centralized**: All navigation state in one place
- ✅ **Type Safe**: Full TypeScript support
- ✅ **No Duplicates**: Automatically prevents duplicate routes (optional)

## Available Functions
- `addButton(config)` - Add a new navigation button
- `removeButton(index)` - Remove by array index
- `removeButtonByRoute(route)` - Remove by route path
- `removeButtonById(id)` - Remove by unique ID
- `clearButtons()` - Remove all buttons
- `updateButton(index, config)` - Update existing button
- `updateButtonById(id, config)` - Update by ID
- `dynamicButtons` - Current array of buttons
