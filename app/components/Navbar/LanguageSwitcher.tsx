import React from "react";
import { usePathname } from "@/lib/i18n";
import { Globe } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

const LanguageSwitcher = () => {
	const pathname = usePathname();
	const params = useParams();

	const languages = [
		{ code: "en", name: "English" },
		{ code: "es", name: "Español" },
	];
};
