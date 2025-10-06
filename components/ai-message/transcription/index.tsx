import { Ref } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { TranscriptionAttention } from "./attention";
import { TranscriptionImpact } from "./impact";
import { TranscriptionText } from "./text";

interface TranscriptionTextProps {
  children: React.ReactNode[];
  ref: Ref<FlatList>;
}

const TranscriptionScroll = ({ children, ref }: TranscriptionTextProps) => {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <Animated.FlatList
        ref={ref}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        data={children}
        renderItem={({ item }) => <>{item}</>}
      />

      <View style={[styles.dim, styles.dimTop]} />
      <View style={[styles.dim, styles.dimBottom]} />
    </Animated.View>
  );
};

export default Object.assign(TranscriptionScroll, {
  Impact: TranscriptionImpact,
  Attention: TranscriptionAttention,
  Text: TranscriptionText,
});

const styles = StyleSheet.create({
  container: { height: 134 },
  scroll: {
    paddingVertical: 30 / 2,
    flexDirection: "row",
    flexWrap: "wrap", // Looks like this is OK for New Arch 🚀, just ignore the warning
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dim: { position: "absolute", left: 0, right: 0, height: 30 },
  dimTop: {
    top: 0,
    experimental_backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
  },
  dimBottom: {
    bottom: 0,
    experimental_backgroundImage:
      "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
  },
});
