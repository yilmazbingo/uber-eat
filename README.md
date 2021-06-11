## Start the app

`npm run start`

## Expor project Link

https://expo.io/@yilmazito/restaurant

### Environent Variables

- Google Api key

  `firebase functions:config:set google.key="api-key-here"`

- Check your env variables
  `firebase functions:config:get`

- Right now env variables are stored in the memory. To make it available in functions project inside "functions" directory:

  `firebase functions:config:get > .runtimeconfig.json`

  This will write your firebase related env variables into "runtimeconfig.json" file. Make sure add it to ".gitignore". Now when you start your projects, firebase will read that file and populate the env variables from that file.
