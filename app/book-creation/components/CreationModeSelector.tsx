import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Wand2, BookOpen } from "lucide-react";
import * as m from "@/paraglide/messages";

const CreationModeSelector: React.FC = () => {
  const { register, watch } = useFormContext();
  const mode = watch("mode");

  const options = [
    {
      id: "magicWand",
      title: m.magicWandMode(),
      description: m.magicWandDescription(),
      icon: Wand2,
    },
    {
      id: "storybookStudio",
      title: m.storybookStudioMode(),
      description: m.storybookStudioDescription(),
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{m.selectCreationMode()}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((item) => (
          <Card
            key={item.id}
            role="button"
            className={`cursor-pointer transition-all ${
              mode === item.id ? "border-primary" : ""
            }`}
          >
            <CardHeader className="py-2">
              <CardTitle className="flex items-center text-sm font-semibold">
                <item.icon className="w-5 h-5 mr-2" />
                <label htmlFor={item.id}>{item.title}</label>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <CardDescription className="text-xs">{item.description}</CardDescription>
              <input
                type="radio"
                id={item.id}
                value={item.id}
                {...register("mode")}
                className="sr-only"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreationModeSelector;