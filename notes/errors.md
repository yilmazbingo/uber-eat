- Tried to register two view with the same name.

If you read the instructions it tells you that once you have installed react-navigation you should then install react-native-gesture-handler. However that is not what they say

Next, install react-native-gesture-handler. If you’re using Expo you don’t need to do anything here, it’s included in the SDK.

It says that if you are using Expo you do not need to install react-native-gesture-handler as it is already installed.

You are getting errors because you have installed react-native-gesture-handler, it already exists in Expo, and Expo is getting confused about where to get its information from.
