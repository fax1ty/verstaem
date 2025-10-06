import { StyleSheet } from "react-native";
import Animated, {
  LayoutAnimationConfig,
  LinearTransition,
} from "react-native-reanimated";
import { TranscribeButton } from "./button";
import { GenerationProgress } from "./progress";
import Transcription from "./transcription";
import { Voice } from "./voice";

interface BodyProps {
  children: React.ReactNode;
}

const Body = ({ children }: BodyProps) => {
  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View style={styles.body} layout={LinearTransition}>
        {children}
      </Animated.View>
    </LayoutAnimationConfig>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000000",
    borderRadius: 40,
    padding: 24,
    overflow: "hidden",
  },
});

export default Object.assign(Body, {
  Voice,
  Transcription,
  TranscribeButton,
  GenerationProgress,
});
