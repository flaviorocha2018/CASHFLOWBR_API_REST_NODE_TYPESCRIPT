import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CityController } from './../controllers';


const router = Router();


router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.get('/city', CityController.getAllValidation, CityController.getAll);
router.post('/city', CityController.createValidation, CityController.create);
router.get('/city/:id', CityController.getByIdValidation, CityController.getById);
router.put('/city/:id', CityController.UpdateByIdValidation, CityController.updateById);
router.delete('/city/:id', CityController.deleteByIdValidation, CityController.deleteById);



export { router };
