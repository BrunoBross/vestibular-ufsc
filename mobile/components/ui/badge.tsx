import { Text, View, ViewProps } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "px-2 py-1 rounded-md",
  variants: {
    type: {
      info: "bg-blue-200/60",
      warning: "bg-orange-200/60",
      danger: "bg-red-200/60",
      success: "bg-green-200/60",
    },
  },
});

const badgeTextVariants = tv({
  base: "text-xs font-medium",
  variants: {
    type: {
      info: "text-blue-600",
      warning: "text-orange-600",
      danger: "text-red-600",
      success: "text-green-600",
    },
  },
});

interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {
  text: string;
}

export function Badge(props: BadgeProps) {
  const { text, type = "info", ...rest } = props;

  return (
    <View className={badgeVariants({ type })} {...rest}>
      <Text className={badgeTextVariants({ type })}>{text}</Text>
    </View>
  );
}
