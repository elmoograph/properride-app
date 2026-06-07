import { Image, Text, View } from "react-native";

import { Product } from "@/types/database";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { radius } from "@/constants/radius";
import { typography } from "@/styles/typography";

import { formatCurrency } from "@/utils/formatCurrency";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: "#050505",

        borderRadius: radius.sm,

        overflow: "hidden",
      }}
    >
      <Image
        source={product.image}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 140,
        }}
      />

      <View
        style={{
          padding: spacing.md,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            ...typography.body.md,
            color: colors.textPrimary,
          }}
        >
          {product.name}
        </Text>

        <Text
          style={{
            ...typography.caption.md,
            color: colors.textSecondary,
          }}
        >
          {product.brand}
        </Text>

        <Text
          style={{
            ...typography.body.md,
            color: colors.primary,

            marginTop: spacing.xs,
          }}
        >
          {formatCurrency(product.price)}
        </Text>
      </View>
    </View>
  );
}
