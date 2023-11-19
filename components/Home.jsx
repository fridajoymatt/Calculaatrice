import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
];

const Home = () => {
  const navigation = useNavigation();
  // let asyncitem = AsyncStorage.getItem("calcul")
  const [calcul, setCalcul] = useState("");
  const [opcalcul, setOpcalcul] = useState("");

  const numberConverter = parseInt(calcul);

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
        {/* Tableau des opertations */}
        <View style={styles.OpertaionContainer}>
          {/* button de l'historique */}
          <TouchableOpacity onPress={() => navigation.navigate("history")}>
            <MaterialIcons
              name="history-toggle-off"
              size={34}
              style={{ margin: 5 }}
              color="black"
            />
          </TouchableOpacity>
          {/*l'ecran des operations */}
          <View style={{ alignItems: "flex-end", padding: 5 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Roboto_900Black",
                flexWrap: "wrap",
              }}
            >
              {[calcul, opcalcul]}
            </Text>
          </View>
        </View>

        {/* Touches de saisies des operations */}
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
                onPress={() => {
                  item.title &&
                    setCalcul((touche) =>
                      touche === item.title ? "" : touche + item.title
                    );

                    item.title === "0" ||
                      item.title === "," ||
                      item.title === "+" ||
                      item.title === "=" ||
                      item.title === "-" ||
                      item.title === "/" ||
                      item.title === "(" ||
                      item.title === ")" ||
                      item.title === "x" ||
                      item.title === "%" && setOpcalcul((touche) => 
                      touche === item.title ? "" : item.title)
                }}
              >
                <Text
                  style={{
                    color:
                      item.id === 11 ||
                      item.id === 12 ||
                      item.id === 13 ||
                      item.id === 14 ||
                      item.id === 15 ||
                      item.id === 16 ||
                      item.id === 17 ||
                      item.id === 18 ||
                      item.id === 19 ||
                      item.id === 20
                        ? "#fff"
                        : "yellow",
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

export default Home;

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
