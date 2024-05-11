import { Tabs } from "expo-router";
import { IconButton } from "react-native-paper";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <IconButton icon="clock-fast" size={48} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: () => <IconButton icon="playlist-edit" size={48} />,
        }}
      />
    </Tabs>
  );
}
