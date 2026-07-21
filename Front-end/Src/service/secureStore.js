import * as SecureStore from "expo-secure-store";


//salva token
export async function saveToken(token){
    await SecureStore.setItemAsync("token", token)
}

//buscar token
export async function getToken(){
    return await SecureStore.getItemAsync("token")
}

//encerra e deketa o token
export async function logout() {
    await SecureStore.deleteItemAsync("token");
}

//salva nome e email
export async function saveNameEmailId(name,email,id) {
    const user = {name:name,email:email, id:id};
    await SecureStore.setItemAsync("user", JSON.stringify(user));
}

//busca nome e email salvos
export async function getNameEmailId(){
    return await SecureStore.getItemAsync("user");

}

