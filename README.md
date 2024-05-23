Este é um template de projeto de autenticação usando [Next.js](https://nextjs.org/) e [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Foi incluido a inicialização com [Shadcn-ui](https://ui.shadcn.com/), prisma [Prisma](https://www.prisma.io/) e Authjs | Next-Auth [Authjs](https://authjs.dev/)

## Getting Started

Primeiramente, execute o ambiente de desenvolvimento:

```bash
npm i
```

```bash
npx prisma generate
```

## Utilização de Container Docker do Bando de Dados Postgres

Na raiz do projeto, existe um arquivo `docker-compose.yml` com as configuração de uma images de banco
de dados Postgres. Caso não tenha o docker instalado, pode encontrá-lo aqui [Get Docker](https://docs.docker.com/get-docker/).

Para inicializar o container

```bash
docker compose up -d
```

Para finalizar o serviço

```bash
docker compose down postgres
```

## Modificação de Variáveis de Ambiente

Modifique o arquivo `.env.example` para `.env`.
Após a edição, modifique a string de conexao `DATABASE_URL` com a string de conexão da sua instância do Postgres. Caso você queira utilizar um conteiner docker, eu inclue na pasta raiz do projeto uma
configuração de desenvolvimento.

Para gerar a chave de `NEXTAUTH_SECRET`, pode utilizar o comando abaixo:

```bash
openssl rand -base64 32
```

ou

```bash
npm exec auth secret
```

Execute o comando

```bash
npx prisma migrate dev
```

ou

```bash
npx prisma db push
```

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) com seu navegador.

## Não se esqueça

Deixar a estrela no repositório
