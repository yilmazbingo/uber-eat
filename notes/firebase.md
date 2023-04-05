```js
sudo npm install -g firebase-tools
npm install firebase-functions@latest firebase-admin@latest --save
firebase login
firebase init functions
```

- we are going to install dependenceies ourselves
- /functions/package.json update "engine" version
- "/functions/ npm install

**NOTE** Do Not Start the functions from any other folder. IT WONT WORK. cd functions

- "serve" script would host functions locally in dev environment.
- `npm run serve`
  ## Error

inside /functions `npm run serve` gave me tons of error. solution add this to tsconfig.json inside "functions/tsconfig.json".

" "typeRoots": ["node_modules/@types"]"

## Deploy firebase functions

in "functions" npm run deploy
