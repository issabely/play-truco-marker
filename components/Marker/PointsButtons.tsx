import useMarkerStore from "@/store/marker.state";
import useTentoStore from "@/store/tento.state";
import globalStyle from "@/styles/global.style";
import { ImageBackground, ImageSource } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    playerID?: number;
    side?: "left" | "right";
    onPress?: () => void;
};

export default function PointsButtons({ playerID = 0, side = "left", onPress }: Props) {
    const backgroundImage = require("@/assets/images/buttons/diamond-button.svg") as ImageSource;

    const updatePlayerPoints = useMarkerStore((state) => state.updatePlayerPoints);
    const TentoTracker = useTentoStore((state) => state.TentoTracker);
    const getTento = useTentoStore((state) => state.getTento);
    const resetTracker = useTentoStore((state) => state.resetTracker);

    const [buttonText, setButtonText] = useState(`+${getTento()}`);

    const updatePoints = (value: number) => {
        updatePlayerPoints(playerID, value);
    }

    useEffect(() => {
        setButtonText(`+${getTento()}`);
    }, [TentoTracker]);

    return (
        <View style={styles.buttonsContainer}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.diamondButtonImage}
                >
                    <View style={styles.increasePointsTextContainer}>
                        <Text style={[globalStyle.primaryText, styles.increasePointsButtonText]}>{buttonText}</Text>
                    </View>
                </ImageBackground>
            </View>

            <Pressable
                onPress={onPress ?? (() => { updatePoints(getTento()); resetTracker() })}
                style={styles.increasePointsButtonCollider}
            >
            </Pressable>
            <Pressable
                onPress={onPress ?? (() => { updatePoints(-1) })}
                style={side === "left" ? styles.decreasePointsButtonLeft : styles.decreasePointsButtonRight}
            >
                <Text
                    style={[globalStyle.secondaryText, styles.decreasePointsButtonText]}
                >-1</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        width: "100%",
        height: 180,
        position: "relative"
    },

    imageContainer: {
        width: 150,
        height: 160,
    },

    diamondButtonImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },

    increasePointsTextContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        marginEnd: 10,
    },

    increasePointsButtonText: {
        fontSize: 64,
        lineHeight: 64,
        width: "100%",
        textAlign: "center",
    },

    increasePointsButtonCollider: {
        position: "absolute",
        width: "65%",
        height: "56%",
        top: "15%",
        left: "18%",
        transform: [{ rotate: "-45deg" }],
        zIndex: 100,
    },

    decreasePointsButtonLeft: {
        position: "absolute",
        bottom: -5,
        left: -6,
        backgroundColor: "#021829",
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 50,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomWidth: 4,
        borderBottomColor: "#ED3150",
    },

    decreasePointsButtonRight: {
        position: "absolute",
        bottom: -5,
        right: -6,
        backgroundColor: "#021829",
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 50,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomWidth: 4,
        borderBottomColor: "#ED3150",
    },

    decreasePointsButtonText: {
        fontSize: 32,
        fontWeight: "600",
        marginTop: 4,
        marginRight: 4,
    },
});
