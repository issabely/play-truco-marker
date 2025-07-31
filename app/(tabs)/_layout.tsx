import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#021829",
          height: 90,
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          display: "none",
        },
        headerTitleStyle: {
          fontFamily: "MontserratAlternates",
          fontSize: 24,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Truco Paulista",
        }}
      />
    </Tabs>
  );
}
