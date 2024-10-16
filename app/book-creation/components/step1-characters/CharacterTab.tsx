// components/CharacterTab.tsx

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import * as m from "@/paraglide/messages";
import { useFormContext, type FieldArrayWithId } from "react-hook-form";
import type { FormValues } from "@/app/context/schemas";

interface CharacterTabProps {
	fields: FieldArrayWithId<FormValues, "characters">[];
	activeTab: number;
	setActiveTab: React.Dispatch<React.SetStateAction<number>>;
	addCharacter: () => void;
}

const CharacterTab: React.FC<CharacterTabProps> = ({
	fields,
	activeTab,
	setActiveTab,
	addCharacter,
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);

	const { watch } = useFormContext<FormValues>();

	const handleScroll = (direction: "left" | "right") => {
		const container = scrollContainerRef.current;
		if (container) {
			const scrollAmount = direction === "left" ? -150 : 150;
			container.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	useEffect(() => {
		const updateArrows = () => {
			const container = scrollContainerRef.current;
			if (container) {
				const { scrollLeft, scrollWidth, clientWidth } = container;
				setShowLeftArrow(scrollLeft > 0);
				setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
			}
		};

		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener("scroll", updateArrows);
			updateArrows();
		}

		return () => {
			if (container) {
				container.removeEventListener("scroll", updateArrows);
			}
		};
	}, []);

	return (
		<div className="relative w-full overflow-hidden">
			{showLeftArrow && (
				<Button
					variant="ghost"
					size="icon"
					className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent hover:bg-gray-100 p-1"
					onClick={() => handleScroll("left")}
					aria-label="Scroll Left"
				>
					<ChevronLeft className="w-4 h-4 text-gray-600" />
				</Button>
			)}

			<div
				className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide w-full"
				ref={scrollContainerRef}
			>
				{/* Add Character Button */}
				<Button
					variant="ghost"
					onClick={addCharacter}
					className="whitespace-nowrap flex items-center shrink-0"
				>
					<Plus className="w-4 h-4 mr-1" />
					{m.characters_buttons_add()}
				</Button>

				{fields.map((field, index) => (
					<Button
						key={field.id}
						variant={activeTab === index ? "default" : "outline"}
						onClick={() => setActiveTab(index)}
						className={clsx(
							"whitespace-nowrap shrink-0",
							activeTab === index
								? "bg-indigo-500 text-white"
								: "text-gray-700",
						)}
					>
						{watch(`characters.${index}.name`) || `Character ${index + 1}`}
					</Button>
				))}
			</div>

			{showRightArrow && (
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent hover:bg-gray-100 p-1"
					onClick={() => handleScroll("right")}
					aria-label="Scroll Right"
				>
					<ChevronRight className="w-4 h-4 text-gray-600" />
				</Button>
			)}
		</div>
	);
};

export default CharacterTab;
