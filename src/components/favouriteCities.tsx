import { useFavourite } from "@/hooks/useFavourite";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/useWeather";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface FavouriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavouriteCities = () => {
  const { favourites, removeFavourite } = useFavourite();

  if (!favourites.length) {
    return null;
  }
  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favourites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favourites.map((city) => {
            return (
              <FavouriteCityTablet
                key={city.id}
                {...city}
                onRemove={() => removeFavourite.mutate(city.id)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

function FavouriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavouriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favourites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default FavouriteCities;
