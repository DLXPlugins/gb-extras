# Refresh CSS Files Command - Implementation Plan

## Overview
A command that refreshes GenerateBlocks CSS files when the CSS Print Method is set to "external file". The command should be available in both admin and frontend contexts, show a loading modal during execution, and require no confirmation.

## Command Details

### Command Name
- **Internal**: `dlx-gb-extras-refresh-css-files`
- **Label**: `GenerateBlocks: Refresh Global Styles`
- **Context**: Both `admin` and `block-editor` (frontend via admin context)

### Behavior
1. **No Confirmation**: Command executes immediately when clicked
2. **Loading Modal**: Displays a loading modal while the Ajax request is in progress
3. **Conditional Execution**: Only works if CSS Print Method is set to "external file" (`css_print_method === 'file'`)
4. **Success/Error Handling**: Shows appropriate feedback after completion

## Technical Implementation

### Files to Create/Modify

#### 1. Command Component
**File**: `src/js/blocks/commands/components/commands/RefreshCSSFiles.js`

**Structure**:
- Uses `useCommand` hook from `@wordpress/commands`
- Uses `useState` to manage loading state
- Uses `apiFetch` from `@wordpress/api-fetch` for REST API calls
- Checks CSS Print Method setting before execution
- Shows loading modal during execution
- Returns modal component

**Key Features**:
- Check if `css_print_method === 'file'` before executing
- If not external file, show message or disable command
- Call REST endpoint: `/generateblocks/v1/regenerate_css_files` with POST method
- Display loading modal during request
- Show success/error message after completion

#### 2. Loading Modal Component
**File**: `src/js/blocks/commands/components/modals/RefreshCSSFilesModal.js`

**Structure**:
- Simple modal with spinner and loading message
- Non-dismissible during loading (or dismissible but shows loading state)
- Shows "Refreshing CSS files..." message
- Auto-closes on success

#### 3. Registration Files
**Files to Modify**:
- `src/js/blocks/commands/commands-admin.js` - Add command registration
- `src/js/blocks/commands/commands-frontend.js` - Add command registration (if needed)

**Note**: Since frontend commands can use admin context, we may only need to register in `commands-admin.js`.

### REST API Endpoint

**Endpoint**: `/generateblocks/v1/regenerate_css_files`
**Method**: `POST`
**Permission**: Requires `manage_options` capability (handled by GenerateBlocks)
**Response**: 
```json
{
  "success": true,
  "response": "CSS files regenerated."
}
```

### CSS Print Method Check

**Option**: `generateblocks` option array
**Key**: `css_print_method`
**Value**: `'file'` for external file method

**How to Check**:
- Option 1: Make REST call to get current settings
- Option 2: Use localized script data (if available)
- Option 3: Check after command execution and show appropriate message

**Recommended**: Check via REST API or show message if regeneration fails due to wrong method.

### Loading Modal Design

**Components Needed**:
- `Modal` from `@wordpress/components`
- `Spinner` from `@wordpress/components`
- Loading message: "Refreshing CSS files..."

**Behavior**:
- Opens immediately when command is executed
- Shows spinner and loading text
- Closes automatically on success
- Shows error message on failure (can be in modal or snackbar)

### Error Handling

**Scenarios**:
1. CSS Print Method is not "external file" - Show informative message
2. REST API fails - Show error message
3. User doesn't have permissions - REST API will handle this

**Implementation**:
- Try/catch around apiFetch call
- Check response.success
- Display appropriate message in modal or close modal and show snackbar

## Implementation Steps

1. **Create Loading Modal Component**
   - Create `RefreshCSSFilesModal.js` in `components/modals/`
   - Simple modal with spinner and message
   - Props: `isOpen`, `onClose`, `isLoading`, `message`, `error`

2. **Create Command Component**
   - Create `RefreshCSSFiles.js` in `components/commands/`
   - Implement `useCommand` hook
   - Add state management for loading state
   - Implement REST API call using `apiFetch`
   - Handle success/error states
   - Return modal component

3. **Register Command in Admin**
   - Modify `commands-admin.js`
   - Import and use `useRefreshCSSFilesCommand` hook
   - Ensure it works in both block editor and admin contexts

4. **Register Command in Frontend (if needed)**
   - Modify `commands-frontend.js` if frontend-specific registration is needed
   - Or rely on admin context registration

5. **Test Implementation**
   - Test with CSS Print Method set to "external file"
   - Test with CSS Print Method set to other values
   - Test error scenarios
   - Test in both admin and frontend contexts

## Code Structure Example

### RefreshCSSFiles.js (Command)
```javascript
import { useState } from 'react';
import { useCommand } from '@wordpress/commands';
import { apiFetch } from '@wordpress/api-fetch';
import RefreshCSSFilesModal from '../modals/RefreshCSSFilesModal';
import GBIcon from '../icons/GBIcon';

export function useRefreshCSSFilesCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useCommand({
    name: 'dlx-gb-extras-refresh-css-files',
    label: 'GenerateBlocks: Refresh Global Styles',
    icon: <GBIcon width="16" height="16" />,
    callback: () => {
      setIsOpen(true);
      setIsLoading(true);
      setError(false);
      setMessage('');

      apiFetch({
        path: '/generateblocks/v1/regenerate_css_files',
        method: 'POST',
      })
        .then((result) => {
          setIsLoading(false);
          if (result.success) {
            setMessage(result.response || 'CSS files regenerated successfully.');
            setTimeout(() => {
              setIsOpen(false);
            }, 2000);
          } else {
            setError(true);
            setMessage(result.response || 'Failed to regenerate CSS files.');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          setMessage(err.message || 'An error occurred while regenerating CSS files.');
        });
    },
    context: 'admin', // Works in both admin and block editor
  });

  return (
    <RefreshCSSFilesModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isLoading={isLoading}
      message={message}
      error={error}
    />
  );
}
```

### RefreshCSSFilesModal.js (Modal)
```javascript
import { Modal, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const RefreshCSSFilesModal = ({ isOpen, onClose, isLoading, message, error }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isDismissible={!isLoading}
      shouldCloseOnClickOutside={false}
      shouldCloseOnEsc={!isLoading}
      onRequestClose={onClose}
      title={__('Refresh Global Styles', 'dlx-gb-extras')}
    >
      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Spinner />
          <p>{__('Refreshing CSS files...', 'dlx-gb-extras')}</p>
        </div>
      )}
      {!isLoading && message && (
        <p style={{ color: error ? '#d63638' : '#00a32a' }}>
          {message}
        </p>
      )}
    </Modal>
  );
};

export default RefreshCSSFilesModal;
```

## Notes

- The command should check CSS Print Method, but GenerateBlocks REST API will handle the actual regeneration logic
- If CSS Print Method is not "external file", the regeneration may not have the expected effect, but the API call will still succeed
- Consider adding a check before execution to warn users if CSS Print Method is not set to "external file"
- The modal can be simple since there's no confirmation needed - it's primarily for showing loading state
- Success message can auto-close after 2-3 seconds
- Error messages should remain visible until user dismisses

## Future Enhancements

- Add check for CSS Print Method before execution and show warning if not set to "external file"
- Add option to check CSS Print Method via REST API before showing command
- Consider adding to block editor context as well if needed
- Add snackbar notification in addition to modal for less intrusive feedback

