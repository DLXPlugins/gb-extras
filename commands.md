# Commands Refactoring Plan

## Overview
This document outlines the plan to refactor the commands system from a single file into three separate files with modular, reusable command components.

## Current Structure

### File: `src/js/blocks/commands/index.js`
- **Total Commands**: 8 commands
- **Context**: All commands currently use `context: 'block-editor'`
- **Registration**: Single plugin registration (`dlxgb-commands`)
- **Shared Components**:
  - `OutlineIcon` - SVG icon component
  - `GBIcon` - SVG icon component
  - `addOutlineClasses` - HOC for adding outline classes to blocks
  - Global state: `globalShowContainerOutlines`
- **Shared Utilities**:
  - `getBlockNestingLevel()` - Recursively calculates block nesting depth
  - `transformBlocks()` - Recursively transforms blocks
  - `transformBlock()` - Transforms a single block from v1 to v2

### Current Commands List

1. **dlx-gb-admin-settings** - Navigate to GenerateBlocks Settings
2. **dlx-gb-local-patterns** - Navigate to GenerateBlocks Patterns
3. **dlx-gb-global-styles-new** - Navigate to GenerateBlocks Global Styles (New)
4. **dlx-gb-global-styles-legacy** - Navigate to GenerateBlocks Global Styles (Legacy)
5. **dlx-gb-asset-library** - Navigate to GenerateBlocks Asset Library
6. **dlx-gb-extras-Settings** - Navigate to GB Extras Settings
7. **dlx-gb-extras-toggle-container-outlines** - Toggle container/element outlines
8. **dlx-transform-v1-blocks-to-v2** - Convert v1 blocks to v2 (Experimental)

## Proposed Structure

### File Organization

```
src/js/blocks/commands/
├── index.js (removed - will be replaced)
├── commands-block-editor.js (new)
├── commands-admin.js (new)
├── commands-frontend.js (new)
├── components/
│   ├── icons/
│   │   ├── OutlineIcon.js
│   │   └── GBIcon.js
│   ├── commands/
│   │   ├── NavigateToSettings.js
│   │   ├── NavigateToPatterns.js
│   │   ├── NavigateToGlobalStylesNew.js
│   │   ├── NavigateToGlobalStylesLegacy.js
│   │   ├── NavigateToAssetLibrary.js
│   │   ├── NavigateToGBExtrasSettings.js
│   │   ├── ToggleContainerOutlines.js
│   │   └── TransformV1ToV2.js
│   └── modals/
│       ├── TransformV1ToV2Modal.js
│       └── SaveSVGToAssetLibraryModal.js
└── utils/
    ├── blockTransforms.js
    ├── outlineClasses.js
    └── blockNesting.js
```

## Command Categorization

### Block Editor Commands (`commands-block-editor.js`)
Commands that operate within the block editor context and manipulate blocks or editor state.

1. **dlx-gb-extras-toggle-container-outlines** - Toggle container/element outlines
   - **Component**: `ToggleContainerOutlines.js`
   - **Dependencies**: `OutlineIcon`, `outlineClasses.js`, `addOutlineClasses` HOC
   - **Context**: `block-editor`

2. **dlx-transform-v1-blocks-to-v2** - Convert v1 blocks to v2
   - **Component**: `TransformV1ToV2.js`
   - **Dependencies**: `TransformV1ToV2Modal.js`, `blockTransforms.js`, `blockNesting.js`
   - **Context**: `block-editor`

### Admin Commands (`commands-admin.js`)
Commands that navigate to admin pages or perform admin-related actions.

1. **dlx-gb-admin-settings** - Navigate to GenerateBlocks Settings
   - **Component**: `NavigateToSettings.js`
   - **Dependencies**: `GBIcon`
   - **Context**: `admin` (or `block-editor` if needed)

2. **dlx-gb-local-patterns** - Navigate to GenerateBlocks Patterns
   - **Component**: `NavigateToPatterns.js`
   - **Dependencies**: `GBIcon`
   - **Context**: `admin` (or `block-editor` if needed)

3. **dlx-gb-global-styles-new** - Navigate to GenerateBlocks Global Styles (New)
   - **Component**: `NavigateToGlobalStylesNew.js`
   - **Dependencies**: `GBIcon`
   - **Context**: `admin` (or `block-editor` if needed)

4. **dlx-gb-global-styles-legacy** - Navigate to GenerateBlocks Global Styles (Legacy)
   - **Component**: `NavigateToGlobalStylesLegacy.js`
   - **Dependencies**: `GBIcon`
   - **Context**: `admin` (or `block-editor` if needed)

5. **dlx-gb-asset-library** - Navigate to GenerateBlocks Asset Library
   - **Component**: `NavigateToAssetLibrary.js`
   - **Dependencies**: `GBIcon`
   - **Context**: `admin` (or `block-editor` if needed)

6. **dlx-gb-extras-Settings** - Navigate to GB Extras Settings
   - **Component**: `NavigateToGBExtrasSettings.js`
   - **Dependencies**: `settings` icon from `@wordpress/icons`
   - **Context**: `admin` (or `block-editor` if needed)

### Frontend Commands (`commands-frontend.js`)
Commands that operate on the frontend (currently none, but reserved for future use).

- **Placeholder**: This file will be created but may remain empty initially.
- **Future potential commands**: Frontend-specific toggles, debug tools, etc.

## Component Breakdown

### Icon Components

#### `components/icons/OutlineIcon.js`
- **Purpose**: SVG icon for outline toggle command
- **Props**: Standard SVG props (width, height, etc.)
- **Export**: Default export

#### `components/icons/GBIcon.js`
- **Purpose**: SVG icon for GenerateBlocks-related commands
- **Props**: Standard SVG props (width, height, etc.)
- **Export**: Default export

### Command Components

#### `components/commands/NavigateToSettings.js`
- **Purpose**: Command to navigate to GenerateBlocks Settings
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `GBIcon`
- **Export**: Named export `useNavigateToSettingsCommand`

#### `components/commands/NavigateToPatterns.js`
- **Purpose**: Command to navigate to GenerateBlocks Patterns
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `GBIcon`
- **Export**: Named export `useNavigateToPatternsCommand`

#### `components/commands/NavigateToGlobalStylesNew.js`
- **Purpose**: Command to navigate to GenerateBlocks Global Styles (New)
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `GBIcon`
- **Export**: Named export `useNavigateToGlobalStylesNewCommand`

#### `components/commands/NavigateToGlobalStylesLegacy.js`
- **Purpose**: Command to navigate to GenerateBlocks Global Styles (Legacy)
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `GBIcon`
- **Export**: Named export `useNavigateToGlobalStylesLegacyCommand`

#### `components/commands/NavigateToAssetLibrary.js`
- **Purpose**: Command to navigate to GenerateBlocks Asset Library
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `GBIcon`
- **Export**: Named export `useNavigateToAssetLibraryCommand`

#### `components/commands/NavigateToGBExtrasSettings.js`
- **Purpose**: Command to navigate to GB Extras Settings
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `settings` icon from `@wordpress/icons`
- **Export**: Named export `useNavigateToGBExtrasSettingsCommand`

#### `components/commands/ToggleContainerOutlines.js`
- **Purpose**: Command to toggle container/element outlines
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `OutlineIcon`, `outlineClasses.js`
- **State**: Manages `showContainerOutlines` state
- **Export**: Named export `useToggleContainerOutlinesCommand`

#### `components/commands/TransformV1ToV2.js`
- **Purpose**: Command to transform v1 blocks to v2
- **Hook**: Uses `useCommand` hook
- **Dependencies**: `TransformV1ToV2Modal.js`, `blockTransforms.js`, `blockNesting.js`
- **State**: Manages transformation state and modal visibility
- **Export**: Named export `useTransformV1ToV2Command`

### Modal Components

#### `components/modals/TransformV1ToV2Modal.js`
- **Purpose**: Modal for confirming v1 to v2 block transformation
- **Props**: 
  - `isOpen` - Boolean to control modal visibility
  - `onClose` - Callback when modal is closed
  - `onConfirm` - Callback when transformation is confirmed
  - `transforming` - Boolean indicating transformation in progress
- **Dependencies**: `Modal`, `Button`, `Spinner` from `@wordpress/components`
- **Export**: Default export

#### `components/modals/SaveSVGToAssetLibraryModal.js`
- **Purpose**: Modal for saving SVG to asset library (currently placeholder)
- **Props**: 
  - `isOpen` - Boolean to control modal visibility
  - `onClose` - Callback when modal is closed
- **Dependencies**: `Modal`, `Spinner` from `@wordpress/components`
- **Export**: Default export

### Utility Modules

#### `utils/blockTransforms.js`
- **Purpose**: Utilities for block transformation
- **Exports**:
  - `transformBlock(block)` - Transforms a single block
  - `transformBlocks(blocks)` - Recursively transforms blocks
- **Dependencies**: `@wordpress/blocks`, `@wordpress/data`, `BlockTypes` utils

#### `utils/outlineClasses.js`
- **Purpose**: Utilities for managing outline classes
- **Exports**:
  - `addOutlineClasses` - HOC for adding outline classes
  - `globalShowContainerOutlines` - Global state variable
- **Dependencies**: `@wordpress/compose`, `@wordpress/hooks`

#### `utils/blockNesting.js`
- **Purpose**: Utilities for calculating block nesting
- **Exports**:
  - `getBlockNestingLevel(blocks)` - Calculates maximum nesting level
- **Dependencies**: `@wordpress/data`

## Implementation Steps

### Phase 1: Create Directory Structure
1. Create `src/js/blocks/commands/components/` directory
2. Create `src/js/blocks/commands/components/icons/` directory
3. Create `src/js/blocks/commands/components/commands/` directory
4. Create `src/js/blocks/commands/components/modals/` directory
5. Create `src/js/blocks/commands/utils/` directory

### Phase 2: Extract Shared Components
1. Extract `OutlineIcon` to `components/icons/OutlineIcon.js`
2. Extract `GBIcon` to `components/icons/GBIcon.js`
3. Extract `addOutlineClasses` HOC to `utils/outlineClasses.js`
4. Extract block transformation utilities to `utils/blockTransforms.js`
5. Extract block nesting utilities to `utils/blockNesting.js`

### Phase 3: Create Command Components
1. Create `NavigateToSettings.js` component
2. Create `NavigateToPatterns.js` component
3. Create `NavigateToGlobalStylesNew.js` component
4. Create `NavigateToGlobalStylesLegacy.js` component
5. Create `NavigateToAssetLibrary.js` component
6. Create `NavigateToGBExtrasSettings.js` component
7. Create `ToggleContainerOutlines.js` component
8. Create `TransformV1ToV2.js` component

### Phase 4: Create Modal Components
1. Create `TransformV1ToV2Modal.js` component
2. Create `SaveSVGToAssetLibraryModal.js` component (placeholder)

### Phase 5: Create Main Command Files
1. Create `commands-block-editor.js` - Import and register block editor commands
2. Create `commands-admin.js` - Import and register admin commands
3. Create `commands-frontend.js` - Create placeholder for frontend commands

### Phase 6: Create PHP Enqueue Setup
1. Add block editor command enqueue in `php/Blocks.php`
2. Add admin command enqueue in `php/Blocks.php` or `php/Admin.php`
3. Add frontend command enqueue in `php/Blocks.php` (optional)
4. Add admin footer div for admin-wide commands

### Phase 7: Update Webpack Configuration
1. Add entry points for:
   - `gb-extras-commands-block-editor`
   - `gb-extras-commands-admin`
   - `gb-extras-commands-frontend`
2. Ensure proper dependency extraction
3. Test build process

### Phase 8: Update Imports
1. Remove old `commands/index.js` import from `src/index.js`
2. Commands will now be loaded via PHP enqueue hooks instead
3. Test that commands still work

### Phase 9: Cleanup
1. Delete old `src/js/blocks/commands/index.js` file
2. Verify all commands are working
3. Test in different contexts (block editor, admin, frontend)

## Webpack Configuration Updates

### Current Entry Points
```javascript
entry: {
    'index': './src/index.js',
    'gb-extras-block-labels': './src/js/blocks/components/GBBlockLabels/index.js',
}
```

### New Entry Points (to be added)
```javascript
entry: {
    'index': './src/index.js',
    'gb-extras-block-labels': './src/js/blocks/components/GBBlockLabels/index.js',
    'gb-extras-commands-block-editor': './src/js/blocks/commands/commands-block-editor.js',
    'gb-extras-commands-admin': './src/js/blocks/commands/commands-admin.js',
    'gb-extras-commands-frontend': './src/js/blocks/commands/commands-frontend.js',
}
```

## Component Pattern

Each command component will follow this pattern:

```javascript
import { useCommand } from '@wordpress/commands';
import { GBIcon } from '../icons/GBIcon';

/**
 * Hook to register the Navigate to Settings command.
 *
 * @return {void}
 */
export function useNavigateToSettingsCommand() {
    useCommand( {
        name: 'dlx-gb-admin-settings',
        label: 'Go to GenerateBlocks Settings',
        icon: <GBIcon width="16" height="16" />,
        callback: () => {
            document.location.href = 'admin.php?page=generateblocks-settings';
        },
        context: 'block-editor', // or 'admin' if appropriate
    } );
}
```

## PHP Enqueue Setup

Based on WordPress 6.9 Command Palette patterns, each command context requires different PHP enqueue hooks.

**Implementation Location**: Add methods to `php/Blocks.php` class, or create a new `php/Commands.php` class if preferred.

### Block Editor Commands

**File**: `php/Blocks.php` (in `register_block_editor_scripts()` method)

```php
**Option 1: Add to existing `register_block_editor_scripts()` method in `php/Blocks.php`**

```php
// Add this inside the register_block_editor_scripts() method, after existing script enqueues.
if ( current_user_can( 'manage_options' ) ) {
    $deps = require Functions::get_plugin_dir( 'build/gb-extras-commands-block-editor.asset.php' );
    wp_enqueue_script(
        'gb-extras-commands-block-editor',
        Functions::get_plugin_url( 'build/gb-extras-commands-block-editor.js' ),
        $deps['dependencies'],
        $deps['version'],
        true
    );
}
```

**Option 2: Create separate method and hook**

```php
/**
 * Enqueue block editor commands.
 */
public function enqueue_block_editor_commands() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    $deps = require Functions::get_plugin_dir( 'build/gb-extras-commands-block-editor.asset.php' );
    wp_enqueue_script(
        'gb-extras-commands-block-editor',
        Functions::get_plugin_url( 'build/gb-extras-commands-block-editor.js' ),
        $deps['dependencies'],
        $deps['version'],
        true
    );
}

// In init() method, add:
add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_commands' ) );
```
```

**Important**: Use `enqueue_block_editor_assets` hook, NOT `enqueue_block_assets` as it can load in an iframe and won't render correctly.

### Admin-Wide Commands

**File**: `php/Blocks.php` or `php/Admin.php`

Requires two parts: script enqueue and footer div.

**Part 1: Enqueue Script**

Add to `php/Blocks.php` class:

```php
/**
 * Enqueue admin-wide commands.
 */
public function enqueue_admin_commands() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    $deps = require Functions::get_plugin_dir( 'build/gb-extras-commands-admin.asset.php' );
    wp_enqueue_script(
        'gb-extras-commands-admin',
        Functions::get_plugin_url( 'build/gb-extras-commands-admin.js' ),
        $deps['dependencies'],
        $deps['version'],
        true
    );
}

// In init() method, add:
add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_commands' ) );
```
```

**Part 2: Admin Footer Div**

Add to `php/Blocks.php` class:

```php
/**
 * Add hidden div for admin-wide command palette.
 */
public function admin_commands_footer() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    echo '<div id="gb-extras-commands-admin" style="display: none; visibility: hidden; position: absolute; top: 0; left: 0; width: 0; height: 0; overflow: hidden;"></div>';
}

// In init() method, add:
add_action( 'admin_footer', array( $this, 'admin_commands_footer' ) );
```
```

### Frontend Commands

**File**: `php/Blocks.php`

Add to `php/Blocks.php` class:

```php
/**
 * Enqueue frontend commands (optional).
 */
public function enqueue_frontend_commands() {
    if ( ! is_user_logged_in() || ! function_exists( 'wp_enqueue_command_palette_assets' ) ) {
        return;
    }

    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    // Enqueue WordPress command palette assets (WordPress 6.9+).
    wp_enqueue_command_palette_assets();

    // Enqueue our frontend commands script.
    $deps = require Functions::get_plugin_dir( 'build/gb-extras-commands-frontend.asset.php' );
    wp_enqueue_script(
        'gb-extras-commands-frontend',
        Functions::get_plugin_url( 'build/gb-extras-commands-frontend.js' ),
        $deps['dependencies'],
        $deps['version'],
        true
    );

    // Needed to clear up some potential conflicts with other plugins.
    wp_add_inline_style(
        'wp-commands',
        '.commands-command-menu__container .has-icon:not(.components-button) {
            width: inherit;
            height: inherit;
        }'
    );
}

// In init() method, add:
add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_commands' ) );
```
```

## Plugin Registration Pattern

Each main command file will follow different patterns based on context:

### Block Editor Commands Pattern

```javascript
import { registerPlugin } from '@wordpress/plugins';
import { useToggleContainerOutlinesCommand } from './components/commands/ToggleContainerOutlines';
import { useTransformV1ToV2Command } from './components/commands/TransformV1ToV2';
// ... other imports

const CommandsBlockEditor = () => {
    useToggleContainerOutlinesCommand();
    useTransformV1ToV2Command();
    // ... other command hooks
    
    return null; // Commands don't render anything
};

registerPlugin( 'dlxgb-commands-block-editor', {
    render: CommandsBlockEditor,
} );
```

### Admin-Wide Commands Pattern

**Important**: Admin-wide commands require both `registerPlugin` (for block editor) and `createRoot` (for admin area).

```javascript
import { useCommand } from '@wordpress/commands';
import { createRoot } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useNavigateToSettingsCommand } from './components/commands/NavigateToSettings';
import { useNavigateToPatternsCommand } from './components/commands/NavigateToPatterns';
// ... other imports

// Shared function to register all commands.
const registerCommands = () => {
    useNavigateToSettingsCommand();
    useNavigateToPatternsCommand();
    // ... other command hooks
};

// Works in the block editor.
registerPlugin( 'dlxgb-commands-admin', {
    render: () => {
        registerCommands();
        return null;
    },
} );

// Works in the admin area (non-block editor).
const CommandsAdmin = () => {
    registerCommands();
    return null;
};

// Attach to admin footer div.
const rootElement = document.getElementById( 'gb-extras-commands-admin' );
if ( rootElement ) {
    const root = createRoot( rootElement );
    root.render( <CommandsAdmin /> );
}
```

### Frontend Commands Pattern

```javascript
import { registerPlugin } from '@wordpress/plugins';
// ... imports for frontend-specific commands

const CommandsFrontend = () => {
    // Frontend-specific commands will go here.
    // Currently placeholder for future use.
    
    return null;
};

registerPlugin( 'dlxgb-commands-frontend', {
    render: CommandsFrontend,
} );
```

## Benefits of This Structure

1. **Modularity**: Each command is a separate, reusable component
2. **Maintainability**: Easier to find and update specific commands
3. **Selective Loading**: Commands can be loaded only where needed
4. **Testability**: Individual commands can be tested in isolation
5. **Extensibility**: Easy to add new commands without touching existing code
6. **Context Separation**: Clear separation between block editor, admin, and frontend commands

## Notes

- All commands currently use `context: 'block-editor'`. We may need to adjust contexts based on WordPress Commands API capabilities.
- The `SaveSVGToAssetLibraryModal` is currently a placeholder and may need implementation later.
- Global state (`globalShowContainerOutlines`) will need to be managed carefully across contexts.
- The `addOutlineClasses` HOC filter registration should remain in the block editor commands file since it's editor-specific.
- **Critical**: Block editor commands MUST use `enqueue_block_editor_assets` hook, NOT `enqueue_block_assets`.
- **Critical**: Admin-wide commands require both `registerPlugin` (for block editor) and `createRoot` (for admin area).
- Frontend commands require `wp_enqueue_command_palette_assets()` function (WordPress 6.9+).
- The command palette acts more as a site search when enabled on the frontend.

