import { StyleSheet } from "react-native";
import Animated, {
    SharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

const CANDLE_MAX_HEIGHT = 30;

interface CandleProps {
  index: number;
  progress: SharedValue<number>;
  value: number;
}

export const Candle = ({ index, progress, value }: CandleProps) => {
  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: withSpring(
      !!progress.value && progress.value >= index ? "#ffffff" : "#252525"
    ),
  }));

  return (
    <Animated.View
      style={[
        styles.candle,
        animatedStyles,
        { height: value * CANDLE_MAX_HEIGHT },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  candle: {
    borderRadius: 2,
    width: 2,
  },
});
