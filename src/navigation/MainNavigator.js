import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonHome from './../screens/PokemonHome';
import PokemonDetails from '../screens/PokemonDetails';
import {Text, TouchableOpacity} from 'react-native';
import OpenScreen from '../screens/OpenScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokemon"
        component={OpenScreen}
        options={() => ({
          headerTransparent: true,
          title: '',
          headerTintColor: '#fefefe',
          headerShadowVisible: false,
          headerBackVisible: false,
        })}
      />

      <Stack.Screen
        name="PokemonHome"
        component={PokemonHome}
        options={{
          headerTitle: 'Pokedex',
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetails}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Back</Text>
            </TouchableOpacity>
          ),
          headerTransparent: true,
          title: '',
          headerTintColor: '#fefefe',
          headerShadowVisible: false,
          headerBackVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
