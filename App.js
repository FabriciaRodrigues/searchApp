import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button } from "react-native";

export default function App() {
  const [results, setResult] = useState([]);

  const [key, setKey] = useState("");

  const getSearchResult = (key) => {
    fetch(`https://hn.algolia.com/api/v1/search?query=chave/${key}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.hits);
      });
  };

  return (
    <View>
      <View style={styles.title}>
        <h1>Pesquisa:</h1>
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={"Digite o que deseja pesquisar..."}
          value={key}
          onChangeText={(searchKey) => setKey(searchKey)}
        />
        <Button title="Pesquisar" onPress={() => getSearchResult(search)} />
      </View>

      {results.map((result) => (
        <View style={styles.result}>
          <li>Autor: {result.author}</li>
          <li>Título: {result.title}</li>
          <li>URL: {result.url}</li>
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  textInput: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 3,
    height: 35,
  },

  result: {
    flex: 1,
    marginBottom: 10,
    width: "100%",
    minHeight: 100,
    borderWidth: 3,
    justifyContent: "flex-end",
    marginTop: 10,
  },
});