# Contributing

Feel free to submit issues, pull requests, and fork the repository.

## Development

To develop the package, clone the project and install the cloned repository as a dependency in **your own project**, or install the package directly to your project from a GitHub branch or fork.

Remember to rebuild the package after making changes by using `npm run build` in the package directory, as projects will only utilize the compiled `.js` and `.d.ts` files of the package.

### Clone and develop locally

```bash
git clone https://github.com/NTNUI/ntnui-tools
cd ntnui-tools && npm install
cd my-project
npm i local/path/to/ntnui-tools
```

### Development from GitHub

You can `npm install` directly from GitHub if you have your own branch, commit and/or fork of the package.

```bash
cd my-project

## Branch
npm i https://github.com/NTNUI/ntnui-tools#branch

## Fork or commit
npm i https://github.com/username/ntnui-tools#commit
```

## Set API URL

The default API URL is `https://api.ntnui.no`. You can change it by setting `NTNUI_TOOLS_API_URL` as an environment variable.

ntnui-tools supports using [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables from a `.env` file.

```sh
# .env in your project
NTNUI_TOOLS_API_URL = 'https://dev.api.ntnui.no'
```
