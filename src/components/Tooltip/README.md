# Tooltip Component

A reusable, dark-themed tooltip component for displaying helpful information on hover.

## Features

- 🎨 Dark theme with glassmorphism effect
- 📍 Four position options: top, bottom, left, right
- ⏱️ Configurable delay before showing
- 📏 Customizable max width
- ✨ Smooth fade-in animation
- 🎯 Auto-positioning with scroll/resize handling
- ♿ Accessible and lightweight

## Usage

```tsx
import { Tooltip } from '@/components/Tooltip';

// Basic usage
<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// With custom position and max width
<Tooltip 
  content="To see the solution, solve the problem or make 5 attempts"
  position="bottom"
  maxWidth={280}
  delay={300}
>
  <button>Hover me</button>
</Tooltip>

// For disabled elements, wrap in a span
<Tooltip content="This feature is locked">
  <span>
    <button disabled>Locked</button>
  </span>
</Tooltip>

// With JSX content
<Tooltip 
  content={
    <div>
      <strong>Pro Tip:</strong>
      <p>You can use keyboard shortcuts!</p>
    </div>
  }
>
  <span>ⓘ</span>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** The element that triggers the tooltip |
| `content` | `string \| ReactNode` | - | **Required.** The tooltip content to display |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger element |
| `delay` | `number` | `200` | Delay in milliseconds before showing tooltip |
| `maxWidth` | `number` | `250` | Maximum width in pixels |

## Styling

The tooltip uses a dark glassmorphism design with:
- Semi-transparent black background (`rgba(10, 10, 10, 0.95)`)
- Backdrop blur effect
- Subtle border with white overlay
- Drop shadow for depth
- Smooth arrow pointer

## Examples in Codebase

- **CodeEditor**: Locked "Solution" tab with explanation tooltip
- Can be used anywhere: buttons, icons, form labels, etc.

## Tips

- Use shorter text for better UX (aim for 1-2 lines)
- For complex content, consider using a modal instead
- The tooltip automatically hides when mouse leaves
- Position is recalculated on window resize and scroll
- **Important:** For disabled elements (buttons, inputs), wrap them in a `<span>` because disabled elements don't trigger mouse events
