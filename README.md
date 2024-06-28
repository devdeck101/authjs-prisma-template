# Pronto para Autenticar Seu Novo Projeto

Este Starter Kit foi desenvolvido para poupar seu tempo, oferecendo tudo o que você precisa para começar a desenvolver seu projeto com segurança.

![GitHub last commit](https://img.shields.io/github/last-commit/devdeck101/authjs-prisma-template) ![GitHub forks](https://img.shields.io/github/forks/devdeck101/authjs-prisma-template) ![GitHub Repo stars](https://img.shields.io/github/stars/devdeck101/authjs-prisma-template) ![GitHub watchers](https://img.shields.io/github/watchers/devdeck101/authjs-prisma-template)

<div class="display:grid">
<img src="assets/landing_page.jpg" alt="drawing" width="400"/>
<img src="assets/login_page.jpg" alt="drawing" width="400"/>
<img src="assets/register_page.jpg" alt="drawing" width="400"/>
<img src="assets/dois_fatores_page.jpg" alt="drawing" width="400"/>
<img src="assets/forget_password_page.jpg" alt="drawing" width="400"/>
<img src="assets/light_landing_page.jpg" alt="drawing" width="400"/>
<img src="assets/multi-step-form.jpg" alt="drawing" width="400"/>
</div>

## <img src="assets/wave.gif" alt="drawing" width="20"/> Detalhes Explicados no Meu Canal

[![Youtube Badge](https://img.shields.io/badge/-@developerdeck101-cc181e?style=flat-square&logo=youtube&logoColor=white&link=https://www.youtube.com/developerdeck101)](https://www.youtube.com/developerdeck101)
![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCj75B_51OXb9qH15wiHs-Hw?style=social)
![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCj75B_51OXb9qH15wiHs-Hw)

Este é um template de projeto de autenticação e autorização implementado em [Next.js](https://nextjs.org/) e [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Foi incluído a inicialização com [Shadcn-ui](https://ui.shadcn.com/), prisma [Prisma](https://www.prisma.io/), Authjs | Next-Auth [Authjs](https://authjs.dev/) utilizando banco de dados [PostgreSQL](https://www.postgresql.org/)

## Tecnologias e Bibliotecas

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)
![React](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)

![Static Badge](https://img.shields.io/badge/-PostgreSQL-PostgreSQL?logo=postgresql&logoColor=%23ffffff&labelColor=008bb9&color=848484)
![Static Badge](https://img.shields.io/badge/-RESEND-PostgreSQL?logo=resend&logoColor=%23ffffff&labelColor=000000&color=000000)
![Static Badge](https://img.shields.io/badge/-REACTEMAIL-REACTEMAIL?labelColor=000000&color=000000)
![Static Badge](https://img.shields.io/badge/-SHADCNUI-SHADCNUI?labelColor=000000&color=000000)
![Static Badge](https://img.shields.io/badge/-Prisma-Prisma?logo=prisma&logoColor=%23000000&labelColor=%230000&color=%23ffffff)

## Getting Started

Clone o repositório:

```bash
git clone https://github.com/devdeck101/authjs-prisma-template.git
```

Entre na pasta do projeto e instale os pacotes:

```bash
npm install
```

## Banco de Dados

O banco de dados utilizado é o PostgreSQL. Você precisará de uma instância dele para executar o projeto. Um arquivo docker-compose.yml está incluído para facilitar a execução de um container Docker.

### Container Docker - Docker Compose

Na raiz do projeto, há um arquivo docker-compose.yml com a configuração para um banco de dados PostgreSQL.

Caso não tenha o docker instalado, pode encontrá-lo aqui [Get Docker](https://docs.docker.com/get-docker/).

Para inicializar o container:

```bash
docker compose up -d
```

Para finalizar o serviço:

```bash
docker compose down postgres
```

## Configuração de Envio de E-Mail

É necessário se cadastrar no [RESEND](https://resend.com/) e criar uma chave de API para envios de email, incluindo verificação de usuário, autenticação de dois fatores e mudança de senha.

### RESEND API KEY

Após logar na sua conta, siga as instruções na imagem abaixo:

![image](assets/resend-api-key.jpg)

## Variáveis de Ambiente

Renomeie o arquivo .env.example para .env. Depois, modifique as variáveis de ambiente conforme necessário:

Váriável do banco de dados:

```bash
# Exemplo utilizando o container Docker disponível
DATABASE_URL="postgresql://developerdeck101:developerdeck101@127.0.0.1:5432/test"
# Ou personalize com suas próprias configurações
DATABASE_URL="postgresql://<user>:<password>@<url>:<port>/<db_name>"
```

Variável de encriptação do token JWT:

```bash
AUTH_SECRET=314FUJnJeO1zGfxpxbmqqxQsBiCl/NwOyJ9AONpG03Y=
```

Para gerar a chave AUTH_SECRET, utilize o comando:

```bash
# Unix
openssl rand -base64 32
```

ou

```bash
# Windows
npm exec auth secret
```

Caso deseje executar em modo produção npm run start, será necessário descomentar a variável:

```bash
AUTH_TRUST_HOST=true
```

Para criar as tabelas do banco de dados, é possível executar os comandos do Prisma ou scripts do projeto.

[![Static Badge](https://img.shields.io/badge/-discord-Discord?logo=Discord&labelColor=5e90ee&color=%23ffff)](http://discord.gg/GXQAVzn4Vn)

## Tabelas do Banco de Dados

Para criar as tabelas do banco de dados, é possível executar os comandos do Prisma ou scripts do projeto.

### Comandos Prisma

Execute o comando:

```bash
npx prisma migrate dev
```

ou

```bash
npx prisma db:push
```

### Scripts disponíveis

```bash
# Cria as tabelas no banco de dados
npm run db:push
```

```bash
# Limpa o banco de dados
npm run db:clear
```

```bash
# Abre o Prisma Studio
npm run db:studio
```

## Para inicializar o projeto

### Modo Desenvolvimento

```bash
# Executar o Projeto
npm run dev
```

### Modo Produção

```bash
# Construir o projeto
npm run build
```

```bash
# Executar o Projeto
npm run start
```

Abrir [http://localhost:3000](http://localhost:3000) com seu navegador.

## Configuração de Rotas

A configuração das rotas de middleware é realizada no arquivo de configuração config/routes/index.ts.

```JavaScript
import { ConfigRoutes } from "@/types/routes";

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/change-password",
    "/auth/reset-password",
    "/auth/verify-email",
  ],
  authRoutes: ["/api/auth/signin"],
  apiRoutes: ["/api/protected-api"],
  protectedRoutes: ["/auth/settings"],
};
```

Para customizar conforme sua necessidade, utilize a função `createRouteMatchers` do arquivo `lib/route/index.ts` dentro do middleware.ts conforme exemplo abaixo:

```JavaScript
export default auth((req) => {
  const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } =
    createRouteMatchers(configRoutes, req);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(`Public: ${isPublicRoute}`);
  console.log(`Protected: ${isProtectedRoute}`);
  console.log(`Api: ${isApiRoute}`);
  console.log(`Auth: ${isAuthRoute}`);
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // console.log(`Middleware: ${req.nextUrl.pathname}`);
});
```

## Formulário Multi-Step (Fluxo Guiado) 🔥

Foi adicionado a definição para criação de fluxos genéricos guiados de usuário para captura de informações em vários passos e de forma guiada.

### O exemplo para criação do Fluxo Guiado esta na pasta abaixo

```bash
app\example\multi-step-form
```

Para aprender como foi desenvolvido nos detalhes, você pode ver o seguinte vídeo onde mostro cada passo do desenvolvimento.

[🔥🔥🔥NEXTJS SAAS - DIA 3 - MULTI-STEP-FORM GENÉRICO🔥🔥🔥](https://youtube.com/live/-QB9fkcCdbk?feature=share)

[<img src="assets/SASS_DAY_3_Multi-Step-Form.jpg" alt="drawing" width="330"/>](https://youtube.com/live/-QB9fkcCdbk?feature=share)




# Não se esqueça

## Siga-me nas Redes Sociais <img src="assets/wave.gif" alt="drawing" width="20"/>

[![Youtube Badge](https://img.shields.io/badge/-@developerdeck101-darkred?style=flat-square&logo=youtube&logoColor=white&link=https://www.youtube.com/developerdeck101)](https://www.youtube.com/developerdeck101)
[![Instagram Badge](https://img.shields.io/badge/-developerdeck101_-purple?style=flat-square&logo=instagram&logoColor=white&link=https://instagram.com/developerdeck101_/)](https://instagram.com/developerdeck101_)
[![Linkedin Badge](https://img.shields.io/badge/-Bruno_Kilian-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brunokilian)](https://www.linkedin.com/in/brunokilian)
[![Twitter Badge](https://img.shields.io/badge/-DeveloperDeck101-blue?style=flat-square&logo=Twitter&logoColor=white&link=http://twitter.com/devdeck101)](http://twitter.com/devdeck101)
[![Discord Badge](https://img.shields.io/badge/-DeveloperDeck101-7289da?style=flat-square&logo=Discord&logoColor=white&link=http://discord.gg/GXQAVzn4Vn)](http://discord.gg/GXQAVzn4Vn)

## Apoie o Projeto e o Canal

[![Youtube Badge](https://img.shields.io/badge/-Membros_do_Canal-darkred?style=flat-square&logo=youtube&logoColor=white&link=https://www.youtube.com/channel/UCj75B_51OXb9qH15wiHs-Hw/join)](https://www.youtube.com/channel/UCj75B_51OXb9qH15wiHs-Hw/join)
[![Static Badge](https://img.shields.io/badge/LivePix-Apoie_o_Canal_e_Projeto-blue?logo=Livepix&logoColor=%23ffffff&labelColor=blue&color=%23ffffff)](https://livepix.gg/brkilian)
[![Static Badge](https://img.shields.io/badge/LivePix_QR_CODE-Apoie_o_Canal_e_Projeto-blue?logo=Livepix&logoColor=%23ffffff&labelColor=blue&color=%23ffffff)](https://widget.livepix.gg/embed/80b6ae11-d611-464b-b3f0-2db50d84d6ee)
