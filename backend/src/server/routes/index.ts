import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CityController, ClientsController } from './../controllers';


const router = Router();


router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.get('/city', CityController.getAllValidation, CityController.getAll);
router.post('/city', CityController.createValidation, CityController.create);
router.get('/city/:id', CityController.getByIdValidation, CityController.getById);
router.put('/city/:id', CityController.UpdateByIdValidation, CityController.updateById);
router.delete('/city/:id', CityController.deleteByIdValidation, CityController.deleteById);

router.get('/clients', ClientsController.getAllValidation, ClientsController.getAll);
router.post('/clients', ClientsController.createValidation, ClientsController.create);
router.get('/clients/:id', ClientsController.getByIdValidation, ClientsController.getById);
router.put('/clients/:id', ClientsController.updateByIdValidation, ClientsController.updateById);
router.delete('/clients/:id', ClientsController.deleteByIdValidation, ClientsController.deleteById);



export { router };
