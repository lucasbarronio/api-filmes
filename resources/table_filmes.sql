CREATE TABLE "filmes" (
  "id" serial PRIMARY KEY,
  "titulo" varchar(255) NOT NULL,
  "genero" varchar(255) NOT NULL,
  "duracao" varchar(10) NOT NULL,
  "classificacao" varchar(2) NOT NULL,
  "capa" varchar(255)
);
