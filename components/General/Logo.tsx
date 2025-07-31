import { Image, type ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

export default function Logo() {
  const logoUri = require("@/assets/images/logos/logo.png") as ImageSource;

  return <Image source={logoUri} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: 80,
  },
});
