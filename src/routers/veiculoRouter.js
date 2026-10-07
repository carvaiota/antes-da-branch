import { Router } from 'express';
import veiculoController from '../controllers/veiculoController.js';
import usuarioMiddlewares from '../middlewares/usuarioMiddlewares.js'; 

const router = Router();

router.use(usuarioMiddlewares);

router.post('/', (req, res) => veiculoController.criar(req, res));
router.get('/', (req, res) => veiculoController.buscarTodos(req, res));
router.get('/:id', (req, res) => veiculoController.buscarPorId(req, res));
router.put('/:id', (req, res) => veiculoController.atualizar(req, res));
router.delete('/:id', (req, res) => veiculoController.deletar(req, res));

export default router;