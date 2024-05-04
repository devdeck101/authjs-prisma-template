import { CredentialsSignin } from "next-auth";
//https://authjs.dev/reference/core/providers/credentials#authorize
class InvalidCredentials extends CredentialsSignin {
  code = "Credenciais Inválidas";
}

export { InvalidCredentials };
