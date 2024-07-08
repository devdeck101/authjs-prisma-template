import { auth } from "@/auth";
import LoginBadge from "@/components/auth/login-badge";
import { Input } from "@/components/ui/input";
import { Fingerprint, Search } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

const Navbar = async () => {
	const session = await auth();
	return (
		<>
			<nav className="hidden flex-col  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Fingerprint className="h-6 w-6 text-green-500" />
					<span className="sr-only">DeveloperDeck101 - Authjs</span>
				</Link>
				<Link href="#" className="text-foreground transition-colors hover:text-foreground">
					HOME
				</Link>
				<Link
					href="/docs"
					className="text-muted-foreground transition-colors hover:text-foreground min-w-fit z-50"
				>
					Docs
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					Servidor
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					Cliente
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					API
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					Middleware
				</Link>
				<Link
					href="/example/multi-step-form/campaign"
					className="text-muted-foreground transition-colors hover:text-foreground min-w-fit z-50"
				>
					Multi-Step-Form
				</Link>
				<Link
					href="/example/web-site-builder/campaign"
					className="text-muted-foreground transition-colors hover:text-foreground min-w-fit z-50"
				>
					Website Builder
				</Link>

			</nav>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Exemplo de pesquisa..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<LoginBadge user={session?.user} />
				<ThemeToggle />
			</div>
		</>
	);
};

export default Navbar;
