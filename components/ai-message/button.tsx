import Stars from "@/assets/icons/stars.svg";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedGlow, {
  GlowEvent,
  PresetConfig,
} from "react-native-animated-glow";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const COLORS = [
  "#C018C6",
  "#723DBA",
  "#285F9D",
  "#285F9D",
  "#285F9D",
  "#167174",
  "#167174",
  "#018443",
];

const PRESET: PresetConfig = {
  states: [
    {
      name: "default",
      transition: 300,
      preset: {
        cornerRadius: 30,
        outlineWidth: 4,
        borderColor: COLORS,
        backgroundColor: "#000000",
        animationSpeed: 1.2,
        borderSpeedMultiplier: 1,
        glowLayers: [
          {
            glowPlacement: "over",
            colors: COLORS,
            glowSize: 10,
            opacity: 0.2,
            speedMultiplier: 1,
            coverage: 1,
            relativeOffset: 0,
          },
        ],
      },
    },
    {
      name: "press",
      transition: 300,
      preset: {
        cornerRadius: 30,
        outlineWidth: 4,
        borderColor: COLORS,
        backgroundColor: "#000000",
        animationSpeed: 1.2,
        borderSpeedMultiplier: 1,
        glowLayers: [
          {
            glowPlacement: "over",
            colors: COLORS,
            glowSize: 16,
            opacity: 0.4,
            speedMultiplier: 1.2,
            coverage: 1,
            relativeOffset: 0,
          },
        ],
      },
    },
  ],
};

export const TranscribeButton = ({
  onPressIn,
  onPressOut,
  ...props
}: Omit<PressableProps, "style">) => {
  const [glowState, setGlowState] = useState<GlowEvent>("default");

  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
      <AnimatedGlow
        preset={PRESET}
        activeState={glowState}
        style={styles.wrapper}
      >
        <Pressable
          onPressIn={(event) => {
            setGlowState("press");
            onPressIn?.(event);
          }}
          onPressOut={(event) => {
            setGlowState("default");
            onPressOut?.(event);
          }}
          {...props}
        >
          <View style={styles.button}>
            <Stars style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Transcribe</Text>
          </View>
        </Pressable>
      </AnimatedGlow>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 8 },
  button: {
    paddingVertical: 18,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 18,
  },
  buttonIcon: { color: "#ffffff", width: 18, height: 18 },
  buttonText: { color: "#ffffff", fontWeight: "bold" },
});
