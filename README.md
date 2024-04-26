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

Modifique o arquivo `env.example` para `env.example`. Após a edição, modifique a string de conexao `DATABASE_URL` com a string de conexão da sua instância do Postgre.

Execute o comando

```bash
npx prisma migrate dev
```

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) com seu navegador.

## Não se esqueça

Deixar a estrela no repositório
