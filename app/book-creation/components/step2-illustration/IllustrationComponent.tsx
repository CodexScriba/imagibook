// app/book-creation/components/IllustrationComponent.tsx

"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { illustrationData } from "@/constants/illustrationData";
import * as m from "@/paraglide/messages";

const IllustrationComponent = () => {
	const { control } = useFormContext();

	return (
		<Controller
			name="illustrationStyle"
			control={control}
			render={({ field, fieldState }) => (
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center">
							{m.step2_title()}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Carousel
							opts={{ align: "start" }}
							className="w-full max-w-sm mx-auto mb-6"
						>
							<CarouselContent>
								{illustrationData.map((item, index) => (
									<CarouselItem key={index}>
										<div className="p-1">
											<Card>
												<CardContent className="flex flex-col items-center p-6">
													<h3 className="text-xl font-semibold mb-2">
														{item.title}
													</h3>
													<p className="text-sm text-muted-foreground text-center mb-4">
														{item.description}
													</p>
													<img
														src={item.image}
														alt={item.title}
														className="w-full h-auto rounded-md mb-4"
													/>
													<Button
														type="button"
														onClick={() => field.onChange(item.value)}
														variant={
															field.value === item.value ? "primary" : "outline"
														}
													>
														{field.value === item.value
															? m.buttons_selected()
															: m.buttons_selectIllustrationStyle()}
													</Button>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
						{fieldState.error && (
							<p className="text-red-500 text-sm mt-1">
								{fieldState.error.message}
							</p>
						)}
					</CardContent>
				</Card>
			)}
		/>
	);
};

export default IllustrationComponent;
