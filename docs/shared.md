# @thevikalp/designable-shared

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-shared.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-shared)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-shared.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-shared)

The shared package provides common utilities and helper functions used across all Triones Designable packages. It includes type checking, array manipulation, event handling, and other low-level utilities.

## Installation

```bash
npm install @thevikalp/designable-shared
# or
yarn add @thevikalp/designable-shared
```

## Overview

The shared package contains:

- **Type checking utilities** - Functions for checking JavaScript types
- **Array manipulation** - Functional programming helpers for arrays
- **Event system** - Custom event handling and dispatching
- **Coordinate calculations** - Position and dimension utilities
- **Cloning utilities** - Deep cloning of objects
- **LRU cache** - Least recently used cache implementation
- **Animation helpers** - Animation and timing utilities
- **DOM element utilities** - Browser DOM manipulation helpers
- **Observer pattern** - Pub/sub system implementation

## Type Checking

### Basic Type Checks

```typescript
import { 
  isArr, 
  isStr, 
  isNum, 
  isBool, 
  isObj, 
  isFn, 
  isPlainObj,
  isRegExp,
  isWindow,
  isHTMLElement,
  isValid,
  isValidNumber
} from '@thevikalp/designable-shared';

// Check types
isArr([1, 2, 3]); // true
isStr('hello'); // true
isNum(42); // true
isBool(true); // true
isObj({}); // true
isFn(() => {}); // true
isPlainObj({}); // true
isRegExp(/test/); // true
isWindow(window); // true
isHTMLElement(document.body); // true
isValid(null); // false
isValidNumber('42'); // false
isValidNumber(42); // true
```

### Advanced Type Checking

```typescript
import { getType } from '@thevikalp/designable-shared';

getType({}); // '[object Object]'
getType([]); // '[object Array]'
getType(null); // '[object Null]'
```

## Array Utilities

The shared package provides functional programming utilities for working with arrays, strings, and objects.

### Iteration

```typescript
import { each, map, reduce, every, some, find, findIndex } from '@thevikalp/designable-shared';

// each - iterate over collections
each([1, 2, 3], (value, index) => {
  console.log(`${index}: ${value}`);
});

each({a: 1, b: 2}, (value, key) => {
  console.log(`${key}: ${value}`);
});

// map - transform collections
const doubled = map([1, 2, 3], x => x * 2); // [2, 4, 6]

// reduce - accumulate values
const sum = reduce([1, 2, 3], (acc, val) => acc + val, 0); // 6

// every - test if all elements pass predicate
const allEven = every([2, 4, 6], x => x % 2 === 0); // true

// some - test if any element passes predicate
const hasEven = some([1, 2, 3], x => x % 2 === 0); // true

// find - find first matching element
const firstEven = find([1, 2, 3, 4], x => x % 2 === 0); // 2

// findIndex - find index of first matching element
const index = findIndex([1, 2, 3], x => x > 2); // 2
```

### Array-specific Utilities

```typescript
import { includes, includesWith, flat, toArr } from '@thevikalp/designable-shared';

// includes - check if array/string contains element
includes([1, 2, 3], 2); // true
includes('hello', 'l'); // true

// includesWith - check with custom predicate
includesWith([1, 2, 3], x => x > 2); // true

// flat - flatten nested arrays
flat([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]

// toArr - ensure value is array
toArr(1); // [1]
toArr([1, 2]); // [1, 2]
toArr(null); // []
```

## Event System

A comprehensive event handling system with custom event dispatching and subscription.

### Basic Event Handling

```typescript
import { Event, EventDriver } from '@thevikalp/designable-shared';

// Create event instance
const eventEngine = new Event();

// Subscribe to events
const unsubscribe = eventEngine.subscribe((event) => {
  console.log('Received event:', event.type, event.data);
});

// Dispatch custom events
eventEngine.dispatch({
  type: 'custom:event',
  data: { message: 'Hello' }
});

// Unsubscribe
unsubscribe();
```

### Event Subscription Helpers

```typescript
import { Event } from '@thevikalp/designable-shared';

const eventEngine = new Event();

// Subscribe to specific event types
eventEngine.subscribeWith('click', (event) => {
  console.log('Click event:', event);
});

// Subscribe to multiple event types
eventEngine.subscribeWith(['click', 'hover'], (event) => {
  console.log('Interaction event:', event);
});

// Subscribe to custom event classes
class CustomEvent {
  constructor(public data: any) {}
}

eventEngine.subscribeTo(CustomEvent, (event) => {
  console.log('Custom event data:', event.data);
});
```

### Event Drivers

Event drivers handle DOM event attachment and management.

```typescript
import { EventDriver } from '@thevikalp/designable-shared';

class MouseDriver extends EventDriver {
  attach(container: HTMLElement) {
    this.addEventListener('mousedown', this.handleMouseDown);
    this.addEventListener('mousemove', this.handleMouseMove);
    this.addEventListener('mouseup', this.handleMouseUp);
  }

  detach(container: HTMLElement) {
    this.removeEventListener('mousedown', this.handleMouseDown);
    this.removeEventListener('mousemove', this.handleMouseMove);
    this.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.dispatch({
      type: 'mouse:down',
      data: { x: event.clientX, y: event.clientY }
    });
  };

  private handleMouseMove = (event: MouseEvent) => {
    // Handle mouse move
  };

  private handleMouseUp = (event: MouseEvent) => {
    // Handle mouse up
  };
}
```

### Event Options

```typescript
// Add event listeners with options
driver.addEventListener('click', handler, {
  capture: true,
  once: true,
  mode: 'onlyOne' // Custom mode
});

// Batch event listeners across multiple containers
driver.batchAddEventListener('scroll', handler);
```

## Coordinate and Position Utilities

```typescript
import { 
  calcDistance, 
  calcRectByStartEndPoint,
  isPointInRect,
  calcClosestPoint,
  calcDistanceOfPointToRect
} from '@thevikalp/designable-shared';

// Calculate distance between points
const distance = calcDistance(
  { x: 0, y: 0 }, 
  { x: 3, y: 4 }
); // 5

// Calculate rectangle from start and end points
const rect = calcRectByStartEndPoint(
  { x: 10, y: 10 },
  { x: 50, y: 50 }
);
// { x: 10, y: 10, width: 40, height: 40 }

// Check if point is inside rectangle
const isInside = isPointInRect(
  { x: 20, y: 20 },
  { x: 10, y: 10, width: 40, height: 40 }
); // true

// Find closest point on rectangle to a given point
const closest = calcClosestPoint(
  { x: 0, y: 0 },
  { x: 10, y: 10, width: 20, height: 20 }
);
```

## Cloning Utilities

```typescript
import { shallowClone, deepClone } from '@thevikalp/designable-shared';

// Shallow clone
const original = { a: 1, b: { c: 2 } };
const shallow = shallowClone(original);
shallow.a = 2; // original.a unchanged
shallow.b.c = 3; // original.b.c changed

// Deep clone
const deep = deepClone(original);
deep.b.c = 4; // original.b.c unchanged
```

## LRU Cache

```typescript
import { LRUMap } from '@thevikalp/designable-shared';

// Create LRU cache with max size
const cache = new LRUMap(100);

// Set values
cache.set('key1', 'value1');
cache.set('key2', 'value2');

// Get values
const value = cache.get('key1'); // 'value1'

// Check existence
cache.has('key1'); // true

// Delete entries
cache.delete('key1');

// Get cache size
cache.size; // 1
```

## Animation Utilities

```typescript
import { requestIdle, cancelIdle } from '@thevikalp/designable-shared';

// Request idle callback
const handle = requestIdle(() => {
  // Do work when browser is idle
  console.log('Browser is idle');
});

// Cancel idle callback
cancelIdle(handle);
```

## DOM Element Utilities

```typescript
import { 
  getRect, 
  getOffset, 
  getViewport, 
  hasClass,
  addClass,
  removeClass,
  toggleClass
} from '@thevikalp/designable-shared';

// Get element rectangle
const rect = getRect(element);
// { x, y, width, height, top, left, right, bottom }

// Get element offset
const offset = getOffset(element);
// { top, left }

// Get viewport dimensions
const viewport = getViewport();
// { width, height }

// Class manipulation
hasClass(element, 'active'); // true/false
addClass(element, 'active');
removeClass(element, 'active');
toggleClass(element, 'active');
```

## Observer Pattern

```typescript
import { Subscribable } from '@thevikalp/designable-shared';

// Create observable
const observable = new Subscribable();

// Subscribe
const unsubscribe = observable.subscribe((data) => {
  console.log('Received:', data);
});

// Notify subscribers
observable.notify('Hello world');

// Unsubscribe
unsubscribe();
```

## Key Code Constants

```typescript
import { KeyCode } from '@thevikalp/designable-shared';

// Common key codes
KeyCode.Enter; // 13
KeyCode.Escape; // 27
KeyCode.Space; // 32
KeyCode.ArrowUp; // 38
KeyCode.ArrowDown; // 40
// ... etc
```

## Global This Polyfill

```typescript
import { globalThisPolyfill } from '@thevikalp/designable-shared';

// Safe access to global object
globalThisPolyfill.setTimeout; // Works in all environments
globalThisPolyfill.window; // Window in browser, undefined in Node
```

## Utility Functions

### UID Generation

```typescript
import { uid } from '@thevikalp/designable-shared';

const id = uid(); // Generate unique ID
```

### Function Composition

```typescript
import { compose } from '@thevikalp/designable-shared';

const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;

const addThenMultiply = compose(multiply, add);
addThenMultiply(5); // (5 + 1) * 2 = 12
```

### Instance Checking

```typescript
import { instOf } from '@thevikalp/designable-shared';

// Custom instance checking
instOf(value, 'Array'); // Check if array
instOf(value, 'Object'); // Check if plain object
```

## Usage Examples

### Creating a Custom Event System

```typescript
import { Event, EventDriver } from '@thevikalp/designable-shared';

class CustomDriver extends EventDriver {
  attach(container: HTMLElement) {
    this.addEventListener('click', (event) => {
      this.dispatch({
        type: 'custom:click',
        data: { target: event.target }
      });
    });
  }

  detach(container: HTMLElement) {
    this.removeEventListener('click');
  }
}

const eventEngine = new Event({
  drivers: [CustomDriver]
});

eventEngine.attachEvents(document.body);

eventEngine.subscribeWith('custom:click', (event) => {
  console.log('Custom click:', event.data);
});
```

### Array Processing Pipeline

```typescript
import { each, map, reduce, filter } from '@thevikalp/designable-shared';

const data = [1, 2, 3, 4, 5];

// Process array through pipeline
const result = reduce(
  map(
    data,
    x => x * 2 // Double each number
  ),
  (acc, val) => acc + val, // Sum all values
  0
); // Result: 30
```

### Coordinate Calculations

```typescript
import { 
  calcDistance, 
  isPointInRect,
  calcClosestPoint 
} from '@thevikalp/designable-shared';

// Check if mouse is over element
function isMouseOverElement(mouseX: number, mouseY: number, element: HTMLElement) {
  const rect = getRect(element);
  return isPointInRect({ x: mouseX, y: mouseY }, rect);
}

// Snap to grid
function snapToGrid(x: number, y: number, gridSize: number) {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize
  };
}
```

## Dependencies

None - this is a pure utility package with no external dependencies.

## Contributing

When contributing to the shared package:

1. Maintain backward compatibility
2. Add comprehensive type definitions
3. Include JSDoc comments for complex functions
4. Add unit tests for new utilities
5. Follow existing naming conventions

## License

UNLICENSED