import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";

import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductsScreen from "../screens/ProductsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProductsStack({ route }) {
const category = route.params?.category ?? "mens-shirts";
const title = route.params?.title ?? "Produtos";
const signOut = route.params?.signOut ?? (() => {});

return (
    <Stack.Navigator>
    <Stack.Screen
        name="Products"
        component={ProductsScreen}
        initialParams={{ category }}
        options={{
        title,
        headerRight: () => (
            <Ionicons
            name="log-out-outline"
            size={24}
            style={{ marginRight: 12 }}
            onPress={signOut}
            />
        ),
        }}
    />
    <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{ title: "Detalhes" }}
    />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, signOut } = useAuth();

  const tabScreens = useMemo(
    () => [
      // Masculino
      { name: "Men Shirt", category: "mens-shirts", icon: "shirt" },
      { name: "Men Shoes", category: "mens-shoes", icon: "footsteps" },
      { name: "Men Watches", category: "mens-watches", icon: "watch" },
      // Feminino
      { name: "Women Bags", category: "womens-bags", icon: "bag" },
      { name: "Women Dresses", category: "womens-dresses", icon: "woman" },
      {
        name: "Women Jewellery",
        category: "womens-jewellery",
        icon: "diamond",
      },
      { name: "Women Shoes", category: "womens-shoes", icon: "footsteps" },
      { name: "Women Watches", category: "womens-watches", icon: "watch" },
    ],
    [],
  );

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const tab = tabScreens.find((t) => t.name === route.name);
          return tab ? (
            <Ionicons name={tab.icon} size={size} color={color} />
          ) : null;
        },
      })}
    >
      {tabScreens.map(({ name, category }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={ProductsStack}
          initialParams={{ category, title: name, signOut }}
        />
      ))}
    </Tab.Navigator>
  );
}
