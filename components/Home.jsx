import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [calcul, setCalcul] = useState("");
  const [operation, setOperation] = useState("");
  const [premiereSaisie, setPremiereSaisie] = useState(false);

  const number = [
    { id: 1, title: "1" },
    { id: 2, title: "2" },
    { id: 3, title: "3" },
    { id: 4, title: "4" },
    { id: 5, title: "5" },
    { id: 6, title: "6" },
    { id: 7, title: "7" },
    { id: 8, title: "8" },
    { id: 9, title: "9" },
    { id: 10, title: "0" },
    { id: 11, title: "," },
    { id: 12, title: "+" },
    { id: 13, title: "=" },
    { id: 14, title: "-" },
    { id: 15, title: "/" },
    { id: 16, title: "(" },
    { id: 17, title: ")" },
    { id: 18, title: "x" },
    { id: 19, title: "%" },
    { id: 20, title: "C" },
    { id: 21, title: "⌫" },
  ];

  const resoudre = (item) => {
    const operateur = ["+", "-", "/", "x", "%", ",", "(", ")"];

    if (item.title === "C") {
      setCalcul("");
      setOperation("");
      setPremiereSaisie(false);
    } else if (item.title === "⌫") {
      setCalcul((precedentCalcul) => precedentCalcul.length > 0 ? precedentCalcul.slice(0, -1) : precedentCalcul);

     
      setPremiereSaisie(false);
    } else {
      if (item.title !== "=") {
        if (calcul === "" && operateur.includes(item.title)) { // Affiche true si item.title est présent dans le tableau numbers
          setCalcul("");
          setOperation("Saisir un nombre avant une opération");
          return;
        }
        const dernierChar = calcul.slice(-1);
        if (!operateur.includes(dernierChar) && operateur.includes(item.title)) { // Verifie si la derniiere saisie n'est 
          setCalcul((precedentCalcul) => precedentCalcul + item.title);
        } else if (!operateur.includes(item.title)) {
          setCalcul((precedentCalcul) =>
            precedentCalcul === "0" ? item.title : precedentCalcul + item.title
          );
        }
      } else {
        try {
          const resultat = eval(calcul); //calculer un expression mathematique 
          setCalcul(String(resultat)); //convertir en string pour le ressortir
          setOperation("");
        } catch (error) {
          console.error("Erreur lors de l'évaluation de l'expression :", error);
          // Gérer l'erreur d'évaluation ici
        }
      }
      if (!operateur.includes(item.title) && !premiereSaisie) {
        if (item.title !== "0" && item.title !== ",") {-
          setPremiereSaisie(true);
        } else {
          return;
        }
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="grey" />
        {/* Titre de l'application */}
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4374/4374752.png",
            }}
            style={{
              height: 30,
              width: 30,
            }}
          />
          <Text style={styles.title}>CALCULATRICE</Text>
        </View>
        {/* Tableau des opérations */}
        <View style={styles.OpertaionContainer}>
          {/* Bouton de l'historique */}
          <TouchableOpacity onPress={() => navigation.navigate("history")}>
            <MaterialIcons
              name="history-toggle-off"
              size={34}
              style={{ margin: 5 }}
              color="black"
            />
          </TouchableOpacity>
          {/* L'écran des opérations */}
          <View style={{ alignItems: "flex-end", padding: 5 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Roboto_900Black",
                flexWrap: "wrap",
              }}
            >
              {`${calcul} ${operation}`}
            </Text>
          </View>
        </View>

        {/* Touches de saisies des opérations */}
        <View style={styles.body}>
          <FlashList
            numColumns={3}
            estimatedItemSize={400}
            data={number}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  padding: 5,
                  height: 50,
                  width: 80,
                  margin: 10,
                  borderRadius: 10,
                  elevation: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => resoudre(item)}
              >
                <Text
                  style={{
                    color:
                      item.id === 21
                        ? "red"
                        : item.id >= 11 && item.id <= 20
                        ? "yellow"
                        : "#fff",
                    textAlign: "center",
                    fontFamily: "Roboto_900Black",
                    fontSize: 25,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  titleContainer: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: 30,
    color: "red",
  },
  OpertaionContainer: {
    minHeight: 100,
    maxHeight: 150,
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "column",
    overflow: "scroll",
  },
  body: {
    flex: 1,
    margin: 10,
    left: 12,
  },
});

export default Home;
