import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/contexts/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
        <NavigationContainer>
        <RootNavigator />
        </NavigationContainer>
    </AuthProvider>
    </GestureHandlerRootView>
);
}
