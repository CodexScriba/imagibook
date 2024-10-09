// components/IllustrationCarousel.tsx

"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { IllustrationData } from "@/constants/IllustrationData";


export const IllustrationCarousel: React.FC = () => {
  const { setValue, watch } = useFormContext();

  const selectedIllustrationStyle = watch("illustrationStyle");

  const handleSelectStyle = (styleValue: string) => {
    setValue("illustrationStyle", styleValue, { shouldValidate: true });
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm mx-auto mb-6"
    >
      <CarouselContent>
        {IllustrationData.map((item) => (
          <CarouselItem key={item.value}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {item.description}
                  </p>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded-md mb-4"
                  />
                  <Button
                    variant={
                      selectedIllustrationStyle === item.value
                        ? "default" // Changed "primary" to "default"
                        : "secondary"
                    }
                    onClick={() => handleSelectStyle(item.value)}
                  >
                    {selectedIllustrationStyle === item.value
                      ? "Selected"
                      : "Select this illustration style"}
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
  );
};
