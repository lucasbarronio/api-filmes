import { Request, Response } from 'express';
import FilmeDAO from "../Models/DAO/FilmeDAO";
import Filme from "../Models/Filme";

export default class FilmeController {
    private _filmes: FilmeDAO = new FilmeDAO();

    salvar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const filme: Filme = new Filme();
            filme.titulo = req.body.titulo;
            filme.genero = req.body.genero;
            filme.duracao = req.body.duracao;
            filme.classificacao = req.body.classificacao;
            filme.capa = req.body.capa;
            const resultado = await this._filmes.salvar(filme);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao tentar salvar filme:', error);
            return res.status(500).send({ error: 'Falha ao tentar salvar filme.' });
        }
    };

    recuperarUm = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const resultado: Filme | undefined = await this._filmes.recuperarUm(id);
            if (resultado) {
                return res.status(200).json(resultado);
            } else {
                return res.status(404).json({ message: 'Filme não encontrado' });
            }
        } catch (error) {
            console.error(`Erro ao tentar recuperar filme ${req.params.id}:`, error);
            return res.status(500).send({ error: 'Falha ao tentar recuperar filme.' });
        }
    };

    recuperarTodos = async (req: Request, res: Response): Promise<Response> => {
        try {
            const resultado = await this._filmes.listarTodos();
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Erro ao tentar consultar filmes:', error);
            return res.status(500).send({ error: 'Falha ao tentar consultar filmes.' });
        }
    };

    excluir = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const filme: Filme | undefined = await this._filmes.recuperarUm(id);
            if (filme) {
                const resultado = await this._filmes.excluir(filme);
                if (resultado) {
                    return res.status(200).json({ message: `Filme ${filme.titulo} excluído com sucesso` });
                } else {
                    return res.status(500).json({ message: `Filme ${id} não removido, ocorreu um erro de acesso ao objeto` });
                }
            } else {
                return res.status(404).json({ message: `Filme ${id} não encontado` });
            }
        } catch (error) {
            console.error(`Erro ao tentar excluir filme ${req.params.id} :`, error);
            return res.status(500).send({ error: `Falha ao tentar excluir filme.` });
        }
    };

    editar = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        const filme: Filme | undefined = await this._filmes.recuperarUm(id);
        if (filme) {
            filme.titulo = req.body.titulo;
            filme.genero = req.body.genero;
            filme.duracao = req.body.duracao;
            filme.classificacao = req.body.classificacao;
            filme.capa = req.body.capa;
            const resultado = await this._filmes.editar(filme);
            if (resultado) {
                return res.status(200).json({ message: `Filme ${filme.titulo} editado com sucesso` });
            } else {
                return res.status(500).json({ message: `Filme  ${filme.id} - ${filme.titulo} não editado, ocorreu um erro de acesso ao objeto` })
            }
        } else {
            return res.status(404).send({ error: `Filme não encontrado.` });
        }
    };
}