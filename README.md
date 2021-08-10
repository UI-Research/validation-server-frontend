# validation-server-frontend

To run, you need the [forumone-cli library](https://github.com/forumone/forumone-cli#usage) installed. If not already installed, run:
```
npm install -g forumone-cli
```

The app requires an API token from the validation server to work. Once you have it, do:
```
cp services/app/.env.example services/app/.env
```
Then paste your token as the value for `NEXT_PUBLIC_API_TOKEN` in `services/app/.env`.

To initialize and run the app:

1. `f1 build`
2. `f1 up`

The app will available on port 3000: http://localhost:3000/

To stop the app, run `f1 down`. There are most likely docker-cli alternatives we can use here, but forumone-cli simplifies what we need to run.