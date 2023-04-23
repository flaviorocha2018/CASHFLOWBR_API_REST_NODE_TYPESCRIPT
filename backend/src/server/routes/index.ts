import { Router } from 'express';
import {  CityController, ClientsController, UsersController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';



const router = Router();


router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.get('/city', ensureAuthenticated, CityController.getAllValidation, CityController.getAll);
router.post('/city', ensureAuthenticated, CityController.createValidation, CityController.create);
router.get('/city/:id', ensureAuthenticated, CityController.getByIdValidation, CityController.getById);
router.put('/city/:id', ensureAuthenticated, CityController.updateByIdValidation, CityController.updateById);
router.delete('/city/:id', ensureAuthenticated, CityController.deleteByIdValidation, CityController.deleteById);

router.get('/clients', ensureAuthenticated, ClientsController.getAllValidation, ClientsController.getAll);
router.post('/clients', ensureAuthenticated, ClientsController.createValidation, ClientsController.create);
router.get('/clients/:id', ensureAuthenticated, ClientsController.getByIdValidation, ClientsController.getById);
router.put('/clients/:id', ensureAuthenticated, ClientsController.updateByIdValidation, ClientsController.updateById);
router.delete('/clients/:id', ensureAuthenticated, ClientsController.deleteByIdValidation, ClientsController.deleteById);

// tirei o ensureAuthenticated para verificar  o acesso do getAll.  está OK.
router.get('/users', UsersController.getAllValidation, UsersController.getAll);
// router.get('/users/:id', ensureAuthenticated, UsersController.getByIdValidation, UsersController.getIdByUserName);

router.post('/signin',  UsersController.signInValidation, UsersController.signIn);
router.post('/signup',  UsersController.signUpValidation, UsersController.signUp);



export { router };
