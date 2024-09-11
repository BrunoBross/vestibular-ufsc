import { ActivityIndicator, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

interface LoadingProps {
  color?: string;
  size?: number;
}

interface LoadingContainerProps extends ViewProps {
  loading?: LoadingProps;
}

function Loading(props: LoadingProps) {
  const { color, size } = props;

  return <ActivityIndicator color={color || colors.black} size={size || 30} />;
}

function LoadingContainer(props: LoadingContainerProps) {
  const { loading, className, ...rest } = props;

  return (
    <View
      className={twMerge(
        "items-center justify-center w-full h-full",
        className
      )}
      {...rest}
    >
      <Loading {...loading} />
    </View>
  );
}

export { Loading, LoadingContainer };
