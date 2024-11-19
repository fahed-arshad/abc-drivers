"use client";

import { useState } from "react";

import Headline from "../components/headline";
import { Separator } from "@/components/ui/separator";
import AvailabilityBlock, {
  Availability,
  Days,
} from "./components/availability-block";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { ClockIcon } from "lucide-react";

function OperatingHoursPage() {
  const [operating24Hours, setOperating24Hours] = useState(false);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const handleSubmit = async () => {
    //
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title="OPERATING HOURS" icon={ClockIcon} />
        <Separator />
      </div>

      <div className="flex items-center flex-wrap space-x-2 border rounded-lg px-4 py-6 mt-8">
        <Switch
          id="24hours"
          checked={operating24Hours}
          onCheckedChange={setOperating24Hours}
        />
        <Label htmlFor="24hours">Operating 24 Hours</Label>
      </div>

      {!operating24Hours && (
        <div className="mt-8 space-y-4 px-4 max-w-md">
          {Days.map((day) => (
            <AvailabilityBlock
              key={day}
              availability={
                availabilities.find((a) => a.day === day) || {
                  day,
                  isAvailable: false,
                  open: "8:00 AM",
                  close: "4:00 PM",
                }
              }
              onChange={(availability) => {
                const newAvailabilities = availabilities.filter(
                  (a) => a.day !== day
                );
                newAvailabilities.push(availability);
                setAvailabilities(newAvailabilities);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OperatingHoursPage;
