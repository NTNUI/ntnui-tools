# ntnui-tools

An npm package with a collection of tools for easier utilization of [NTNUI API](https://api.ntnui.no/).

## Installation

```sh
npm i ntnui-tools
```

The default API URL is `https://api.ntnui.no`. Change it by setting `NTNUI_TOOLS_API_URL` as an environment variable during development.

```sh
# .env in your project
NTNUI_TOOLS_API_URL = 'https://dev.api.ntnui.no'
```

## Example usage

```js
import { getNtnuiToken } from 'ntnui-tools'

// Log in using NTNUI membership system credentials
const tokens = await getNtnuiToken(phone_number, password)

// Use tokens to access the NTNUI API
const role = await getRoleInGroup(slug, tokens.access)
// => returns group role of the user, e.g. "board_member"
```

### Methods

```ts
function getNtnuiProfile(token: string): Promise<IUserProfileResponse>

function getRoleInGroup(
	group_slug: string,
	token: string
): Promise<string | null>

function getNtnuiToken(
	phone_number: string,
	password: string
): Promise<INtnuiTokens>

function isValidNtnuiToken(token: string): Promise<boolean>

function refreshNtnuiToken(token: string): Promise<INtnuiAccessToken>
```
