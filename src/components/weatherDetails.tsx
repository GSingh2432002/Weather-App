import type { WeatherData } from "@/api/types"; 
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree?: number) => {
    if (degree === undefined) return "N/A";
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    let normalizedDegree = degree % 360;
    if (normalizedDegree < 0) normalizedDegree += 360;
    const index = Math.round(normalizedDegree / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys?.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys?.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind?.deg)} (${wind?.deg ?? 0}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main?.pressure ?? "N/A"} hPa`,
      icon: Gauge,
      color: "text-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">{detail.title}</p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
