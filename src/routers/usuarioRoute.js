import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";
import usuarioMiddlewares from "../middlewares/usuarioMiddlewares.js";

const router = Router();


router.post("/cadastrar", (req, res) => usuarioController.cadastrar(req, res));
router.post("/login", (req, res) => usuarioController.login(req, res));
router.get("/busca", usuarioMiddlewares, (req, res) => usuarioController.buscarPorEmail(req, res));
router.get("/:id", usuarioMiddlewares, (req, res) => usuarioController.buscarPorId(req, res));
router.get("/perfil", usuarioMiddlewares, (req, res) => usuarioController.buscarPerfil(req, res));

export default router;