import { createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from "screens/splash/SplashScreen";
import LoginScreen from 'screens/AuthStack/LoginScreen'
import RegisterScreen from 'screens/AuthStack/RegisterScreen'

import * as screenNames from 'libraries/utils/screenNames'

const authStack = createStackNavigator({
    [screenNames.LOGIN_SCREEN]: LoginScreen,
    [screenNames.REGISTER_SCREEN]: RegisterScreen,
},
    {
        headerMode: 'none'
    }
)

const mainStack = createStackNavigator({
    [screenNames.SPLASH_SCREEN]: { screen: SplashScreen },
    [screenNames.AUTH_STACK]: authStack,
},
    {
        headerMode: 'none'
    }
)
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
