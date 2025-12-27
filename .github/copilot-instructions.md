# `web-ui` Copilot Instructions
This repository (`web-ui`) is a part of DigiGoat. “DigiGoat” is a collection of repositories that work together for a common use. For more information about the role of each repository, see **DigiGoat Structure**. Once you have identified the relevant repos, be sure to state them in your response. If you are unsure, ask.

Once you have determined the relevant repos, if you need to search the remote index or access a different repo than the current via the GitHub MCP, use **Versioning Model** to determine which branch you should be searching for files on.

When generating ANY content, be sure to adhere to the structure described in **Syntax and Structure**.


## DigiGoat Structure
DigiGoat is a web design product made specifically for ADGA registered dairy goat farms.

- This `web-ui` repo is the website template.
	- It is compiled and deployed as an Angular web app.
	- It loads farm/site data from JSON files during compilation and at runtime (page load).
- The `client-app` repo is the desktop app used to manage a farm’s website content.
	- It updates JSON/config assets and manages *forked* website repos (forks of `web-ui`).
	- It does **not** directly modify this upstream `web-ui` repo.
- Forks of `web-ui` use Firebase for hosting, and build/deploy through GitHub Actions.
- The `DigiGoat.app` repo contains user-facing documentation for the overall product and is hosted at `https://digigoat.app/`.


## Versioning Model
### IMPORTANT: ONLY CONSIDER THIS WHEN USING THE GITHUB MCP TO DOWNLOAD OTHER REPOSITORIES
All repositories have a strict versioning pipeline.

- Branches: `main`, `beta`, `development`
	- `development` is where changes are committed.
	- A PR is then opened to merge `development` into `main`.
	- Only `development` may merge into `beta` (with a `-beta.x` suffix).
	- Only `beta` may merge into `main`.
- `web-ui` and `client-app` MUST have the same major version, they SHOULD have the same minor version, and patch versions are INDEPENDENT.

I do not expect you, or want you, to update version numbers. This exists so that when you are searching for files in other repos, you do so on the correct branch (typically `development`).


## Syntax and Structure
This repository uses Angular.

- Prefer Angular patterns over native DOM/JS patterns.
	- Prefer services, components, directives, and pipes over manual DOM manipulation.
	- Prefer Angular forms + validation patterns over custom JS validation.
- When linking within the Angular app, use `routerLink="..."` (or `[routerLink]`) instead of `href="..."`, UNLESS the link is using an attribute to another part of the current url, in which case angular fragements do not work so you MUST use an href, but keep in mind that a `base` tag is present so you must also include the relative page url before the hash. You may also use `href` when you are intentionally linking to an external website.
- If code can be generated via the Angular CLI (components, services, modules, etc.), use the Angular CLI.

### Style and conventions
- Follow the existing code style.
	- Single quotes for strings.
	- Semicolons at the end of statements.
	- Two spaces for indentation.
- When generating HTML, generate custom CSS as minimally as possible.
	- If styling is necessary, prefer Bootstrap utility classes.

### Data model and JSON
`web-ui` is designed to be driven by JSON content/config produced by the `client-app`.

- Do not hardcode farm-specific content into the upstream template.
- Prefer adding/adjusting typed interfaces/models and shared mapping helpers (when present) rather than sprinkling JSON parsing throughout components.
- Be careful about backward compatibility when reading JSON: if a property may not exist, treat it as optional and provide sane defaults.

### Build / lint / tests
If you wish to verify changes locally, prefer the existing repo scripts (usually `yarn build` / `yarn lint`). Do NOT use VSCode tasks, these are only for debugging sessions.

- This repo does enforce testing, you can run tests with `yarn test`. When generating tests, use `jest` NOT `karma`.
- Avoid large, brittle snapshot tests for UI-heavy components unless the repo already uses them.


## Accessing the DigiGoat Space
If you need more product-level context about DigiGoat (how `client-app` and `web-ui` interact, JSON structure expectations, release workflow), you can use the GitHub MCP to download the Copilot space named **"DigiGoat"** owned by the DigiGoat organization.
