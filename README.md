# Update Static Content - Strapi v4

<p align="center">Update your statically generated site with github actions (more coming on the way).</p>

---

<p align="center" width="100%">
  <img alt="strapi plugin update static content logo" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/logo/300x300.png"/>
</p>

## Plugin Previews

Plugin Settings

<p align="center" width="100%">
  <img alt="strapi plugin update static content configuration" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/previews/plugin-config.png"/>
</p>

Plugin Page

<p align="center" width="100%">
  <img alt="strapi plugin update static content plugin" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/previews/plugin-page.png"/>
</p>

---

## Features

- Workflow History
- Config Page
- Downloading Logs
- Roles to access the plugin

## Installation

```bash
  yarn add strapi-plugin-update-static-content
  OR
  npm i strapi-plugin-update-static-content
```

## Plugin Configuration

1. Add plugin configs inside `strapiProject/config/plugins.js`

```javascript
module.exports = ({ env }) => ({
  'update-static-content': {
    enabled: true,
    config: {
      githubToken: env('GITHUB_TOKEN'), // accessing personal github token from env file
      owner: 'everythinginjs', // owner of the repo
      repo: 'vahoora', // name of the repo
      workflowId: '40807041', // workflowId OR filename
      branch: 'main', // branch name
      roles: ['strapi-super-admin'], // roles to access the plugin, by omitting roles any user can access the plugin
    },
  },
});
```

2. Create a file in the root of your project `.github/workflows/deploy.yml` like below. In this example we are using fing cloud

```yml
name: Fing Deployment # a name for your workflow

on: # trigger on push event and main branch to the repo
  push:
    branches: [main]
  workflow_dispatch: # must be included in your .yml file for manually triggering event
defaults: # in case of monorepo project you can use `defauls` and choose the subfolder
  run:
    working-directory: ./gatsbyJS
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: install fing-cli and deploy
        env: # set the cloud provider token to the secrets on github and use it on run
          TOKEN: ${{ secrets.FING_TOKEN }}
        run: | # write your shell scripts for deploying or building based on your host provider
          npm install -g @fingcloud/cli
          fing --access-token "${TOKEN}" up --app vahoora-gatsby --dispatch
```

## Roadmap

- Cancel workflow manually.
- Better documentation.

## Special Thanks

[Reza from Fing](https://github.com/r6m)
