-yoga is a layout engine. it is flexible layout
-safeaRea view does not work in android.

## svg

- expo install react-native-svg

```js
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import star from "../../assets/start";

<SvgXml xml={star} width={20} height={20} />;
```

## Flat list

Flat list is a wrapper around <VirtualizedList>. It has inherent memory optimizations. It is going to do things out of the box that help you better relay infromation in.

Scroll view provides you scrollable interface. Scrollview renders all its children at once, but this has a performance downside. We use this if you have a fixed number of items. Flat list is used when you want to render items lazily.

## resolver

- npm i babel-plugin-module-resolver
  -in babel.config.js add to plugins

- hexadecimal number automatically gets converted to base 10 in console.
- v,r,s are cryptographic pieces of data that can be used to generate the sender’s account address. They are generated from the sender’s private key. Those are extremely complex pieces of data. This is a one way process. You cannot back calculate private key. With this v,r,s we verify if the transaction is legitimate or not.

- smart contract is a contract that created by code.
- Contract account has thsoe fileds
  - field= description
  - balance amount
  - storage=
  - code = raw machine code for this contract
- Contract accounts are only specific to one individual network and htye cannot be accessed across networks. We need to take all code and completely redeploy to othe accounts.
- our acual code does not get executed on the eteherum network inside the smart contracts. We are going to take that contract definition and feed it into a solidiy compiler. This compiler is going to spit out two separete files.
  first one is going to contian some byte code and this is the actual byte code that is going to be deployed to the ethereum network.
  second one is ABI. Application Binary interface. our javascript will interact with abi.

## react-native-webview

it works in android.

## add animation with Lottie

`expo install lottie-react-native`
