"use client";

import { Moon, Sun, Laptop, MoonStar } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Component() {
	const { setTheme } = useTheme();

	return (
		<nav className="flex h-14 items-center justify-between bg-transparent px-4 lg:px-6">
			<div className="flex items-center">
				<Link href="/" prefetch={false} className="flex items-center">
					<span className="text-2xl font-bold text-[color:var(--foreground)]">
						Logo
					</span>
				</Link>
			</div>
			<div className="hidden space-x-4 md:flex">
				<Link
					href="/"
					prefetch={false}
					className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] dark:text-[color:var(--foreground)] dark:hover:text-[color:var(--primary-foreground)]"
				>
					Home
				</Link>
				<Link
					href="/story-creation"
					prefetch={false}
					className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] dark:text-[color:var(--foreground)] dark:hover:text-[color:var(--primary-foreground)]"
				>
					Story Creation
				</Link>
				<Link
					href="/library"
					prefetch={false}
					className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] dark:text-[color:var(--foreground)] dark:hover:text-[color:var(--primary-foreground)]"
				>
					Library
				</Link>
			</div>
			<div className="flex items-center space-x-4">
				<Select>
					<SelectTrigger className="w-[115px] text-[color:var(--foreground)] dark:text-[color:var(--foreground)]">
						<SelectValue placeholder="Language" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="en">English</SelectItem>
						<SelectItem value="es">Español</SelectItem>
					</SelectContent>
				</Select>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<Sun className="h-[1.2rem] w-[1.2rem] text-[color:var(--primary)] dark:text-[color:var(--primary-foreground)] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] text-[color:var(--secondary)] dark:text-[color:var(--secondary)] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>
							<Sun className="mr-2 h-4 w-4 text-[color:var(--primary)]" />
							<span className="text-[color:var(--foreground)]">Light</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							<MoonStar className="mr-2 h-4 w-4 text-[color:var(--secondary)]" />
							<span className="text-[color:var(--foreground)]">Dark</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							<Laptop className="mr-2 h-4 w-4 text-[color:var(--accent)]" />
							<span className="text-[color:var(--foreground)]">System</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button asChild>
					<Link href="/auth" prefetch={false}>
						<span className="text-[color:var(--foreground)]">
							Sign-in/Sign-up
						</span>
					</Link>
				</Button>
			</div>
		</nav>
	);
}