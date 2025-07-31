import { Image, type ImageSource } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import globalStyle from "@/styles/global.style";

type Props = {
  trophies: number;
};

export default function Trophy({ trophies = 0 }: Props) {
  const trophyIconUri =
    require("@/assets/images/icons/trophy.png") as ImageSource;

  return (
    <View style={styles.trophiesContainer}>
      <Text style={[globalStyle.primaryText, styles.trophiesText]}>{trophies}{'\u00A0'}</Text>
      <Image source={trophyIconUri} style={styles.trophiesIcon} />
    </View>);
}

const styles = StyleSheet.create({
  trophiesContainer: {
    marginTop: -8,
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  trophiesIcon: {
    width: 24,
    height: 24,
  },

  trophiesText: {
    fontSize: 24,
    lineHeight: 24,
  }
});
