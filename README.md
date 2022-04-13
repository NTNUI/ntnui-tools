# ntnui-tools

An npm package with a collection of useful tools for using NTNUI API.

## Installation

```sh
npm i ntnui-tools
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
