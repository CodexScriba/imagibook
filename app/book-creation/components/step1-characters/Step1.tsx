// components/Step1.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import Characters from "./Characters";
import CharacterType from "./CharacterType";

const Step1: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <Characters />
      <CharacterType />
    </div>
  );
};

export default Step1;
