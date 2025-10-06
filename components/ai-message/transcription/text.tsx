import { StyleSheet, Text } from "react-native";

interface TranscriptionTextProps {
  children: React.ReactNode;
}

export const TranscriptionText = ({ children }: TranscriptionTextProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 30,
    fontFamily: "Roboto_600SemiBold",
    color: "#ffffff",
  },
});
