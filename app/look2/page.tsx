"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const Characters = () => {
	const [characters, setCharacters] = useState([
		{ id: 1, name: "Character 1" },
		{ id: 2, name: "Character 2" },
	]);
	const [activeTab, setActiveTab] = useState(1);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);
	const [nextId, setNextId] = useState(3); // Initialize nextId to ensure unique IDs

	const addCharacter = () => {
		const newCharacter = {
			id: nextId,
			name: "",
		};
		setCharacters([...characters, newCharacter]);
		setActiveTab(newCharacter.id);
		setNextId(nextId + 1); // Increment nextId for unique IDs

		// Scroll to the left to show the new character tab
		setTimeout(() => {
			scrollContainerRef.current?.scrollTo({
				left: scrollContainerRef.current.scrollWidth,
				behavior: "smooth",
			});
		}, 100);
	};

	const removeCharacter = (id: number) => {
		if (characters.length > 1) {
			const newCharacters = characters.filter((char) => char.id !== id);
			setCharacters(newCharacters);
			if (activeTab === id) {
				setActiveTab(newCharacters[0].id);
			}
		}
	};

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

	// Check if the active character's name is empty
	const isActiveCharacterNameEmpty =
		characters.find((char) => char.id === activeTab)?.name.trim() === "";

	return (
		<Card className="w-full space-y-6 shadow-lg rounded-lg">
			<CardHeader>
				<CardTitle className="text-2xl font-semibold">
					Character Manager
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Tabs with Arrows */}
				<div className="relative">
					{/* Left Arrow */}
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
						className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide px-8"
						ref={scrollContainerRef}
					>
						{/* New Character Button */}
						<Button
							variant="ghost"
							onClick={addCharacter}
							className="whitespace-nowrap flex-shrink-0 flex items-center"
							disabled={isActiveCharacterNameEmpty}
							aria-disabled={isActiveCharacterNameEmpty}
							title={
								isActiveCharacterNameEmpty
									? "Please enter a name before adding a new character."
									: "Add new character"
							}
						>
							<Plus className="w-4 h-4 mr-1" />
							New
						</Button>

						{characters.map((character) => (
							<Button
								key={character.id}
								variant={activeTab === character.id ? "default" : "outline"}
								onClick={() => setActiveTab(character.id)}
								className={clsx(
									"whitespace-nowrap flex-shrink-0",
									activeTab === character.id
										? "bg-indigo-500 text-white"
										: "text-gray-700",
								)}
							>
								{character.name.trim() !== "" ? character.name : "Character"}
							</Button>
						))}
					</div>

					{/* Right Arrow */}
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

				{/* Active Character Content */}
				{characters.map(
					(character) =>
						character.id === activeTab && (
							<div
								key={character.id}
								className="space-y-6 p-6 border rounded-lg shadow-sm bg-white"
							>
								<div className="flex justify-between items-center">
									<h2 className="text-2xl font-semibold">
										{character.name.trim() !== ""
											? character.name
											: "Character"}
									</h2>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeCharacter(character.id)}
										disabled={characters.length <= 1}
										className="text-red-500 hover:text-red-700"
										aria-label={`Remove ${
											character.name.trim() !== ""
												? character.name
												: "Character"
										}`}
									>
										<X className="w-5 h-5" />
									</Button>
								</div>

								<div>
									<Label htmlFor={`name-${character.id}`}>Name</Label>
									<Input
										id={`name-${character.id}`}
										placeholder="Enter character name"
										value={character.name}
										onChange={(e) => {
											const newName = e.target.value;
											const updatedCharacters = characters.map((char) =>
												char.id === character.id
													? { ...char, name: newName }
													: char,
											);
											setCharacters(updatedCharacters);
										}}
									/>
								</div>

								<div>
									<Label htmlFor={`age-group-${character.id}`}>Age Group</Label>
									<select
										id={`age-group-${character.id}`}
										className="w-full p-2 border rounded-md"
									>
										<option value="">Select age group</option>
										<option value="child">Child</option>
										<option value="teen">Teen</option>
										<option value="adult">Adult</option>
										<option value="senior">Senior</option>
									</select>
								</div>

								<div className="flex items-center space-x-2">
									<Switch id={`main-character-${character.id}`} />
									<Label htmlFor={`main-character-${character.id}`}>
										Main Character
									</Label>
								</div>

								<div>
									<Label htmlFor={`description-${character.id}`}>
										Description
									</Label>
									<Textarea
										id={`description-${character.id}`}
										placeholder="Enter character description"
									/>
								</div>
							</div>
						),
				)}
			</CardContent>
		</Card>
	);
};

export default Characters;
