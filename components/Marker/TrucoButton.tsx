import { Pressable, StyleSheet, Text } from "react-native";
import useTentoStore from "@/store/tento.state";

import globalStyle from "@/styles/global.style";
import { useEffect, useState } from "react";

const textMap: Record<number, string> = {
  1: "1 tento",
  3: "truuuco!",
  6: "seeis!",
  9: "noove!",
  12: "doooze!"
};

export default function TrucoButton() {
  const getNextTento = useTentoStore((state) => state.getNextTento);
  const updateTentoTracker = useTentoStore((state) => state.updateTentoTracker);
  const TentoTracker = useTentoStore((state) => state.TentoTracker);

  const getTentoText = () => {
    const nextTento = getNextTento();
    return textMap[nextTento] ?? "tento";
  };

  const [tentoText, setTentoText] = useState(getTentoText());

  useEffect(() => {
    setTentoText(getTentoText());
  }, [TentoTracker]);

  return (
    <Pressable style={styles.buttonContainer} onPress={updateTentoTracker}>
      <Text style={[globalStyle.primaryText, styles.buttonText]}>
        {tentoText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021829",
    borderRadius: 8,
    paddingVertical: 8,
    borderBottomWidth: 4,
    borderBottomColor: "#000",
  },

  buttonText: {
    width: "100%",
    textAlign: "center",
    fontSize: 40,
    lineHeight: 40,
  },
});