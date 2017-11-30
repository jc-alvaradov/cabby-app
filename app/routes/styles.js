import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  routerContainer: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  routerInputContainer: {
    marginTop: 10,
    width: 300,
    height: 100
  },
  routerInput: {
    marginTop: 70
  },
  routerBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
    width: 270,
    height: "auto",
    zIndex: 1
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
    position: 'absolute',
    top: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  searchView: {
    position: 'absolute',
    top: 60,
  },
  searchInput: {
    backgroundColor: "white",
    width: 300,
    height: 50,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
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
    position: 'absolute',
    width: 300,
    height: 200,
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
    minHeight: 80,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  estimations: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between"
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  mapContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  pickupContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70
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
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  pickupText: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2
  },
  pickupBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  backBtn: {
    width: 300,
    alignItems: "flex-start"
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
    //...StyleSheet.absoluteFillObject,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    height: 160,
    marginBottom: 30,
    paddingTop: 10,
    borderRadius: 2,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  rideStatus: {
    fontSize: 24,
    fontWeight: "bold"
  },
  rideBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d1d1d1",
    borderTopWidth: 1
  },
  driverPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 8,
    marginBottom: 4
  },
  finishedContainer: {
    backgroundColor: "#ffffff",
    width: 300,
    height: 300,
    marginBottom: 30,
    borderRadius: 2,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  rideApp: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerTitle: {
    backgroundColor: "#ffffff",
    height: 80,
    paddingTop: 10,
    alignSelf: "stretch",
    alignItems: "center",
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  rideInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    marginBottom: 14
  },
  starContainer: {
    maxWidth: 280,
    height: 50,
    paddingLeft: 10
  },
  ridePriceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ridePrice: {
    fontWeight: "bold",
    fontSize: 25,
    paddingRight: 14
  },
  onTrip: {
    backgroundColor: "#ffffff",
    width: 300,
    padding: 10,
    marginBottom: 30,
    borderRadius: 2,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  place: {
    width: 280,
    padding: 10
  },
  onTripTitle: {
    fontSize: 18,
    fontWeight: "bold",
    width: 300,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  },
  loadingBackground: {
    backgroundColor: "#ffffff",
    width: 300,
    minHeight: 180,
    marginBottom: 30,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3
  }
});

export default Styles;
