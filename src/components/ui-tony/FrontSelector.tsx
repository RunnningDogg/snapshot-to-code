import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function FrontSelector({ className }: Props) {
  return (
    <div className={cn(className)}>
      <h2 className="text-2xl font-semibold mb-6">Select Code Type</h2>

      <RadioGroup defaultValue="react">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="react" id="r1" />
          <Label htmlFor="r1">React</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="html" id="r2" />
          <Label htmlFor="r2">HTML</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
