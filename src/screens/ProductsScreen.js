import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import api from "./services/api";

function ProductImage({ uri }) {
const [error, setError] = useState(false);

if (!uri || error) {
    return (
    <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
        <Text style={styles.thumbnailPlaceholderText}>👕</Text>
    </View>
    );
}

return (
    <Image
    source={typeof uri === "number" ? uri : { uri }}
    style={styles.thumbnail}
    onError={() => setError(true)}
    resizeMode="contain"
    />
);
}

const CORINTHIANS_ID = -999;

export default function ProductsScreen({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const category = route.params?.category ?? "mens-shirts";

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
    .get(`/products/category/${category}`)
    .then((response) => {
        const isMens = category === "mens-shirts";
        const corinthiansItem = {
        id: CORINTHIANS_ID,
        title: "Camiseta Corinthians",
        brand: "Timão",
        price: 199.9,
        discountPercentage: 40,
        thumbnail: isMens
            ? require("../../corinthians-shirt.jpg")
            : require("../../corinthians.jpg"),
        description:
            "Uma peça inspirada no manto sagrado do Corinthians, feita para acompanhar você em qualquer jogo.\n\nUse com orgulho e estilo, sem perder a leveza e a tradição do time.",
        };

        const apiProducts = response.data.products ?? [];
        const finalProducts =
        category === "mens-shirts" || category === "womens-dresses"
            ? [corinthiansItem, ...apiProducts]
            : apiProducts;

        setProducts(finalProducts);
    })
    .catch((err) => {
        console.error("Erro ao carregar produtos", err);
        setError(err);
    })
    .finally(() => {
        setLoading(false);
    });
  }, [category]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar produtos.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
            onPress={() => {
              if (item.id === CORINTHIANS_ID) {
                Alert.alert("Atenção", "Torcida detectada! Vai, Timão!");
              }

              navigation.navigate("ProductDetails", {
                productId: item.id,
                product: item.id === CORINTHIANS_ID ? item : undefined,
              });
            }}
          >
            <ProductImage uri={item.thumbnail} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.id === CORINTHIANS_ID ? (
                <Text style={styles.badge}>#VaiTimão ⚽</Text>
              ) : null}
              {item.discountPercentage ? (
                <Text style={styles.discount}>
                  {Math.round(item.discountPercentage)}% OFF
                </Text>
              ) : null}
              <Text style={styles.itemSubtitle}>{item.brand}</Text>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  thumbnailPlaceholder: {
    backgroundColor: "rgba(0,0,0,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailPlaceholderText: {
    fontSize: 24,
  },
  itemContent: {
    flex: 1,
  },
  itemPressed: {
    backgroundColor: "#f0f0f0",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    fontSize: 12,
    color: "#1a73e8",
    fontWeight: "700",
    marginTop: 4,
  },
  discount: {
    fontSize: 12,
    color: "#d62828",
    fontWeight: "700",
    marginTop: 4,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  itemPrice: {
    marginTop: 4,
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    padding: 16,
  },
});
