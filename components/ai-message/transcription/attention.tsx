import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface TranscriptionAttentionProps {
  children: React.ReactNode;
}

export const TranscriptionAttention = ({
  children,
}: TranscriptionAttentionProps) => {
  return (
    <View style={styles.attention}>
      <Text style={styles.text}>{children}</Text>

      <Animated.View
        style={styles.label}
        entering={FadeIn.delay(400).duration(600)}
      >
        <Text style={styles.labelText}>Needs attention</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  attention: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "rgba(211, 125, 49, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(211, 125, 49, 1)",
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto_700Bold",
    color: "#E6730C",
  },
  label: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#E6700F",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    transform: [
      { translateY: "100%" },
      { translateY: 4 },
      { translateX: "80%" },
    ],
  },
  labelText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto_600SemiBold",
    color: "#ffffff",
  },
});
