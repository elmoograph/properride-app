import * as ImagePicker from "expo-image-picker";

export async function pickMotorcycleImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.8,
    allowsEditing: true,
    aspect: [16, 9],
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
}
