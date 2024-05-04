import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProtectedRoute = async () => {
  const session = await auth();
  return (
    <div>
      <div>Usuário deve estar autenticado para acessar esta rota</div>
      <div>Sessão: {JSON.stringify(session, null, 2)}</div>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant={"default"} type="submit">
            Sair
          </Button>
        </form>
      ) : (
        <Button variant={"default"} asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default ProtectedRoute;
