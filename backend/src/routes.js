const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

//login e logout
routes.post('/sessions', SessionController.create);
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),




}), ProfileController.list);

//rota das ONG's
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })

}), OngController.create);
routes.get('/ongs', OngController.list);



//rota dos incidentes
routes.post('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({

    page: Joi.number(),
  })
}), incidentController.create);

routes.get('/incidents', incidentController.list);
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),

  })

}), incidentController.delete);


module.exports = routes;
