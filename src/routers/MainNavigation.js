import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import SplashScreen from "screens/splash/SplashScreen";
import LoginScreen from 'screens/AuthStack/LoginScreen'
import RegisterScreen from 'screens/AuthStack/RegisterScreen'
import HomeScreen from 'screens/TabHome/index'
import ProfileScreen from 'screens/TabProfile/index'
import NotificationScreen from 'screens/TabNotification/index'
import DetailProfileScreen from 'screens/TabProfile/DetailProfileScreen'

import * as screenNames from 'libraries/utils/screenNames'
import R from 'res/R'


const authStack = createStackNavigator({
    [screenNames.LOGIN_SCREEN]: LoginScreen,
    [screenNames.REGISTER_SCREEN]: RegisterScreen,
},
    {
        headerMode: 'none'
    }
)

const MainTab = createBottomTabNavigator({
    [screenNames.HOME_SCREEN]: HomeScreen,
    [screenNames.PROFILE_SCREEN]: ProfileScreen,
    [screenNames.NOTIFICATION_SCREEN]: NotificationScreen,
},
    {
        tabBarOptions: {
            activeTintColor: R.colors.primaryColor,
            labelStyle: {
                fontSize: R.size.textSize.tabTitle,
                marginBottom: 5,
            }
        }
    }
)

const mainStack = createStackNavigator({
    [screenNames.SPLASH_SCREEN]: { screen: SplashScreen },
    [screenNames.AUTH_STACK]: authStack,
    [screenNames.APP_TAB]: MainTab,
    [screenNames.DETAIL_PROFILE_SCREEN]: DetailProfileScreen,
},
    {
        headerMode: 'none'
    }
)
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
