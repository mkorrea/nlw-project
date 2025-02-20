import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

interface DestinationAndDateHeaderProps {
  openChangeDestinationAndDateModal: () => void
}

export function DestinationAndDateHeader({ openChangeDestinationAndDateModal }: DestinationAndDateHeaderProps) {
  const { tripId } = useParams()
  const [ trip, setTrip ] = useState<Trip | undefined>()

  useEffect(() => {   
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
  ? format(trip.starts_at, "LLL dd").concat(' to ').concat(format(trip.ends_at, "LLL dd"))
  : null

  // function changeLocationAndDate() {
    // api.put(`trips/${tripId}`, {
    //   destination,
    //   starts_at:
    //   ends_at: 
    // })
  // }
  
  return(
    <div className="px-4 h-16 rounded bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100"> { trip?.destination }</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100"> { displayedDate } </span>
        </div>
        
        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary" size="default" onClick={openChangeDestinationAndDateModal}>
          Change location/date 
          <Settings2 className="size-5" />
        </Button>
      </div>
      

    </div>
  )
}