import React from "react";
import { View, Text } from "react-native";

class App extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#44bb44"
        }}
      >
        <Text color="#ffffff">Hello World</Text>
      </View>
    );
  }
}

export default App;