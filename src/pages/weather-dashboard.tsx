import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeolocation();
  console.log(coordinates);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          // onClick={}
          // disabled={}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherDashboard;
