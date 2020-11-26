const connection = require('../database/connection');
module.exports ={

    //método de listagem de ONG' em sessão

    async list(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection ('incidents')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidents);

    }


}