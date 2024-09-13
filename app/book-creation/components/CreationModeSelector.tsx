import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wand2, BookOpen } from 'lucide-react';
import * as m from "@/paraglide/messages";

interface CreationModeSelectorProps {
  mode: 'magicWand' | 'storybookStudio';
  onModeChange: (mode: 'magicWand' | 'storybookStudio') => void;
}

const CreationModeSelector: React.FC<CreationModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{m.selectCreationMode()}</h2>
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
              {m.magicWandMode()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {m.magicWandDescription()}
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
              {m.storybookStudioMode()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {m.storybookStudioDescription()}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreationModeSelector;