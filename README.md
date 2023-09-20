# Home0001 - Fall 2023

[Next.js](https://nextjs.org) and [Sanity Studio](https://www.sanity.io/studio)
monorepo. Intended for deployment to [Vercel](https://vercel.com).

## Local development

Rename the `.env.example` file to `.env` and store the environment variables
that Next and Sanity will use to pull data from the Sanity API. You can get or
create the Sanity tokens, ids, and secrets from
[manage.sanity.io](https://manage.sanity.io).

Once those env variables are ready, you can run the following commands to get
Next's development server up and running:

```bash
# install dependencies
yarn install
cd studio && yarn install

# run requisite generate and clean steps
# before running all apps simultaneously
yarn run dev

# run next.js only
yarn run dev:sanity

# run sanity studio only
yarn run dev:sanity
```

The Next.js app will be running at `http://localhost:3000` and the Sanity Studio
CMS at `http://localhost:3333`.

### Installing and updating Sanity Studio dependencies

Updating Sanity Studio dependencies and installing new ones requires running the
respective Sanity CLI commands from the `studio` subdirectory:

```bash
# first cd into the studio subdirectory from the root project folder
cd studio

# use @sanity/cli command to upgrade dependencies
yarn sanity upgrade ...

# or to install new dependencies
yarn sanity install ...
```
