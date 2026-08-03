# AGENTS.md — GenerateBlocks Extras

Handoff notes for AI agents and fork maintainers. Prefer this file plus `docs/DEVELOPERS.md` over outdated plan docs.

## Mission

Companion plugin for GenerateBlocks. Enhance the editor, settings, styles pipeline, and (with Pro) admin bar — without commercial licensing, EDD updaters, or external marketing/docs links.

## Stack

| Layer | Details |
| --- | --- |
| PHP | Namespace `DLXPlugins\GBExtras`, PSR-4 via Composer autoload (`lib/` → `php/`) |
| Bootstrap | `gb-extras.php` loads Admin, Admin_Bar, Blocks; fires `gb_extras_loaded` |
| Admin UI | React (`src/js/react/views/main/`) → webpack **`dist/`** (`gb-extras-admin.js` + CSS) |
| Editor | `src/index.js`, pattern importer, block labels → webpack **`build/`** |
| Commands | Three entrypoints under `src/js/blocks/commands/` → `build/gb-extras-commands-*.js` |

Do not confuse **`build/`** (editor/commands) with **`dist/`** (settings admin). `php/Admin.php` enqueues `dist/`; `php/Blocks.php` enqueues `build/`.

## Key files

| Path | Role |
| --- | --- |
| `gb-extras.php` | Plugin header, bootstrap, `gb_extras_loaded` |
| `php/Admin.php` | Settings submenu, AJAX get/save/reset, admin assets |
| `php/Options.php` | Option key + defaults |
| `php/Blocks.php` | Fonts, styles post types, REST, script enqueue, CSS regen |
| `php/Admin_Bar.php` | Pro admin-bar hide / full menu (priority 101) |
| `php/Functions.php` | Helpers (URLs, sanitization, capability checks) |
| `src/js/react/views/main/main.js` | Settings panels |
| `src/index.js` | Block overflow menu plugins + transforms + markdown |
| `src/js/blocks/commands/` | Command palette registrations |
| `webpack.config.js` | Dual webpack configs |

## Stable identifiers (do not rename casually)

- Options option: `dlx_gb_extras_options`
- Admin page slug: `dlx-gb-extras` (screen: `generateblocks_page_dlx-gb-extras`)
- AJAX actions: `dlx_gb_extras_{get,save,reset}_options`
- REST namespace: `dlxplugins/gb-extras/v1`
- Block name: `dlxplugins/gbhx-pattern-inserter`
- Localized globals: `dlxGBExtrasAdmin`, `gbExtrasPatternInserter`
- Text domain: `gb-extras`

Renaming any of these needs a migration plan (saved options, content with the pattern block, enqueue handles).

## Conventions

- WordPress PHP and JS coding standards.
- Run phpcbf (WordPress standard) after PHP edits.
- Rebuild with `npm run build` after JS/SCSS changes.
- Periods at the end of code comments.
- Prefer matching existing patterns in Admin settings UI (PanelBody + PanelRow, GenerateBlocks dashboard shell).

## Do not

- Reintroduce EDD / commercial license UI, updater phone-home, or product IDs.
- Add Docs / Plugin Home / DLX marketing links on the Plugins screen or README.
- Commit `.npmrc` or Font Awesome registry tokens (`.npmrc` is gitignored).
- Assume `menus.md` or `2.5.md` exist — they are gitignored and not part of the repo.
- Treat root historical plan files as source of truth; use `docs/` instead.

## Verify before finishing a change

1. `npm run build` succeeds.
2. PHP syntax / phpcs on touched PHP files.
3. Settings screen: load, save, reset.
4. If commands changed: open command palette (Ctrl/Cmd+K) in the block editor and confirm IDs still register.
5. If admin-bar changed: test with GenerateBlocks Pro active (and inactive for soft-fail paths).

## Known debt (document; do not drive-by “fix” in unrelated PRs)

- Font Awesome Pro (`@fortawesome/pro-duotone-svg-icons`) + private registry — blocks clean public `npm install`.
- `.gitignore` ignores `dist/` and `package-lock.json` while runtime may need built `dist/` assets.
- Dead / incomplete: `allowedGoogleFonts` option, unused `SaveSVGToAssetLibraryModal.js`, `enableDefaultHeadlineBlock` referenced in UI without a default in `Options.php`.
- Misnamed leftovers: `wppic_block_file_extensions` filter in `Functions.php`; occasional wrong text domains (`alerts-dlx`, `dlx-gb-extras`).
- License wording: header GPL v2+, `package.json` GPL-3.0, `LICENSE` GPLv3.

## Useful docs

- [docs/FEATURES.md](docs/FEATURES.md)
- [docs/DEVELOPERS.md](docs/DEVELOPERS.md)
- [docs/COMMANDS.md](docs/COMMANDS.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
