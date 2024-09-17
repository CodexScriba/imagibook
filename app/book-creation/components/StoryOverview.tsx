// components/StoryOverview.tsx
"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"; // Adjust the import path as needed
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react"; // Example icon import
import { cn } from "@/lib/utils"; // Utility for conditional classNames

const StoryOverview: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <legend className="text-lg font-semibold flex items-center space-x-2">
        <BookOpen className="w-5 h-5" />
        <span>Story Overview: Set the Scene for Your Tale</span>
      </legend>
      <p className="text-sm text-muted-foreground">
        Tell us what happens in the story.
      </p>
      <Controller
        name="storyOverview"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id="storyOverview"
            placeholder='Example: "Noah gets his first bike. He\'s nervous and unsure if he can ride it. His father patiently teaches him, and his mother encourages him. Noah overcomes his fear and learns to ride confidently, bringing the family closer."'
            className={cn(
              "mt-1",
              errors.storyOverview ? "border-red-500" : "border-gray-300"
            )}
            rows={6}
          />
        )}
      />
      {errors.storyOverview && (
        <p className="text-sm text-red-600">
          {errors.storyOverview.message}
        </p>
      )}
    </div>
  );
};

export default StoryOverview;
