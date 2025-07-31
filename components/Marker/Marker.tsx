import { StyleSheet, View } from 'react-native';

import Points from "@/components/Marker/Points";
import PointsButtons from "@/components/Marker/PointsButtons";
import Team from "@/components/Marker/Team";

type Props = {
    playerId?: number;
    side?: "left" | "right";
};


export default function Marker({ playerId = 1, side = 'left' }: Props) {
    return (
        <View style={styles.markerContainer}>
            <Team playerId={playerId} />
            <Points playerID={playerId} />
            <PointsButtons playerID={playerId} side={side} />
        </View>
    );
}

const styles = StyleSheet.create({
    markerContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: 150,
        width: "100%",
        gap: 16,
    },
});
