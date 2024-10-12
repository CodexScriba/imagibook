"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const Characters = () => {
	const [characters, setCharacters] = useState([
		{ id: 1, name: "Character 1" },
		{ id: 2, name: "Character 2" },
	]);
	const [activeTab, setActiveTab] = useState(1);
	const [showLeftChevron, setShowLeftChevron] = useState(false);
	const [showRightChevron, setShowRightChevron] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const addCharacter = () => {
		const newCharacter = {
			id: characters.length + 1,
			name: `Character ${characters.length + 1}`,
		};
		setCharacters([...characters, newCharacter]);
		setActiveTab(newCharacter.id);
	};

	const removeCharacter = (id: number) => {
		if (characters.length > 1) {
			setCharacters(characters.filter((char) => char.id !== id));
			if (activeTab === id) {
				setActiveTab(characters[0].id);
			}
		}
	};

	const handleScroll = (direction: "left" | "right") => {
		const container = scrollContainerRef.current;
		if (container) {
			const scrollAmount = direction === "left" ? -200 : 200;
			container.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScrollButtons = () => {
			setShowLeftChevron(container.scrollLeft > 0);
			setShowRightChevron(
				container.scrollLeft < container.scrollWidth - container.clientWidth,
			);
		};

		container.addEventListener("scroll", handleScrollButtons);
		handleScrollButtons(); // Initial check

		return () => container.removeEventListener("scroll", handleScrollButtons);
	}, [characters]);

	const CharacterTabs = () => (
		<div className="relative hidden md:flex items-center">
			{showLeftChevron && (
				<Button
					variant="ghost"
					size="icon"
					className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 hover:bg-opacity-100 transition"
					onClick={() => handleScroll("left")}
					aria-label="Scroll Left"
				>
					<ChevronLeft className="w-4 h-4" />
				</Button>
			)}
			<div
				ref={scrollContainerRef}
				className="flex overflow-x-auto space-x-2 pb-2 px-8 scrollbar-hide snap-x snap-mandatory"
			>
				<Button
					variant="ghost"
					onClick={addCharacter}
					className="whitespace-nowrap flex-shrink-0 flex items-center"
				>
					<Plus className="w-4 h-4 mr-1" /> New
				</Button>
				{characters.map((character) => (
					<Button
						key={character.id}
						variant={activeTab === character.id ? "default" : "outline"}
						onClick={() => setActiveTab(character.id)}
						className={clsx(
							"whitespace-nowrap flex-shrink-0",
							activeTab === character.id ? "bg-blue-500 text-white" : "",
						)}
					>
						{character.name}
					</Button>
				))}
			</div>
			{showRightChevron && (
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 hover:bg-opacity-100 transition"
					onClick={() => handleScroll("right")}
					aria-label="Scroll Right"
				>
					<ChevronRight className="w-4 h-4" />
				</Button>
			)}
		</div>
	);

	const CharacterDropdown = () => (
		<div className="md:hidden space-y-2">
			<Select
				onValueChange={(value) => setActiveTab(Number(value))}
				value={activeTab.toString()}
				aria-label="Select Character"
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select a character" />
				</SelectTrigger>
				<SelectContent>
					{characters.map((character) => (
						<SelectItem key={character.id} value={character.id.toString()}>
							{character.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				variant="outline"
				onClick={addCharacter}
				className="w-full flex justify-center items-center"
			>
				<Plus className="w-4 h-4 mr-1" /> New Character
			</Button>
		</div>
	);

	return (
		<Card className="w-full shadow-lg rounded-lg">
			<CardHeader>
				<CardTitle className="text-2xl font-semibold">
					Character Manager
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<CharacterTabs />
				<CharacterDropdown />
				{characters.map(
					(character) =>
						character.id === activeTab && (
							<div
								key={character.id}
								className="space-y-4 p-4 border rounded-md shadow-sm"
							>
								<div className="flex justify-between items-center">
									<h2 className="text-xl font-bold">{character.name}</h2>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeCharacter(character.id)}
										disabled={characters.length <= 1}
										aria-label={`Remove ${character.name}`}
									>
										<X className="w-4 h-4" />
									</Button>
								</div>
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										placeholder="Enter character name"
										value={character.name}
									/>
								</div>
								<div>
									<Label htmlFor="age-group">Age Group</Label>
									<select
										id="age-group"
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
									<Switch id="main-character" />
									<Label htmlFor="main-character">Main Character</Label>
								</div>
								<div>
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
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
