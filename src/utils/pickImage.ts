import * as ImagePicker from "expo-image-picker";

type PickImageOptions = {
  allowsEditing?: boolean;
  aspect?: [number, number];
};

export async function pickImageFromLibrary(
  options: PickImageOptions = {},
): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Media library permission is required.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: options.allowsEditing ?? true,
    aspect: options.aspect,
    quality: 1,
  });

  if (result.canceled || !result.assets[0]?.uri) {
    return null;
  }

  return result.assets[0].uri;
}
