import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface TranscriptionImpactProps {
  children: React.ReactNode;
}

export const TranscriptionImpact = ({ children }: TranscriptionImpactProps) => {
  return (
    <View style={styles.impact}>
      <Text style={styles.text}>{children}</Text>

      <Animated.View
        style={styles.label}
        entering={FadeIn.delay(400).duration(600)}
      >
        <Text style={styles.labelText}>Great impact</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  impact: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "rgba(68, 171, 95, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(68, 171, 95, 1)",
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto_700Bold",
    color: "#18CF48",
  },
  label: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#13AF35",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    transform: [
      { translateY: "-100%" },
      { translateY: -2 },
      { translateX: "100%" },
      { translateX: 2 },
    ],
  },
  labelText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto_600SemiBold",
    color: "#ffffff",
  },
});
