import { Button, View, Text, Image, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { SIZES } from "../../constants/theme";

export default function ImagePicker({ label, onImageTaken, source }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    //Ask for permisssion if the permission status is undetermined
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    //Return false if the permission status is denied
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      return false;
    }
    //Return true if the permission status is granted
    return true;
  }

  async function takeImageHandler() {
    const getPermission = await verifyPermission();

    //return the function if didn't get permission, otherwise lauch camera
    if (!getPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    //Set the image source
    onImageTaken(image.assets[0].uri);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.imagePreview}>
        {source ? (
          <Image style={styles.image} source={{ uri: source }} />
        ) : (
          <Text>No receipt taken yet.</Text>
        )}
      </View>
      <Button title="Take Image" onPress={takeImageHandler} />

      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: SIZES.margin,
    marginTop: SIZES.margin,
    marginBottom: 30,
  },
  label: {
    marginBottom: SIZES.base,
    fontSize: SIZES.label,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#dddcdc",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
