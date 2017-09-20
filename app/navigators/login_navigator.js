import { StackNavigator } from "react-navigation";
import Login from "../routes/Login/Main";
import Confirmation from "../routes/Login/Confirmation";
import Icon from "react-native-vector-icons/Ionicons";

const LoginNav = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        headerLeft: null
      }
    },
    Confirmation: {
      screen: Confirmation,
      navigationOptions: {
        title: "Confirmation",
        tabBarLabel: "Confirmation",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? "ios-home" : "ios-home-outline"}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Login"
  }
);

export default LoginNav;
