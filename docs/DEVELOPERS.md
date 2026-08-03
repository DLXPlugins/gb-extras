# Developer documentation

## Directory map

```
gb-extras/
├── gb-extras.php       # Bootstrap
├── php/                # Admin, Admin_Bar, Blocks, Functions, Options
├── src/
│   ├── index.js        # Editor plugins / transforms
│   ├── js/blocks/      # Commands, pattern-importer, labels, utils
│   ├── js/react/       # Settings React app
│   └── scss/           # Admin styles
├── build/              # Editor + commands webpack output
├── dist/               # Admin JS/CSS webpack output
├── lib/                # Composer autoloader (vendor-dir)
├── webpack.config.js   # Dual config → build/ and dist/
└── Gruntfile.js        # Release ZIP
```

## Build

```bash
npm install
npm run start    # development watch
npm run build    # production
grunt            # optional zip
```

[webpack.config.js](../webpack.config.js) exports two configs:

1. **Default `@wordpress/scripts` config** → `build/`
   - `index` ← `src/index.js`
   - `gb-extras-block-labels`
   - `gb-extras-commands-block-editor`
   - `gb-extras-commands-admin`
   - `gb-extras-commands-frontend`
2. **Custom admin config** → `dist/`
   - `gb-extras-admin` ← `src/js/react/views/main/index.js`
   - `gb-extras-admin-css` ← `src/scss/admin.scss`

Enqueue mapping:

- `php/Admin.php` → `dist/gb-extras-admin.js` + `dist/gb-extras-admin-css.css`
- `php/Blocks.php` → `build/index.js`, labels, and command bundles

PHP classes autoload via Composer PSR-4: `DLXPlugins\GBExtras\` → `php/` (`composer.json`, generated files under `lib/`).

## Options schema

Stored under option key **`dlx_gb_extras_options`** (site option on multisite). Defaults from `Options::get_defaults()`:

| Key | Type | Default |
| --- | --- | --- |
| `enableAdobeFonts` | bool | `true` |
| `enableMarkdownToHeadlineBlock` | bool | `false` |
| `enabledPostTypes` | object | `{ post: true, page: true }` |
| `autoRegenerateStylesPostTypes` | object | `{}` |
| `allowedGoogleFonts` | array | `[]` (unused in UI) |
| `enableV1Transformations` | bool | `false` |
| `enableV1Blocks` | bool | `false` |
| `v1CategoryLabel` | string | `GenerateBlocks v1` |
| `v2CategoryLabel` | string | `GenerateBlocks v2` |
| `v1BlockSuffix` | string | `(v1)` |
| `v2BlockSuffix` | string | `(v2)` |
| `adminMenuBar.enabled` | bool | `true` |
| `adminMenuBar.replaceWithFullMenu` | bool | `false` |
| `enableFrontendCommandPalette` | bool | `false` |

## Extension points

### Exposed by this plugin

| Hook | Type | When |
| --- | --- | --- |
| `gb_extras_loaded` | action | After Admin / Admin_Bar / Blocks boot |

There is no broader intentional public PHP/JS API. Treat other identifiers as internal.

### Consumed (GenerateBlocks / WordPress)

Examples: `generateblocks_typography_font_family_list`, `generateblocks_do_content`, `generateblocks_dashboard_screens`, `block_categories_all`, `block_type_metadata`, `blocks.registerBlockType`, admin-bar APIs, GenerateBlocks CSS regenerate REST.

## AJAX

All require `manage_options` and matching nonces.

| Action | Purpose |
| --- | --- |
| `dlx_gb_extras_get_options` | Load options for the settings React app |
| `dlx_gb_extras_save_options` | Persist settings form |
| `dlx_gb_extras_reset_options` | Reset to defaults |

## REST

Namespace: `dlxplugins/gb-extras/v1`

| Route | Method | Purpose |
| --- | --- | --- |
| `/process_image` | POST | Sideload a remote image for Pattern Inserter |
| `/get_asset_icon_groups` | GET | Asset icon groups helper |

Permission callbacks require appropriate upload / edit capabilities (see `Blocks::rest_image_sideload_permissions`).

## Localized script globals

| Global | Script | Contents |
| --- | --- | --- |
| `dlxGBExtrasAdmin` | Admin settings | Nonces, `ajaxurl`, post type list, `isProActive` |
| `gbExtrasPatternInserter` | Editor / pattern tools | Options flags, REST URL/nonce, v1/v2 suffix strings |

## Coding standards

- PHP: [phpcs.xml.dist](../phpcs.xml.dist) (WordPress). Prefer phpcbf after edits.
- JS: [.eslintrc.json](../.eslintrc.json) (`@wordpress/eslint-plugin`).
- Text domain: `gb-extras`.

## Related docs

- [FEATURES.md](FEATURES.md)
- [COMMANDS.md](COMMANDS.md)
- [../AGENTS.md](../AGENTS.md)
- [../CONTRIBUTING.md](../CONTRIBUTING.md)
