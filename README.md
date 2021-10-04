# validation-server-frontend

[Validation Server Whitepaper](https://www.urban.org/research/publication/privacy-preserving-validation-server-prototype)

The validation server front-end user interface is built on the React.js JavaScript library. The front-end interface facilitates user authentication, visual display, 
selection, refining, and release of data and privacy budgets via direct JavaScript calls to the API. 

To run, you need the [forumone-cli library](https://github.com/forumone/forumone-cli#usage) installed. If not already installed, run:

```bash
npm install -g forumone-cli
```

To initialize and run the app:

1. `f1 build`
2. `f1 up`

The app will available on port 3000: <http://localhost:3000/>

To stop the app, run `f1 down`. There are most likely docker-cli alternatives we can use here, but forumone-cli simplifies what we need to run.
