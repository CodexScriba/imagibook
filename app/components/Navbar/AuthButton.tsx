//app/components/Navvbar/AuthButton.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";

const AuthButton = () => {
	return (
		<Button asChild>
			<Link href="/auth">{m.navbar_authButton()}</Link>
		</Button>
	);
};

export default AuthButton;
