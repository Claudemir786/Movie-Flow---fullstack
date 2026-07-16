import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { SearchMovieTv } from "../service/moviesAndTv";

export default function Search({ navigation }) {
  const [search, setSearch] = useState([]);
  const [title, setTitle] = useState("");
  const [resultSearch, setResultSearch] = useState(false);
  const [loading,setLoanding] = useState(false)

  //retorna a lista de filmes e séries
  const LIST = ({ movieTv }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("TvMovie", { tvMovie: movieTv })}
      >
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieTv.backdrop_path}`,
          }}
          style={styles.card}
          imageStyle={styles.image}
        >
          {movieTv.title && (
            <Text style={styles.textCard}>{movieTv.title}</Text>
          )}
          {movieTv.name && <Text style={styles.textCard}>{movieTv.name}</Text>}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  function movieCategory(id) {
    console.log("categoria filme: ", id);
    navigation.navigate("ListCategory", { category: id, type: "movie" });
  }

  function serieCategory(id) {
    console.log("categoria série: ", id);
    navigation.navigate("ListCategory", { category: id, type: "tv" });
  }

  async function handleSearch() {
    try {
      //inicia o icone de carregamento  
      setLoanding(true)
      const result = await SearchMovieTv(title);
        
      if (result) {
        //console.log("dados retornaram com sucesso: ", result);
        //guarda o resultado que retornou
        setSearch(result);
        //seta o resultado como encotrado
        setResultSearch(true);
        //desativa o icône de carregamento
        setLoanding(false);
      } else {
        alert("filme ou serie não encontrado da base de dados");
      }
    } catch (error) {
      console.error("falha ao encontrar dados correspondentes a pesquisa");
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.body}>
             {/*Cabeçalho com a barra de pesquisa */}
                <View style={styles.header}>
                    <View style={styles.inputView}>
                    <View style={{ padding: 10 }}>
                        <Feather name="search" size={25} color="#7B837E" />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Buscar títulos"
                        onSubmitEditing={() => handleSearch()}
                        onChangeText={setTitle}
                    />
                    </View>
                </View>                
                  {/*componente de loading que fica girando até carregar as informações */}
                            {loading &&(
                                <>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <ActivityIndicator size={"large"} color={"#4F39F6"}/>
                                    </View>
                                </>
                            )}
                
                {/*renderiza os resultados pela o campo de busca */}
                {resultSearch && (
                    <>
                    {/*Resultado da pesquisa*/}
                    <Text style={styles.title}>Resultados da pesquisa</Text>

                    <FlatList
                      
                        data={search}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <LIST movieTv={item} />}
                         
                    />
                     <Text style={styles.title}>Resultados da pesquisa</Text>
                    </>
                    
                ) }
                

                {!resultSearch && (
                    <>
                    {/*buscar filmes por genero */}
                    <View style={styles.movieView}>
                        <View style={{ flexDirection: "row" }}>
                        <MaterialIcons name="movie" size={35} color="#7B837E" />
                        <Text style={styles.title}>CATEGORIAS FILMES</Text>
                        </View>

                        {/*botões */}
                        <View
                        style={{
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-evenly",
                        }}
                        >
                        <TouchableOpacity
                            style={styles.buttonCategoryMovie}
                            onPress={() => movieCategory(28)}
                        >
                            <Text style={styles.textButton}>Ação</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonCategoryMovie}
                            onPress={() => movieCategory(35)}
                        >
                            <Text style={styles.textButton}>Comédia</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonCategoryMovie}
                            onPress={() => movieCategory(27)}
                        >
                            <Text style={styles.textButton}>Terror</Text>
                        </TouchableOpacity>
                        </View>
                        <View
                        style={{
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-evenly",
                            marginTop: "5%",
                        }}
                        >
                        <TouchableOpacity
                            style={styles.buttonCategoryMovie}
                            onPress={() => movieCategory(10749)}
                        >
                            <Text style={styles.textButton}>Romance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonCategoryMovie}
                            onPress={() => movieCategory(878)}
                        >
                            <Text style={styles.textButton}>Ficção Científica</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    {/*buscar series por genero */}
                    <View style={styles.movieView}>
                        <View style={{ flexDirection: "row" }}>
                        <Feather name="tv" size={32} color="#7B837E" />
                        <Text style={styles.title}>CATEGORIAS SÉRIES</Text>
                        </View>

                        {/*botões */}
                        <View>
                        <View
                            style={{
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-evenly",
                            }}
                        >
                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(10759)}
                            >
                            <Text style={styles.textButton}>Ação</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(35)}
                            >
                            <Text style={styles.textButton}>Comédia</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(16)}
                            >
                            <Text style={styles.textButton}>Animação</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-evenly",
                            marginTop: "5%",
                            }}
                        >
                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(18)}
                            >
                            <Text style={styles.textButton}>Drama</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(10765)}
                            >
                            <Text style={styles.textButton}>Sci-fi e Fantasia</Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-evenly",
                            marginTop: "5%",
                            }}
                        >
                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(10764)}
                            >
                            <Text style={styles.textButton}>Reality</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.buttonCategorySerie}
                            onPress={() => serieCategory(10762)}
                            >
                            <Text style={styles.textButton}>Kids</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    
                    </>
                )}
                
        </View>
        
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020618",
    flex: 1,
    
    
  },
  header: {
    borderWidth: 1,
    borderBlockColor: "#7B837E",
  },
  inputView: {
    backgroundColor: "#0F172B",
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: "17%",
    borderWidth: 1,
    borderColor: "#7B837E",
    marginBottom: "10%",
  },
  input: {
    backgroundColor: "#0F172B",
    color: "#7B837E",
    fontSize: 20,
    marginLeft: "3%",
    width: "100%",
    padding: 10,
    borderRadius: 15,
    borderColor: "transparent",
    outlineStyle: "none",
  },
  movieView: {
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
  },
  buttonCategoryMovie: {
    backgroundColor: "#0F172B",
    padding: 10,
    borderRadius: 15,
    marginRight: "3%",
  },
  buttonCategorySerie: {
    backgroundColor: "#0C0E30",
    padding: 10,
    borderRadius: 15,
    marginRight: "3%",
  },
  title: {
    color: "#7B837E",
    fontSize: 25,
    fontWeight: "600",
    marginLeft: "3%",
    marginBottom: "8%",
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 23,
  },
  card: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    
    
  },
  image: {
    borderRadius: 15,
    opacity: 0.4,
    
    
  },
  textCard: {
    color: "#fff",
  },
  body:{
    width:'90%',
    alignSelf:'center',
    
    
    
     
  }
});
