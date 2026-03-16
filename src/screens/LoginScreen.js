import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
const [user, setUser] = useState("");
const [pass, setPass] = useState("");
const { signIn } = useAuth();

const logoScale = useRef(new Animated.Value(1)).current;

useEffect(() => {
    const animation = Animated.loop(
    Animated.sequence([
        Animated.timing(logoScale, {
        toValue: 1.08,
        duration: 800,
        useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        }),
    ]),
    );

    animation.start();
    return () => animation.stop();
  }, [logoScale]);

  function handleLogin() {
    if (!user.trim() || !pass.trim()) {
      Alert.alert("Atenção", "Informe usuário e senha.");
      return;
    }

    signIn(user.trim(), pass);
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#061A40", "#0C2A5F", "#183A85"]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.header}>
            <Animated.Image
              source={require("../../assets/images/react-logo.png")}
              style={[styles.logo, { transform: [{ scale: logoScale }] }]}
              resizeMode="contain"
            />
            <Text style={styles.title}>Catálogo</Text>
            <Text style={styles.subtitle}>Entre e descubra os produtos</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#999"
              value={user}
              onChangeText={setUser}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={pass}
              onChangeText={setPass}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a192f",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  logo: {
    width: 88,
    height: 88,
    marginBottom: 16,
    tintColor: "#61dafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginTop: 6,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  form: {
    padding: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  button: {
    backgroundColor: "#61dafb",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#0a192f",
    fontWeight: "700",
    fontSize: 16,
  },
});
