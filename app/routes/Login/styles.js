import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  form: {
    width: 280,
    marginTop: 30
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#1ca68a",
    marginTop: 20,
    elevation: 3
  },
  input: {
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
  text: {
    color: "white",
    fontSize: 18
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
    padding: 20,
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
  }
});

export default Styles;
