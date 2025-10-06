import Loader from "@/assets/icons/loader.svg";
import MaskedView from "@react-native-masked-view/masked-view";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Shimmer, ShimmerProvider } from "react-native-fast-shimmer";
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface GenerationProgressProps {
  children: React.ReactNode;
}

const Spinner = () => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: rotation.value + "deg",
      },
    ],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1
    );
    return () => cancelAnimation(rotation);
  }, [rotation]);

  return (
    <Animated.View style={animatedStyles}>
      <Loader style={styles.titleLoader} />
    </Animated.View>
  );
};

export const GenerationProgress = ({ children }: GenerationProgressProps) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.title}
        entering={FadeInDown}
        exiting={FadeOutDown}
      >
        <Spinner />

        <Text style={[styles.text, styles.titleText]}>
          Generating results...
        </Text>
      </Animated.View>

      <ShimmerProvider duration={3000}>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <MaskedView maskElement={<Text style={styles.text}>{children}</Text>}>
            <View>
              <Text style={styles.text}>{children}</Text>
              <Shimmer
                style={styles.shimmer}
                linearGradients={["#ffffff", "#26222244", "#ffffff"]}
                gradientStart={{ x: 0, y: 0.3 }}
                gradientEnd={{ x: 1, y: 0.7 }}
              />
            </View>
          </MaskedView>
        </Animated.View>
      </ShimmerProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 22 },
  title: { flexDirection: "row", gap: 16, alignItems: "center" },
  titleLoader: {
    width: 16,
    height: 16,
    color: "#626262",
  },
  titleText: { color: "#626262" },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto_500Medium",
    color: "#ffffff",
  },
  shimmer: { width: "100%", height: "100%", position: "absolute" },
});
