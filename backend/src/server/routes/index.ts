import { Router } from 'express';
import {  CityController, ClientsController, UsersController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';



const router = Router();


router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.get('/city', CityController.getAllValidation, CityController.getAll);
router.post('/city',  CityController.createValidation, CityController.create);
router.get('/city/:id', CityController.getByIdValidation, CityController.getById);
router.put('/city/:id', CityController.updateByIdValidation, CityController.updateById);
router.delete('/city/:id', ensureAuthenticated, CityController.deleteByIdValidation, CityController.deleteById);

router.get('/clients', ensureAuthenticated, ClientsController.getAllValidation, ClientsController.getAll);
router.post('/clients', ensureAuthenticated, ClientsController.createValidation, ClientsController.create);
router.get('/clients/:id', ensureAuthenticated, ClientsController.getByIdValidation, ClientsController.getById);
router.put('/clients/:id', ensureAuthenticated, ClientsController.updateByIdValidation, ClientsController.updateById);
router.delete('/clients/:id', ensureAuthenticated, ClientsController.deleteByIdValidation, ClientsController.deleteById);


router.post('/signin',  UsersController.signInValidation, UsersController.signIn);
router.post('/signup',  UsersController.signUpValidation, UsersController.signUp);
router.get('/user/:id',  UsersController.getAccountByIdValidation, UsersController.getUserAccountId);


export { router };
