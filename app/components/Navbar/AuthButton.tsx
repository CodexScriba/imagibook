import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";

const AuthButton = () => {
  return (
    <Button asChild>
      <Link href="/auth">
        {m.navbarAuthButton()}
      </Link>
    </Button>
  );
};

export default AuthButton;