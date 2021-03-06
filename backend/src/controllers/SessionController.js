const connection = require("../database/connection");

module.exports = {

    //método de criação da ONG
    
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong){
            return response.status(400).json({ error: 'Nenhuma ONG com esse ID'});

        }

        return response.json(ong)
    }
}