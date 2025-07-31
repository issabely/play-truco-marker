import {  ImageBackground, StyleSheet, View } from "react-native";

import Logo from "@/components/General/Logo";
import Marker from "@/components/Marker/Marker";
import TrucoButton from "@/components/Marker/TrucoButton";
import ResetButton from "@/components/Marker/ResetButton";

export default function Index() {
  const backgroundUri = require("@/assets/images/backgrounds/default-background.png");
  const topLeftCards = require("@/assets/images/cards/top-left-cards.png");
  const bottomRightCards = require("@/assets/images/cards/bottom-right-cards.png");

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={backgroundUri}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <ImageBackground
        source={topLeftCards}
        style={styles.topLeftCards}
      />

      <ImageBackground
        source={bottomRightCards}
        style={styles.bottomRightCards}
      />

      <Logo />

      <View style={styles.markersContainer}>
        <Marker playerId={0}/>
        <Marker playerId={1} side="right"/>
      </View>

      <View style={styles.actionsButtonsContainer}>
        <TrucoButton />
        <View style={styles.resetButtonsContainer}>
          <ResetButton />
          <ResetButton text="ZERAR PARTIDAS" type="trophies" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },

  topLeftCards: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 120,
    zIndex: 0,
  },

  bottomRightCards: {
    position: "absolute",
    bottom: -90,
    right: 0,
    width: 80,
    height: 160,
    zIndex: 0,
  },

  markersContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  actionsButtonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 32,
  },

  resetButtonsContainer: {
    flexDirection: "row",
    gap: 24,
  },
});
