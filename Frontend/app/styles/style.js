import { StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";
// import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: StatusBar.currentHeight,
  },
  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#EEEEEE",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
  },
  homeHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  postsContainer: {},

  postsContainerContentContainerStyle: {
    marginHorizontal: 10,
  },
  postContainer: {
    width: "100%",
    marginTop: 5,
    marginBottom: 35,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  postCreatorLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft: 5,
  },
  postCaption: {
    fontSize: 16,
    marginBottom: 5,
  },
  postImage: {
    width: "100%",
    // width: 200,
    height: undefined,
    aspectRatio: 1,
    // height: 200
  },
  postLikesContainer: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    // paddingHorizontal: 10,
  },
  postLikesTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  postLikesText: {
    fontSize: 16,
    marginBottom: 5,
  },
  postLikesButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputsContainer: {
    marginHorizontal: 15,
    paddingTop: windowWidth / 3,
  },
  detailsContainer: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconRightContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  inputWithLabel: {
    marginBottom: 15,
  },
  inputLabelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  smallInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 15,
  },
  submitButtonContainer: {
    width: 250,
    alignSelf: "center",
    marginBottom: 15,
  },
  loginRegisterTransferView: {
    width: 250,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallLabel: {
    fontSize: 14,
    marginRight: 5,
  },
  smallLabelBold: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  displayLabel: {
    fontSize: 24,
    marginBottom: 5,
  },
  displayLabelSmall: {
    fontSize: 16,
    marginBottom: 5,
  },
  createPostContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  largeInputWithLabel: {
    width: "100%",
    marginBottom: 15,
  },
  largeInput: {
    height: 100,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 15,
    paddingRight: 10,
    lineHeight: 23,
    flex: 2,
    textAlignVertical: "top",
  },
  warningToast: {
    backgroundColor: "orange",
    height: 30,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  errorToast: {
    backgroundColor: "#D0342C",
    height: 30,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  successToast: {
    backgroundColor: "#1affc6",
    height: 30,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const toastConfig = {
  warning: ({ text1, props }) => (
    <View style={styles.warningToast}>
      <Text>{text1}</Text>
      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
  success: ({ text1, props }) => (
    <View style={styles.successToast}>
      <Text>{text1}</Text>
      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
  error: ({ text1, props }) => (
    <View style={styles.errorToast}>
      <Text>{text1}</Text>
      {/* <Text>{props.uuid}</Text> */}
    </View>
  ),
};

export default styles;
export { toastConfig };
