import { auth } from "@/auth";

const ProtectedRoute = async () => {
  const session = await auth();
  if (!session)
    return <div>Usuário deve estar autenticado para acessar esta rota</div>;
  return (
    <div>
      Protected Route - Usuário deve estar logado.
      <div>{JSON.stringify(session, null, 2)}</div>
    </div>
  );
};

export default ProtectedRoute;
