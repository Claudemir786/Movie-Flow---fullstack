import bcrypt, {hash} from 'bcrypt'

const salRounds = 10 //quantas vezes o algoritimo vai embaralhar a senha


//embaralha a senha
export async function hashPassword(password) {
    return await bcrypt.hash(password,salRounds);

}
//compara a senha com a senha embaralhada
export async function comparePassword(password,hashPassword){
    return await bcrypt.compare(password,hashPassword);
}