import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { Pressable, StyleSheet, Text,  Modal, View, TouchableOpacity } from "react-native";
import useMarkerStore from "@/store/marker.state";

import globalStyle from "@/styles/global.style";

type Props = {
  text?: string;
  type?: "points" | "trophies";
};

export default function ResetButton({ text = "ZERAR PONTOS", type = "points" }: Props) {
  const resetPoints = useMarkerStore((state) => state.resetPoints);
  const resetTrophies = useMarkerStore((state) => state.resetTrophies);

   const [modalVisible, setModalVisible] = useState(false);

  const handleReset = () => {
    if (type === "points") resetPoints();
    else resetTrophies();
    setModalVisible(false);
  };

  return (
    <>
    <Pressable onPress={() => setModalVisible(true)}>

      <LinearGradient
        colors={["#A3E5FF", "#FFECC6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.buttonContainer}
      >
        <Text
          style={[globalStyle.primaryText, styles.buttonText]} >
          {text}{'\u00A0'}
        </Text>
      </LinearGradient>
    </Pressable>

    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTexTitulo}>{type === "points" ? "Zerar os pontos" : "Zerar as partidas"}</Text>
          <Text style={styles.modalText}>
            Tem certeza que deseja {type === "points" ? "zerar os pontos" : "zerar as partidas"}?
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>  
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
     color: "#1F4F91",
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
    width: "100%",
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
  modalText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalTexTitulo: {
     color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cancelText: {
    fontSize: 16,
    color: "gray",
  },
  confirmText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});
