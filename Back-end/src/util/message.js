
//menssagem de resposta padrão de erro na requisição
export function messageError(res,status,message){

    res.status(status).json({success:false, message:message})
}

//menssagem de resposta padrão de sucesso na requisição 
export function messageSuccess(res,status,message){
    res.status(status).json({success:true, message:message})
}

