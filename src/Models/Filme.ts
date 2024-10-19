export default class Filmes {

    private _id: number = 0;
    private _titulo: string = "";
    private _genero: string = "";
    private _duracao: string = "";
    private _classificacao: string = "";
    private _capa: string = "";

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get titulo(): string {
        return this._titulo;
    }
    public set titulo(value: string) {
        this._titulo = value;
    }
    public get genero(): string {
        return this._genero;
    }
    public set genero(value: string) {
        this._genero = value;
    }
    public get duracao(): string {
        return this._duracao;
    }
    public set duracao(value: string) {
        this._duracao = value;
    }
    public get classificacao(): string {
        return this._classificacao;
    }
    public set classificacao(value: string) {
        this._classificacao = value;
    }
    public get capa(): string {
        return this._capa;
    }
    public set capa(value: string) {
        this._capa = value;
    }

    constructor(id?: number, titulo?: string, genero?: string, duracao?: string, classificacao?: string, capa?: string) {
        if (id !== undefined) {
            this.id = id;
        }
        if (titulo !== undefined) {
            this.titulo = titulo;
        }
        if (genero !== undefined) {
            this.genero = genero;
        }
        if (duracao !== undefined) {
            this.duracao = duracao;
        }
        if (classificacao !== undefined) {
            this.classificacao = classificacao;
        }
        if (capa !== undefined) {
            this.capa = capa;
        }
    }

    public toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            genero: this.genero,
            duracao: this.duracao,
            classificacao: this.classificacao,
            capa: this.capa
        }
    }
}