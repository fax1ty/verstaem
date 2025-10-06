import PauseFill from "@/assets/icons/pause-fill.svg";
import PlayFill from "@/assets/icons/play-fill.svg";
import { StyleSheet } from "react-native";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PlayButtonProps extends PressableProps {
  isPlaying: boolean;
}

export const PlayButton = ({
  onPressIn,
  onPressOut,
  style,
  isPlaying,
  ...props
}: PlayButtonProps) => {
  const pressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withSpring(pressed.value ? 0.5 : 1),
    transform: [{ scale: withSpring(pressed.value ? 1.1 : 1) }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, animatedStyles, style]}
      onPressIn={(event) => {
        pressed.value = true;
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        pressed.value = false;
        onPressOut?.(event);
      }}
      {...props}
    >
      {!isPlaying ? (
        <PlayFill style={styles.buttonIcon} />
      ) : (
        <PauseFill style={styles.buttonIcon} />
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 40 / 2,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: { color: "#ffffff", width: 18, height: 18 },
});
