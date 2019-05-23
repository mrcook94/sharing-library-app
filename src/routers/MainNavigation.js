import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import SplashScreen from "screens/splash/SplashScreen";
import LoginScreen from 'screens/AuthStack/LoginScreen'
import RegisterScreen from 'screens/AuthStack/RegisterScreen'
import HomeScreen from 'screens/TabHome/index'
import ProfileScreen from 'screens/TabProfile/index'
import NotificationScreen from 'screens/TabNotification/index'
import DetailProfileScreen from 'screens/TabProfile/DetailProfileScreen'
import CategoryScreen from 'screens/CategoryScreen/CategoryScreen'
import BookByCategoryScreen from 'screens/Book/BookByCategoryScreen'
import DetailBookScreen from 'screens/Book/DetailBookScreen'
import AllBookScreen from 'screens/Book/AllBookScreen'
import AddBookScreen from 'screens/AddBookScreen'
import QRCodeScreen from 'screens/QRCode'
import RequestHistoryScreen from 'screens/RequestHitory'
import OnlineBookScreen from 'screens/TabOnlineBook'
import ISBNScanner from 'screens/TabOnlineBook/ISBNScanner'

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
    [screenNames.ONLINE_BOOK_TAB]: OnlineBookScreen,
    [screenNames.NOTIFICATION_SCREEN]: NotificationScreen,
    [screenNames.PROFILE_SCREEN]: ProfileScreen,
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
    [screenNames.CATEGORY_SCREEN]: CategoryScreen,
    [screenNames.BOOK_BY_CATEGORY_SCREEN]: BookByCategoryScreen,
    [screenNames.DETAIL_BOOK_SCREEN]: DetailBookScreen,
    [screenNames.ALL_BOOK_SCREEN]: AllBookScreen,
    [screenNames.ADD_BOOK_SCREEN]: AddBookScreen,
    [screenNames.QR_CODE_SCREEN]: QRCodeScreen,
    [screenNames.REQUEST_HISTORY_SCREEN]: RequestHistoryScreen,
    [screenNames.ISBN_SCANNER]: ISBNScanner,
},
    {
        headerMode: 'none'
    }
)
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
