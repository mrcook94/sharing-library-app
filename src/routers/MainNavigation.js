import { createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from "screens/splash/SplashScreen";

const mainStack = createStackNavigator({
    SplashScreen: { screen: SplashScreen },

},
    {
        headerMode: 'none'
    }
)
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
