# Update Static Content - Strapi v4

<p align="center">Update your statically generated site with github actions (more coming on the way).</p>

---

<p align="center" width="100%">
  <img alt="strapi plugin update static content logo" src="https://raw.githubusercontent.com/everythinginjs/strapi-plugin-update-static-content/main/public/logo/strapi-plugin-update-static-content.png"/>
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
- Trigger multiple workflows
- Config Page
- Downloading Logs
- Roles to access the plugin
- Strapi Permissions in v1.0.7

## Installation

```bash
  yarn add strapi-plugin-update-static-content
  OR
  npm i strapi-plugin-update-static-content
```

## Plugin Configuration

1. Create a JWT BASE64 secret key
   > For example with :  `openssl rand -base64 32`

2. Add the key in the .env

3. Add plugin configs inside `strapiProject/config/plugins.js`

```javascript
module.exports = ({ env }) => ({
  'update-static-content': {
    enabled: true,
    config: {
      JWT_SECRET: env('JWT_SECRET'),
    },
  },
});
```

NOTE: add `roles` property (roles: ['strapi-super-admin', 'strapi-editor', 'strapi-author']) if you are using the plugin **lesser than v1.0.7** since above that version it is handled by Strapi Permissions.

4. Create a file in the root of your project `.github/workflows/deploy.yml` like below. In this example we are using fing cloud

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


5. Create a GitHub Personal Access Token on Github : [https://github.com/settings/tokens](https://github.com/settings/tokens)
   > See more on the [Github Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

6. Then, you can add the workflow in the plugin settings from the admin panel, save and you'll be able to trigger your workflows from strapi.

## Usage 

1. Add the workflow in the plugin's settings `admin/settings/update-static-content`
2. Trigger a build in the plugin page

## Roadmap

- Cancel workflow manually.
- Better documentation.

## Special Thanks

[Reza from Fing](https://github.com/r6m)
