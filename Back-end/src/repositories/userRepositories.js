import pool from "../database/db.js";
import { comparePassword, hashPassword } from "../util/hashPassword.js";


const POOL = pool;


export async function userCreate(name,email,password) {
    try {
        //se os dados forem enviados incorretamente ou faltando algum
        if(!name,!email,!password)throw new Error("dados inválidos para criação de novo usuário")
        
        const hashPass = await hashPassword(password)    
        //insert no banco de dados 
        const [result] = await POOL.query(`INSERT INTO users(name,email,user_password) VALUES(?,?,?)`, [name,email,hashPass])

        //se ocorrer algum erro e não tiver nenhuma linha alterada na tabela em questão
        if(result.affectedRows === 0)throw new Error("não foi posivel fazer insert no banco corretamente")
        
        return true;
        
    } catch (error) {
        console.error("falha ao conectar no banco e criar novo usuário: ", error.message)
        return false
    }
}

export async function userLogin(email,password){
    try {
        
        if(!email || !password)throw new Error("dados invalidos para verificação de login")
        
        const [row] = await POOL.query(`SELECT * FROM users WHERE email = ?`, [email])
        
        if(row.length === 0)throw new Error("não foi possivel encontrar usuário na base de dados");

        //guarda o usuário que retornou
        const user = row[0]
    
        //verifca se a senha é igual a senha armazenada no banco de dados 
        const verificPass = await comparePassword(password, user.user_password)
        if(!verificPass)throw new Error("falha, senhas não condizem")       

        return user.id

    } catch (error) {
        console.error("falha ao conectar no banco de dados e verificar o login de usuário: ", error)
        return false
    }
}

//adiciona o filme 
export async function addMovie(id,id_user,backdrop_path,media_type,release_date,vote_average,title,overview) {
    try {

        const [result] = await POOL.query(`INSERT INTO USER_MOVIE(id,userId,backdrop_path,media_type,release_date,vote_average,title,overview)
                                           VALUES(?,?,?,?,?,?,?,?)`, [id,id_user,backdrop_path,media_type,release_date,vote_average,title,overview]);
        if(result.affectedRows === 0)throw new Error("Erro ao adicionar informações de filme no banco de dados")
        
        return true

        
    } catch (error) {
        console.error("falha ao conectar no banco de dados e adicionar o filme: ", error)
        return false
    }
}

//adiciona a série
export async function addTv(id,id_user,backdrop_path,media_type,first_air_date,vote_average,name,overview){
    try {
        const [result] = await POOL.query(`INSERT INTO USER_TV(id,userId,backdrop_path,media_type,first_air_date,vote_average,name,overview)
                                           VALUES(?,?,?,?,?,?,?,?)`, [id,id_user,backdrop_path,media_type,first_air_date,vote_average,name,overview]);
        if(result.affectedRows === 0) throw new Error("Erro ao adicionar informações de série no banco de dados")
        
        return true;    

        
    } catch (error) {
        console.error("Falha ao conectar ao banco de dados e adicionar a série: ", error)
        return false
    }

}

export async function userInterests(id) {
    try {
        const [result] = await POOL.query(`SELECT id FROM USER_MOVIE WHERE userId = ?
                                            UNION
                                            SELECT id FROM USER_TV WHERE userId = ?`, [id,id]);
        
        if(result.length === 0)throw new Error("Banco não retornou os dados corretamente");

        return result.map(item =>item.id);
        
    } catch (error) {
        console.error("Falha ao conectar com o banco de dados e retornar dados de filmes e séries do usuário", error);
        return false;
    }
}
