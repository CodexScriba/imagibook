"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContextData } from "../../context/FormContext";
import CreationModeSelector from "../../components/CreationModeSelector";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";

const modeSchema = z.object({
    mode: z.enum(["magicWand", "storybookStudio"]), });

type ModeFormvalues = z.infer<typeof modeSchema>;

const Step1: React.FC = () => {
  const router = useRouter();
  const { formData, updateFormData } = useFormContextData();
  const methods = useForm<ModeFormvalues>({
    resolver: zodResolver(modeSchema),
    defaultValues: {
      mode: formData.mode,
    },
  });