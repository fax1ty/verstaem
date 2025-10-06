import AIMessage from "@/components/ai-message";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { FlatList, Pressable } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  FadeInDown,
  FadeOutDown,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ANIMATION = [
  <AIMessage.Transcription.Text key="part-1">
    {"Today's meeting revolved around balance between pace and precision."}
  </AIMessage.Transcription.Text>,
  <AIMessage.Transcription.Text key="part-2">
    {"\nDaniel emphasized the budget allocation "}
  </AIMessage.Transcription.Text>,
  <AIMessage.Transcription.Impact key="part-3">
    exceeded by 20%
  </AIMessage.Transcription.Impact>,
  <AIMessage.Transcription.Text key="part-4">
    {", largely due to "}
  </AIMessage.Transcription.Text>,
  <AIMessage.Transcription.Attention key="part-5">
    reliance on contractors efforts
  </AIMessage.Transcription.Attention>,
  <AIMessage.Transcription.Text key="part-6">
    {
      "\nMark pointed out that the project was moving too slowly with repeated checks consuming valuable..."
    }
  </AIMessage.Transcription.Text>,
];

export default function Index() {
  const [isTranscriptionAvailable, setIsTranscriptionAvailable] =
    useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [animationProgress, setAnimationProgress] = useState(0);
  const slice = ANIMATION.slice(0, animationProgress + 1);

  const voiceProgress = useSharedValue(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollView = useRef<FlatList>(null);

  const generate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setIsTranscriptionAvailable(true);
    }, 4500);
  };

  const replay = () => {
    setAnimationProgress(0);
    setIsTranscriptionAvailable(false);
    setIsPlaying(false);
    cancelAnimation(voiceProgress);
    voiceProgress.value = withSpring(0);
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isTranscriptionAvailable) return;
    if (animationProgress === ANIMATION.length - 1) return;

    const timeout = setTimeout(() => {
      setAnimationProgress((v) => v + 1);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isTranscriptionAvailable, animationProgress]);

  useEffect(() => {
    setTimeout(() => {
      scrollView.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [animationProgress]);

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="light" />

      <AIMessage>
        {!isGenerating && (
          <AIMessage.Voice
            progress={voiceProgress}
            isPlaying={isPlaying}
            onPause={pause}
            onPlay={play}
          />
        )}

        {!!isGenerating && !isTranscriptionAvailable && (
          <AIMessage.GenerationProgress>
            20% more feature rollouts and customer-requested improvements than
            originally planned. The early release of the employee self-service
            portal and the payroll automation module directly boosted adoption
            rates. The reliance poses risks for knowledge continuity , long-term
            support , and scalability, and has been identified as an area
            requiring closer management.
          </AIMessage.GenerationProgress>
        )}

        {!!isTranscriptionAvailable && (
          <AIMessage.Transcription ref={scrollView}>
            {slice}
          </AIMessage.Transcription>
        )}

        {!isGenerating && !isTranscriptionAvailable && (
          <AIMessage.TranscribeButton onPress={generate} />
        )}
      </AIMessage>

      {!!isTranscriptionAvailable && (
        <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
          <Pressable onPress={replay} hitSlop={8}>
            <Text style={styles.replay}>Replay</Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#222228",
    gap: 24,
  },
  replay: {
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto_500Medium",
    color: "#ffffff",
  },
});
