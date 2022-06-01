import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import StarRating from "react-native-star-rating";

export default function App() {
  const [book, setBook] = useState(null);
  const [starts, setStars] = useState(Number);
  const [search, setSearch] = useState(null);

  const getBookData = (title) => {
    const endpoint = `https://hn.algolia.com/api/v1/search?query=${title}/`;

    fetch(endpoint)
      .then((resposta) => resposta.json())
      .then((data) => {
        const products = data.hits;
        setBook(products);
      });
  };

  onStarRatingPress = (rating) => {
    setStars(rating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topTitle}>Livraria</Text>
      </View>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar por titulo"
          onChangeText={(newText) => setSearch(newText)}
          defaultValue={search}
        />
        <Button title="Pesquisar" onPress={() => getBookData(search)} />
        {book?.map((b) =>
          starts?.map((s) => (
            <View style={styles.cardContainer}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={s.value}
                selectedStar={(rating) => onStarRatingPress(rating)}
              />
              <Text style={styles.text}>Titulo: {b.title}</Text>
              <Text style={styles.text}>Autor: {b.author}</Text>
              <Text style={styles.text}>url: {b.url}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  input: {
    borderWidth: 2,
    borderColor: "#000",
    height: 40,
    textAlign: "center",
    marginBottom: 12,
  },

  top: {
    padding: 20,
    paddingTop: 40,
    marginBottom: 20,
    backgroundColor: "#5671A8",
  },
  topTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },

  cardContainer: {
    backgroundColor: "#5671A8",
    borderRadius: 4,
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  text: { fontSize: 16, color: "#fff" },
});