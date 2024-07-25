import { AtSign, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (OwnerName: string) => void
  setOwnerEmail: (OwnerEmail: string) => void
}

export function ConfirmTripModal( {
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold"> Confirm trip creation  </h2>
            <button onClick={closeConfirmTripModal}>
              <X  className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            To complete the trip creation to <span className="font-semibold text-zinc-100">New Jersey, United States</span> from <span className="font-semibold text-zinc-100">August 16 to 27, 2024</span>, fill in your details below:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <Input 
               name="name" 
               placeholder="Your full name"
               onChange={event => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <Input 
              type="email"
              name="email" 
              placeholder="Your personal email" 
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirm trip creation
          </Button>
        </form>

      </div>
    </div>
  )
}