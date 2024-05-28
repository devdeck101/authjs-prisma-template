


# Pronto para autenticar seu novo projeto

Este Starter-Kit foi desenvolvido para poupar seu tempo. Aqui você encontra o que precisa para começar a desenvolver seu projeto com segurança.

![GitHub last commit](https://img.shields.io/github/last-commit/devdeck101/authjs-prisma-template) ![GitHub forks](https://img.shields.io/github/forks/devdeck101/authjs-prisma-template) ![GitHub Repo stars](https://img.shields.io/github/stars/devdeck101/authjs-prisma-template) ![GitHub watchers](https://img.shields.io/github/watchers/devdeck101/authjs-prisma-template) 


<img src="assets/landing_page.jpg" alt="drawing" width="400"/>
<img src="assets/login_page.jpg" alt="drawing" width="200"/>
<img src="assets/register_page.jpg" alt="drawing" width="200"/>
<img src="assets/dois_fatores_page.jpg" alt="drawing" width="200"/>
<img src="assets/forget_password_page.jpg" alt="drawing" width="200"/>
<img src="assets/light_landing_page.jpg" alt="drawing" width="400"/>


## <img src="assets/wave.gif" alt="drawing" width="20"/> Tudo explicado nos detalhes no meu canal
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

Efetuar a clonagem do repositório

```bash
git clone https://github.com/devdeck101/authjs-prisma-template.git
```

Após entrar na pasta do projeto, instalar os pacotes:

```bash
npm install
```

## Banco de Dados

O banco de dados utilizado no projeto é o PostgreSQL. Você precisa de um instância dele para executar o projeto.

Obs. O projeteto possui um arquivo chamado docker-compose.yml para execução de um container docker explicado abaixo.

### Container Docker - Docker Compose

Na raiz do projeto, existe um arquivo `docker-compose.yml` com as configuração de uma imagem de banco
de dados PostgreSQL. 

Caso não tenha o docker instalado, pode encontrá-lo aqui [Get Docker](https://docs.docker.com/get-docker/).

Para inicializar o container

```bash
docker compose up -d
```

Para finalizar o serviço

```bash
docker compose down postgres
```


## Configuração de Envio de E-Mail

É necessário um cadastro no [RESEND](https://resend.com/) e criação de uma chave de API para envios de email que incluem verificação de usuário, autenticação de 2 fatos e mudança de senha.

### RESEND API KEY
Após logar na sua conta, siga a imagem abaixo:

![image](assets/resend-api-key.jpg)

## Variáveis de Ambiente

Modificar|Renomear o arquivo `.env.example` para `.env`.
Uma vez modificado o arquivo, será necessário modificar algumas variáveis de ambiente:

Váriável do banco de dados:
```bash
#Exemplo levando em consideração a utilização do container docker disponível
#DATABASE_URL="postgresql://developerdeck101:developerdeck101@127.0.0.1:5432/test"
DATABASE_URL="postgresql://<user>:<password>@<url>:<port>/<db_name>"
```
Variável de encriptação do token JWT

```bash
AUTH_SECRET=314FUJnJeO1zGfxpxbmqqxQsBiCl/NwOyJ9AONpG03Y=
```

Para gerar a chave de `AUTH_SECRET`, pode utilizar o comando abaixo:

```bash
# Unix System
openssl rand -base64 32
```

ou

```bash
# Windows System
npm exec auth secret
```

Caso deseje executar em modo produção `npm run start`, será necessário descomentar a variável abaixo:

```bash
AUTH_TRUST_HOST=true
```

As demais váriáveis são auto-explicativas.
Qualquer dúvida, entra em contato clicando abaixo 

[![Static Badge](https://img.shields.io/badge/-discord-Discord?logo=Discord&labelColor=5e90ee&color=%23ffff)](http://discord.gg/GXQAVzn4Vn)


## Tabelas do Banco de Dados
Para a criação das tabelas do banco de dados, é possível executar os comando do prisma ou scripts do projeto

### Comandos Prisma

Execute o comando

```bash
npx prisma migrate dev
```

ou

```bash
npx prisma db push
```

### Scripts disponíveis

```bash
# Crias as tabelas no banco de dados
npm run push-db
```

```bash
# Limpa o banco de dados
npm run clear-db
```

```bash
# Abre o Prisma Studio
npm run studio
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

# Não se esqueça

## Me seguir nas Redes Sociais <img src="assets/wave.gif" alt="drawing" width="20"/>
[![Youtube Badge](https://img.shields.io/badge/-@developerdeck101-darkred?style=flat-square&logo=youtube&logoColor=white&link=https://www.youtube.com/developerdeck101)](https://www.youtube.com/developerdeck101)
[![Instagram Badge](https://img.shields.io/badge/-developerdeck101_-purple?style=flat-square&logo=instagram&logoColor=white&link=https://instagram.com/developerdeck101_/)](https://instagram.com/developerdeck101_)
[![Linkedin Badge](https://img.shields.io/badge/-Bruno_Kilian-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brunokilian)](https://www.linkedin.com/in/brunokilian)
[![Twitter Badge](https://img.shields.io/badge/-DeveloperDeck101-blue?style=flat-square&logo=Twitter&logoColor=white&link=http://twitter.com/devdeck101)](http://twitter.com/devdeck101)
[![Discord Badge](https://img.shields.io/badge/-DeveloperDeck101-7289da?style=flat-square&logo=Discord&logoColor=white&link=http://discord.gg/GXQAVzn4Vn)](http://discord.gg/GXQAVzn4Vn)

## Apoiar o Projeto e o Canal

[![Youtube Badge](https://img.shields.io/badge/-Membros_do_Canal-darkred?style=flat-square&logo=youtube&logoColor=white&link=https://www.youtube.com/channel/UCj75B_51OXb9qH15wiHs-Hw/join)](https://www.youtube.com/channel/UCj75B_51OXb9qH15wiHs-Hw/join)
[![Static Badge](https://img.shields.io/badge/LivePix-Apoie_o_Canal_e_Projeto-blue?logo=Livepix&logoColor=%23ffffff&labelColor=blue&color=%23ffffff)](https://livepix.gg/brkilian)
[![Static Badge](https://img.shields.io/badge/LivePix_QR_CODE-Apoie_o_Canal_e_Projeto-blue?logo=Livepix&logoColor=%23ffffff&labelColor=blue&color=%23ffffff)](https://widget.livepix.gg/embed/80b6ae11-d611-464b-b3f0-2db50d84d6ee)



