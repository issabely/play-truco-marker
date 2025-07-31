import { StyleSheet, Text } from "react-native";
import useMarkerStore from "@/store/marker.state";

import globalStyle from "@/styles/global.style";

type Props = {
  playerID?: number;
};

export default function Points({ playerID = 0 }: Props) {
  const player = useMarkerStore((state) => state.getPlayer(playerID));

  return (
    <Text
      style={[globalStyle.primaryText, styles.pointsText]}
    >
      {player?.points ?? 0}
    </Text>
  );
}

const styles = StyleSheet.create({
  pointsText: {
    width: "100%",
    textAlign: "center",
    fontSize: 96,
    lineHeight: 96,
  },
});