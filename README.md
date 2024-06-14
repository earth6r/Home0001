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

## Deploying

There are two databases for the Sanity account, "dev" and "production." If there
are changes to the database on dev, and those are tied to codebase changes on
the frontend, the dev database will need to be imported to production when
pushing the code. _Note there will be some downtime or site weirdness because of
this_ The steps to do so:

- Open pull request for code changes
- Make sure the dev database has all content updates and is exactly what should
  be reflected on the live site
- Export production database FIRST as a backup _DON'T SKIP THIS, THIS IS THE
  BACKUP IN CASE THINGS GO WRONG_ `npx sanity dataset export production`
- Export the dev database, from /studio: `npx sanity dataset export dev`
- Import the dev database into production, from /studio:
  `npx sanity dataset import --replace production [FILENAME OF EXPORTED DATABASE]`
  - This effectively replaces the production database with dev
- Push the codebase live through pull request

## Adding content process

### New object property

To add a new property to an object, like an image to an existing object, follow
the below example:

- Select the object to edit, like `studio/schemas/documents/unit.ts`
- To add an image, use the media object type
- Add a name, title (for the Sanity admin), and the type, in this case `media`
- Save the file and generate the Sanity schema using either
  `yarn generate:sanity` or just `yarn dev` which runs the generate script as
  well as dev server
- Add type definition to types.ts file for all References
- Add the new object property to the frontend, in this case in appropriate
  component in `src/components/unit/`

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

### Login

1. Check if the email already exists in the database (check-email-existence.ts)

Request:

```bash
curl -X POST http://localhost:3000/api/login/check-email-existence -H "Content-Type: application/json" -d '{"email":"testdafasdfasd@test.com"}'
```

Response:

```json
{
  "user": {
    "uid": "pombVtqijehdZs0XMaMFsq096I32",
    "email": "testdafasdfasd@test.com",
    "emailVerified": false,
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Tue, 04 Jun 2024 14:54:38 GMT",
      "creationTime": "Fri, 24 May 2024 22:50:19 GMT",
      "lastRefreshTime": "Tue, 04 Jun 2024 14:54:38 GMT"
    },
    "tokensValidAfterTime": "Fri, 24 May 2024 22:50:19 GMT",
    "providerData": [
      {
        "uid": "pombVtqijehdZs0XMaMFsq096I32",
        "email": "testdafasdfasd@test.com",
        "providerId": "password"
      }
    ]
  },
  "request_password": false, // if true, the user has to setup a password
  "code": "success" // different kinds of codes, please check check-email-existence.ts for details
}
```

2. Set up a password for the user (set-password.ts)

Request:

```bash
curl -X POST http://localhost:3000/api/login/set-password -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"password"}'
```

Response:

```json
{
  "user":{
    "uid":"kBx5fzoGbsdMj4DermDB5CRle7f1",
    "email":"test12341243@test.com",
    "emailVerified":false,
    "disabled":false,
    "metadata":{
      "lastSignInTime":null,
      "creationTime":"Wed, 05 Jun 2024 01:23:31 GMT",
      "lastRefreshTime":null
    },
    "tokensValidAfterTime":"Wed, 05 Jun 2024 01:23:31 GMT",
    "providerData":[
      {
        "uid":"test12341243@test.com",
        "email":"test12341243@test.com",
        "providerId":"password"
      }
    ]
  },
  "code":"success" // different kinds of codes, please check set-password.ts for details
```

3. Sign in (signin.ts)

Request:

```bash
curl -X POST http://localhost:3000/api/login/signin -H "Content-Type: application/json" -d '{"email":"test10@test.com","password":"password"}'
```

Response:

```json
{
   "user":{
      "user":{
         "uid":"S2FjegKDlKZ78AvEUF1toLo4znF3",
         "email":"test10@test.com",
         "emailVerified":false,
         "isAnonymous":false,
         "providerData":[
            {
               "providerId":"password",
               "uid":"test10@test.com",
               "displayName":null,
               "email":"test10@test.com",
               "phoneNumber":null,
               "photoURL":null
            }
         ],
         ...
   },
   "code":"success" // different kinds of codes, please check signin.ts for details
}
```

# Check for CORS (200 response means CORS is setup correctly)

curl -X OPTIONS
https://www.home0001.com/api/login/check-password-setup-for-email \
 -H "Access-Control-Request-Method: POST" \
 -H "Access-Control-Request-Headers: X-CSRF-Token, X-Requested-With, Accept,
Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
\
 -H "Origin: https://buy.home0001.com" \
 -I
