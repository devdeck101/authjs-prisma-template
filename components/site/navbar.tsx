import { auth } from "@/auth";
import LoginBadge from "@/components/auth/login-badge";
import { Fingerprint } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

const Navbar = async () => {
	const session = await auth();
	return (
		<nav className="hidden  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:min-w-full md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
			<div className="flex flex-row w-full gap-4">
				<Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Fingerprint className="h-6 w-6 text-green-500" />
					<span className="sr-only">{"DeveloperDeck101 - Authjs"}</span>
				</Link>
				<Link href="#" className="text-foreground transition-colors hover:text-foreground">
					{"HOME"}
				</Link>
				<Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground min-w-fit z-50">
					{"Docs"}
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					{"Servidor"}
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					{"Cliente"}
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					{"API"}
				</Link>
				<Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
					{"Middleware"}
				</Link>
				<Link
					href="/example/multi-step-form/campaign"
					className="text-muted-foreground transition-colors hover:text-foreground min-w-fit z-50"
				>
					{"Multi-Step-Form"}
				</Link>
				<Link
					href="/example/web-site-builder/campaign-hot-page"
					className="text-muted-foreground transition-colors hover:text-foreground min-w-fit z-50"
				>
					{"Website Builder"}
				</Link>
			</div>

			<div className="flex  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
				<LoginBadge user={session?.user} />
				<ThemeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
