import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wand2, BookOpen } from 'lucide-react';

interface CreationModeSelectorProps {
  mode: 'magicWand' | 'storybookStudio';
  onModeChange: (mode: 'magicWand' | 'storybookStudio') => void;
}

const CreationModeSelector: React.FC<CreationModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Select Creation Mode</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all ${
            mode === 'magicWand' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onModeChange('magicWand')}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="w-5 h-5 mr-2" />
              Magic Wand Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Craft magical stories with minimal effort. Let our AI-powered storyteller weave enchanting tales based on your ideas. Perfect for quick, effortless creation of captivating narratives.
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${
            mode === 'storybookStudio' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onModeChange('storybookStudio')}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Storybook Studio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Step into your personal writer's workshop. Here, you have the tools to carefully construct your narrative, fine-tune characters, and build rich, detailed worlds. Ideal for those who enjoy a hands-on approach to crafting the perfect story.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreationModeSelector;