import { getUsers } from "@/actions/auth/users"
import UsersStats from "@/components/auth/users-stats";
import UsersTable from "@/components/auth/users-table"
import type { User } from "@/types/shared"

const Users = async () => {
    const users: User[] = await getUsers();
    return (
        <div className="flex flex-col w-full min-h-full items-center justify-start gap-4 m-2">
            <UsersStats users={users} />
            <UsersTable users={users} />
        </div>
    )
}

export default Users