import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Color = {
  color: string;
};

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }: Color) => <MaterialIcons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Évènements',
          tabBarLabel: 'Évènements',
          tabBarIcon: ({ color }: Color) => <MaterialIcons name="event" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }: Color) => (
            <MaterialIcons name="account-circle" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }: Color) => <MaterialIcons name="map" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="showcase"
        options={{
          title: 'Showcase',
          tabBarLabel: 'Showcase',
          tabBarIcon: ({ color }: Color) => <MaterialIcons name="code" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
