import { Calendar, MapPin, X } from "lucide-react";
import { Input } from "../../components/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

interface ChangeDestinationAndDateProps {
  closeChangeDestinationAndDateModal: () => void
}

export function ChangeDestinationAndDate({ closeChangeDestinationAndDateModal }: ChangeDestinationAndDateProps) {

  const { tripId } = useParams()
  const [ trip, setTrip ] = useState<Trip | undefined>()
  const [ newDestination, setNewDestination ] = useState<string>('')

  const [ isNewDatePickerOpen, setIsNewDatePickerOpen ] = useState(false)

  function openNewDatePicker() {
    setIsNewDatePickerOpen(true)
  }
  function closeDatePicker() {
    setIsNewDatePickerOpen(false)
  }


  useEffect(() => {   
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  function changeLocation(event: ChangeEvent<HTMLInputElement>) {
    setNewDestination(event.currentTarget.value);
    if(event.currentTarget.value.length === 0) {
      setNewDestination(event.currentTarget.placeholder)
    }
  }
  
  function saveNewDestinationAndDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(!eventStartAndEndDates && !newDestination) {
      closeChangeDestinationAndDateModal()
      return
    }

    api.put(`/trips/${tripId}`, {
      destination: newDestination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to
    }).then(() => {
      if (trip) {
        setTrip({ ...trip, destination: newDestination });
      }
    }).catch((err) => {
      console.log(`error to update: + ${err}`)
    })

    closeChangeDestinationAndDateModal()
  }

  const [ eventStartAndEndDates, setEventStartAndEndDates ] = useState<DateRange | undefined>()

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "LLL dd").concat(' to ').concat(format(eventStartAndEndDates.to, "LLL dd"))
  : null

  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold"> Change Destination and Date </h2>
            <button onClick={closeChangeDestinationAndDateModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <form className="flex flex-col space-y-6" onSubmit={saveNewDestinationAndDate}>
            <div className="flex">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <Input
                  placeholder={trip?.destination}
                  onChange={changeLocation}
                />
              </div>
              <div onClick={openNewDatePicker} className="flex items-center gap-2 text-left cursor-pointer">
                <Calendar className="size-5 text-zinc-400" />
                <span
                  className="text-lg text-zinc-400 w-40 flex-1" >
                  {displayedDate ? displayedDate : 'When ?'}
                </span>
              </div>
            </div>

            <Button size="full" type="submit" >
              Save
            </Button> 
          </form>
        </div>

        {isNewDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold"> Select the date </h2>
                  <button onClick={closeDatePicker}>
                    <X  className="size-5 text-zinc-400" />
                  </button>
                </div>
    
              </div>
    
              <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
    
            </div>
          </div>
        )}

      </div>
    </div>
  )
}