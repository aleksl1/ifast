import { constants } from "@/constants/constants";
import { Tabs } from "expo-router";
import { IconButton } from "react-native-paper";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: constants.tabBarHeight },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <IconButton icon="clock-fast" size={constants.tabBarIconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: () => (
            <IconButton icon="playlist-edit" size={constants.tabBarIconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <IconButton
              icon="account-settings"
              size={constants.tabBarIconSize}
            />
          ),
        }}
      />
    </Tabs>
  );
}
