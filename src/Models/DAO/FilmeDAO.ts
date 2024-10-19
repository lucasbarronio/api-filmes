import Filme from '../Filme';
import pool from '../../db';

export default class FilmeDAO {

    public async salvar(flm: Filme): Promise<Filme> {
        try {
            const query: string = `INSERT INTO filmes (titulo, genero, duracao, classificacao, capa) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
            const values = [flm.titulo, flm.genero, flm.duracao, flm.classificacao, flm.capa];
            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                flm.id = result.rows[0].id;
                return flm;
            } else {
                throw new Error('Falha ao criar filme');
            }
        } catch (error) {
            console.error('Erro ao tentar criar filme:', error);
            throw new Error('Operação de criação de filme falhou');
        }
    }

    public async recuperarUm(id: number): Promise<Filme | undefined> {
        try {
            const query: string = `SELECT * FROM filmes WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                const filme = new Filme();
                filme.id = result.rows[0].id;
                filme.titulo = result.rows[0].titulo;
                filme.genero = result.rows[0].genero;
                filme.duracao = result.rows[0].duracao;
                filme.classificacao = result.rows[0].classificacao;
                filme.capa = result.rows[0].capa;
                return filme;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error('Erro ao tentar recuperar filme:', error);
            throw new Error('Operação de recuperar filme falhou');
        }
    }

    public async listarTodos(): Promise<Filme[]> {
        try {
            const query: string = `SELECT * FROM filmes`;
            const result = await pool.query(query);
            const filmes: Array<Filme> = [];
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const filmeHolder = new Filme;
                filmeHolder.id = row.id;
                filmeHolder.titulo = row.titulo;
                filmeHolder.genero = row.genero;
                filmeHolder.duracao = row.duracao;
                filmeHolder.classificacao = row.classificacao;
                filmeHolder.capa = row.capa;
                filmes.push(filmeHolder);
            }
            return filmes;
        } catch (error) {
            console.error('Erro ao tentar listar filmes', error);
            throw new Error('Operação de listagem de filmes falhou');
        }
    }

    public async excluir(flm: Filme): Promise<boolean> {
        try {
            const query: string = `DELETE FROM filmes WHERE id = $1`;
            const values = [flm.id];
            const result = await pool.query(query, values);
            if (result.rowCount) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erro ao tentar excluir filme:', error);
            throw new Error('Operação de excluir filme falhou');
        }
    }

    public async editar(flm: Filme): Promise<boolean> {
        try {
            const query: string = `UPDATE filmes SET titulo = $2, genero = $3, duracao = $4, classificacao = $5, capa = $6 WHERE id = $1`;
            const values = [flm.id, flm.titulo, flm.genero, flm.duracao, flm.classificacao, flm.capa]
            const result = await pool.query(query, values);
            if (result.rowCount) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erro ao tentar editar filme:', error);
            throw new Error('Operação de edição de filme falhou')
        }
    }
}