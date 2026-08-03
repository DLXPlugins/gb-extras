# Command palette

Commands register via `@wordpress/commands` `useCommand`. Source lives under `src/js/blocks/commands/`.

## Enqueue split

| Bundle | Entry | Context |
| --- | --- | --- |
| `build/gb-extras-commands-block-editor.js` | `commands-block-editor.js` | Block editor (`enqueue_block_editor_assets`) |
| `build/gb-extras-commands-admin.js` | `commands-admin.js` | wp-admin (and block editor via `registerPlugin`) |
| `build/gb-extras-commands-frontend.js` | `commands-frontend.js` | Frontend when `enableFrontendCommandPalette` is on (WP 6.9+) |

## Commands

| ID | Label | Context | Notes |
| --- | --- | --- | --- |
| `dlx-gb-extras-toggle-container-outlines` | GenerateBlocks: Toggle Container/Element Outlines | Block editor | Adds outline classes to containers/elements for layout debugging |
| `dlx-transform-v1-blocks-to-v2` | GenerateBlocks: Convert v1 Blocks to v2 (Experimental) | Block editor | Gated by `enableV1Transformations` |
| `dlx-transform-headings-to-gb-text` | GenerateBlocks: Convert Headings to Text Blocks | Block editor | Bulk-convert core headings |
| `dlx-transform-paragraphs-to-gb-text` | GenerateBlocks: Convert Paragraphs to Text Blocks | Block editor | Bulk-convert core paragraphs |
| `dlx-gb-extras-refresh-css-files` | GenerateBlocks: Generate CSS Files | Admin + frontend | Calls GenerateBlocks REST `generateblocks/v1/regenerate_css_files` |

## Implementation tips

- Block-editor commands that need modals return JSX from their hooks; `commands-block-editor.js` renders those modals from the registered plugin.
- Admin/frontend Refresh CSS uses a footer mount point (`#gb-extras-commands-admin` / frontend equivalent) plus `createRoot` when outside the block editor.
- Prefer searching the palette for “GenerateBlocks” when testing.
