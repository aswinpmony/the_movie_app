import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import MovieScreen from "./src/screens/MovieScreen";


const Stack=createStackNavigator()


export default ()=> {
  const [fontLoaded] = useFonts({
    Regular: require('./assets/fonts/static/NunitoSans_10pt-Regular.ttf'),
    Bold: require('./assets/fonts/static/NunitoSans_10pt-Bold.ttf'),
    Regular: require('./assets/fonts/static/NunitoSans_10pt-Regular.ttf'),
    Black: require('./assets/fonts/static/NunitoSans_10pt-Black.ttf'),
    ExtraBold: require('./assets/fonts/static/NunitoSans_10pt-ExtraBold.ttf'),
    ExtraLight: require('./assets/fonts/static/NunitoSans_10pt-ExtraLight.ttf'),
    Light: require('./assets/fonts/static/NunitoSans_10pt-Light.ttf'),
    SemiBold: require('./assets/fonts/static/NunitoSans_10pt-SemiBold.ttf'),

  });

  React.useEffect(() => {
    if (!fontLoaded) {
      // keep the splash screen visible while fonts are loading
      SplashScreen.preventAutoHideAsync();
    } else {
      // hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  return fontLoaded ?(
 <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
    <Stack.Screen name="movie" component={MovieScreen} options={{headerShown:false}}/>

  </Stack.Navigator>

 </NavigationContainer>
  ):null
}
