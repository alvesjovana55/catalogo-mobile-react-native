import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import api from "./services/api";

function ProductImage({ uri, style }) {
  const [error, setError] = useState(false);

  if (!uri || error) {
    return (
      <View style={[style, styles.imagePlaceholder]}>
        <Text style={styles.imagePlaceholderText}>👕</Text>
      </View>
    );
  }

  return (
    <Image
      source={typeof uri === "number" ? uri : { uri }}
      style={style}
      onError={() => setError(true)}
      resizeMode="contain"
    />
  );
}

export default function ProductDetailScreen({ route }) {
  const { productId, product: productFromRoute } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLocalProduct = !!productFromRoute;

  const finalPrice = product
    ? product.price * (1 - (product.discountPercentage ?? 0) / 100)
    : 0;

  useEffect(() => {
    if (isLocalProduct) {
      setProduct(productFromRoute);
      setLoading(false);
      return;
    }

    api
      .get(`/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar detalhes", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId, isLocalProduct, productFromRoute]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>
          Erro ao carregar detalhes do produto.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProductImage uri={product.thumbnail} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Preço original:</Text>
          <Text style={styles.value}>R$ {product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Desconto:</Text>
          <Text style={styles.value}>{product.discountPercentage ?? 0}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Preço com desconto:</Text>
          <Text style={styles.value}>R$ {finalPrice.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  imagePlaceholder: {
    backgroundColor: "rgba(0,0,0,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "700",
  },
  value: {
    color: "#333",
  },
  errorText: {
    color: "red",
  },
});
