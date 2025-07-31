import React, { useRef, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import useMarkerStore from "@/store/marker.state";

import Trophy from "@/components/Marker/Trophy";
import globalStyle from "@/styles/global.style";

type Props = {
    playerId?: number;
};

export default function Team({ playerId = 0, }: Props) {
    const player = useMarkerStore((state) => state.getPlayer(playerId));
    const setPlayerName = useMarkerStore((state) => state.setPlayerName);

    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState(player?.name ?? "");
    const lastTap = useRef(0);

    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            setText(player?.name ?? "");
            setModalVisible(true);
        }
        lastTap.current = now;
    };

    const handleSave = () => {
        setPlayerName(playerId, text.trim() || player?.name || "jogador");
        setModalVisible(false);
    };

    return (
        <View style={styles.teamContainer}>
            <TouchableOpacity onPress={handleDoubleTap}>
                <Text
                    style={[globalStyle.primaryText, styles.teamText]}
                    numberOfLines={1}
                >
                    {player?.name ?? "jogador"}
                </Text>
            </TouchableOpacity>

            <Trophy trophies={player?.trophies ?? 0} />

            {/* Modal de edição*/}

            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitulo}>Editar nome</Text>
                        <TextInput
                            value={text}
                            onChangeText={setText}
                            style={styles.input}
                            placeholder="Digite o nome do time"
                            placeholderTextColor={"#FFFFFF"}
                        />

                        <View style={styles.modalActions}>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </Pressable>
                            <Pressable onPress={handleSave}>
                                <Text style={styles.confirmText}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    teamContainer: {
        width: "100%",
    },

    teamText: {
        fontSize: 48,
        lineHeight: 72,
        textAlign: "center",
        justifyContent: "flex-end",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "#000000aa",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#021829",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    modalTitulo: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    input: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 8,
        fontSize: 16,
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: "row",
        gap: 24,
    },
    cancelText: {
        fontSize: 16,
        color: "gray",
    },
    confirmText: {
        fontSize: 16,
        color: "#1F4F91",
        fontWeight: "bold",
    },
});
