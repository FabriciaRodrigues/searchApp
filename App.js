import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Button } from "react-native";
import rating from "./rating";

export default function App() {
  const [resultados, setResult] = useState([]);

  const [key, setKey] = useState("");

  const getRusultadosPesquisa = (key) => {
    fetch(`https://hn.algolia.com/api/v1/search?query=chave/${key}`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.hits);
      });
  };

  return (
    <View>
      <View style={styles.titulo}>
        <h1>Pesquisa:</h1>
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.textoInput}
          placeholder={"Digite aqui"}
          value={key}
          onChangeText={(serachKey) => setKey(serachKey)}
        />
        <Button title="Pesquisar" onPress={() => getRusultadosPesquisa(search)} />
      </View>

      {resultados.map((resultado) => (
        <View style={styles.resultado}>
          <li>Autor: {resultado.author}</li>
          <li>Título: {resultado.title}</li>
          <li>URL: {resultado.url}</li>
          <li><rating/></li>
        </View>
      ))
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  textoInput: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 3,
    height: 35,
  },

  resultado: {
    flex: 1,
    marginBottom: 10,
    width: "100%",
    minHeight: 100,
    borderWidth: 3,
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
