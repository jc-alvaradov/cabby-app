import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <ActivityIndicator
      size="large"
      style={{ transform: [{ scale: 1.5 }] }}
      thickness={6}
      animating={true}
    />
  </View>
);

export default Loading;
