import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  form: {
    width: 280,
    marginTop: 30
  },
  confirmationInput: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
    height: 50,
    elevation: 2
  },
  picker: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    height: 50,
    elevation: 2
  },
  phone: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 14,
    backgroundColor: "white",
    height: 50,
    elevation: 2
  },
  header: {
    fontSize: 18,
    color: "#444444",
    marginTop: 5,
    marginBottom: 5
  },
  mainContainer: {
    backgroundColor: "#1ca68a",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  login: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    width: 260,
    maxHeight: 180,
    padding: 20
  },
  title: {
    fontFamily: "Allan-Bold",
    color: "white",
    fontSize: 55,
    marginTop: 100,
    marginBottom: 50
  },
  headText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  searchView: {
    top: 60,
    flex: 1
  },
  searchInput: {
    backgroundColor: "white",
    width: 300,
    height: 50,
    elevation: 3
  },
  input: {
    marginTop: -24,
    marginLeft: 14,
    fontSize: 18,
    width: 250,
    textAlign: "center",
    color: "#444444"
  },
  icon: {
    marginTop: 12,
    marginLeft: 10,
    color: "#444444",
    fontSize: 20
  },
  btnContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 270
  },
  rideSelectContainer: {
    width: 300,
    height: 176,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30
  },
  textContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: 300,
    height: 50,
    borderRadius: 5,
    elevation: 3
  },
  estimation: {
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 14
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    paddingRight: 14,
    paddingTop: 13
  },
  pinContainer: {
    ...StyleSheet.absoluteFillObject
  },
  pickupContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60
  },
  pickupView: {
    backgroundColor: "#1ca68a",
    width: 200,
    maxHeight: 35,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 6,
    borderRadius: 20,
    elevation: 3
  },
  pickupText: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
  },
  pickupBtn: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  chevronIcon: {
    marginTop: 5,
    marginRight: 8,
    color: "#ffffff",
    fontSize: 18
  },
  errorMsg: {
    color: "red"
  },
  driverSearch: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  driverContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 14
  },
  driverInfo: {
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  carPlate: {
    fontWeight: "bold",
    fontSize: 16,
    borderColor: "#444444",
    borderWidth: 0.8,
    borderRadius: 2,
    padding: 4
  },
  driverId: {
    backgroundColor: "#ffffff",
    width: 300,
    height: 175,
    marginBottom: 30,
    borderRadius: 2
  },
  rideStatus: {
    borderColor: "#d1d1d1",
    paddingBottom: 3,
    marginTop: 5,
    paddingLeft: 20,
    marginBottom: 3,
    borderBottomWidth: 0.3
  }
});

export default Styles;
