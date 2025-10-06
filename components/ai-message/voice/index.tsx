import { useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  FadeInDown,
  FadeOutDown,
  SharedValue,
  useAnimatedReaction,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { PlayButton } from "./button";
import { Candle } from "./candle";

const LOOP = [0.5, 0.6, 0.8, 0.65, 0.65, 0.65, 0.65, 0.3, 0.45, 0.55];
const CANDLES = [0.1, 0.1, 0.1, ...LOOP, ...LOOP, ...LOOP, ...LOOP, ...LOOP];

interface VoiceProps {
  progress: SharedValue<number>;
  isPlaying: boolean;
  onPause?: () => void;
  onPlay?: () => void;
}

export const Voice = ({ progress, isPlaying, onPause, onPlay }: VoiceProps) => {
  const list = useRef<FlatList>(null);

  const scroll = (index: number) => {
    if (index > CANDLES.length - 1) return;
    list.current?.scrollToIndex({
      animated: true,
      index,
    });
  };

  useAnimatedReaction(
    () => progress.value,
    () => scheduleOnRN(scroll, Math.round(progress.value))
  );

  const toggle = () => {
    if (!isPlaying) {
      const to = CANDLES.length;
      progress.value = withTiming(
        to,
        {
          duration: (to - progress.value) * 1000,
        },
        (finished) => {
          if (!finished) return;
          progress.value = withSpring(0);
        }
      );
      onPlay?.();
    } else {
      cancelAnimation(progress);
      onPause?.();
    }
  };

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={styles.container}
    >
      <PlayButton isPlaying={isPlaying} onPress={toggle} />

      <FlatList
        ref={list}
        style={styles.peaksContainer}
        contentContainerStyle={styles.peaks}
        horizontal
        data={CANDLES}
        renderItem={({ index, item: value }) => (
          <Candle index={index} progress={progress} value={value} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.time}>00:53</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  peaksContainer: { flex: 1 },
  peaks: { gap: 2, alignItems: "center" },
  time: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Roboto_500Medium",
    color: "#ffffff",
  },
});
