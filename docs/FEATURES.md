# Features

GenerateBlocks Extras settings: **GenerateBlocks → Extras**.

## Free vs Pro

| Capability | GenerateBlocks (free) | GenerateBlocks Pro |
| --- | --- | --- |
| Settings screen, Adobe fonts, markdown, styles post types, auto-regen, v1/v2 tools, commands, Pattern Inserter | Yes | Yes |
| Hide GenerateBlocks admin-bar items | Soft (no-op if Pro menu absent) | Yes |
| Replace Overlay Panels admin-bar menu with full GenerateBlocks menu | — | Yes |

## Settings

### Adobe Fonts

- **Option:** `enableAdobeFonts` (default `true`)
- Adds Adobe Fonts (and Blocksy Adobe fonts when available) to `generateblocks_typography_font_family_list`.

### Block settings

| Option | Default | Behavior |
| --- | --- | --- |
| `enableV1Transformations` | `false` | Enables command-palette and contextual “Convert v1 Blocks to v2” tools |
| `enableV1Blocks` | `false` | Keeps both v1 and v2 blocks visible; custom category labels and name suffixes |
| `v1CategoryLabel` / `v2CategoryLabel` | GenerateBlocks v1 / v2 | Inserter category titles when v1 blocks enabled |
| `v1BlockSuffix` / `v2BlockSuffix` | `(v1)` / `(v2)` | Appended to block titles when dual blocks are enabled |
| `enableFrontendCommandPalette` | `false` | Loads command palette assets on the frontend for administrators (WordPress 6.9+) |

### Markdown to Text block

- **Option:** `enableMarkdownToHeadlineBlock` (default `false`)
- When enabled, markdown heading prefixes create GenerateBlocks Text blocks instead of core Heading blocks.

### Post type styles

- **Option:** `enabledPostTypes` (default: `post` and `page` true)
- Controls which post types are included via `generateblocks_do_content` so GenerateBlocks styles apply.

### Auto-regenerate styles on save

- **Option:** `autoRegenerateStylesPostTypes` (default empty)
- On `save_post` for selected types, clears `generateblocks_dynamic_css_posts` so CSS regenerates on the next load. Skips autosaves and revisions.

### Admin menu bar (Pro-oriented)

- **Options:** `adminMenuBar.enabled` (default `true`), `adminMenuBar.replaceWithFullMenu` (default `false`)
- When disabled: removes GenerateBlocks admin-bar nodes for Administrators and Editors.
- When replace is enabled: swaps the Overlay Panels root for a fuller menu (Settings, Local Patterns, Global Styles, Overlay Panels, Forms, Conditions, Editor Access, Asset Library, Extras — items appear when the corresponding Pro features exist).

## Always-on editor tools

Block overflow menu items (`PluginBlockSettingsMenuItem` in `src/index.js`):

| Label | When it appears |
| --- | --- |
| Wrap in Container | One or more blocks selected |
| Generate New Unique IDs | GenerateBlocks v1 or v2 block selected |
| Clear Block Styles | GenerateBlocks v2 block selected |
| Unwrap Container / Unwrap Grid | Container or Element with inner blocks |
| Transform Shape to Link | Shape block selected |
| Convert v1 Blocks to v2 | Single selection containing v1 blocks; requires `enableV1Transformations` |

Also registered:

- Transform **core/group → generateblocks/element**
- Transform **generateblocks/shape → generateblocks/text** (link-style icon text)
- Optional markdown prefix transforms when markdown setting is on

## Pattern Inserter

- Block: `dlxplugins/gbhx-pattern-inserter`
- Paste pattern markup, sideload remote images via REST `POST dlxplugins/gb-extras/v1/process_image`, regenerate unique IDs.

## Command palette

See [COMMANDS.md](COMMANDS.md) for IDs and contexts.
