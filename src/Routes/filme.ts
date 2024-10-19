import { Router } from 'express';
import FilmeController from '../Controllers/FilmeController';

let router: Router = Router();
let filmeController: FilmeController = new FilmeController();

router.get('/filmes', filmeController.recuperarTodos);
router.post('/filmes', filmeController.salvar);
router.put('/filmes/:id', filmeController.editar);
router.get('/filmes/:id', filmeController.recuperarUm);
router.delete('/filmes/:id', filmeController.excluir);

export default router;
