import { createDrawerNavigator } from '@react-navigation/drawer';
import BrowseToolsScreen from '../Screens/BrowseToolsScreen';
import MyToolsScreen from '../Screens/MyToolsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MessagesScreen from '../Screens/MessagesScreen';


const Drawer = createDrawerNavigator()

const AppNavigator:React.FC = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="BrowseTools" component={BrowseToolsScreen} options={{ title: '🔍 Browse Tools' }}/>
        <Drawer.Screen name="MyTools" component={MyToolsScreen} options={{ title: '🛠️ My Tools' }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: '👤 Profile' }}/>
        <Drawer.Screen name="Messages" component={MessagesScreen} options={{ title: '💬 Messages' }}/>
        </Drawer.Navigator>
  )
}

export default AppNavigator;
