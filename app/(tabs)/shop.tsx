import { ScrollView, View } from "react-native";
import { useMemo, useState } from "react";

import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants/colors";

import {
  ShopHeader,
  ProductCategories,
  ProductCard,
} from "@/features/shop/components";

import {
  getProducts,
  getProductCategories,
} from "@/features/shop/repositories/shop.repository";

import { ProductCategory } from "@/types/database";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopScreen() {
  const products = getProducts();

  const categories = getProductCategories();

  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <StatusBar hidden />

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingBottom: 140,
            }}
          >
            <ShopHeader />

            <ProductCategories
              categories={categories}
              activeCategory={activeCategory}
              onChangeCategory={setActiveCategory}
            />

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",

                paddingHorizontal: 20,

                marginTop: 24,

                gap: 12,
              }}
            >
              {filteredProducts.map((product) => (
                <View
                  key={product.id}
                  style={{
                    width: "48%",
                  }}
                >
                  <ProductCard product={product} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
