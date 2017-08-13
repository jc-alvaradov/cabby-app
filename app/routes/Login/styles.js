import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  form: {
    width: 300
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#1ca68a",
    elevation: 3
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    backgroundColor: "white",
    height: 40,
    elevation: 0.8
  },
  text: {
    color: "white",
    fontSize: 18
  },
  header: {
    fontSize: 16,
    marginBottom: 5
  },
  mainContainer: {
    backgroundColor: "#1ca68a",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  login: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "auto",
    height: "auto",
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
  }
});

export default Styles;
