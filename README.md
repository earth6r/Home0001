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
yarn install:all

# run requisite generate and clean steps
# before running all apps simultaneously
yarn run dev

# run next.js only
yarn run dev:next

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

## Adding content process

### New unit

- Select "Units" from Content menu
- Select the new item icon
- Add fields
  - Be sure to link to property and select "Available" to show on site
  - All media can be added in two media sections
  - Have blocked out space for a new image field to be pulled from Sanity in the
    Next frontend for the Unit Summary component, this field would need to be
    added to Sanity studio ~ JLM 10/2/23
  - Inventory does not currently show on frontend, but refers to past design ~
    JLM 10/2/23
  - The content is in order of current site design ~ JLM 10/2/23
- Once content is added, publish the Unit and navigate to appropriate property
  in Properties list in Content menu.
- Add newly created Unit document to "Units" reference list
- Publish Property
- Once all new content updated/added and publish, navigate to "Deploy" on top of
  Sanity studio and select "Deploy" from production hook
