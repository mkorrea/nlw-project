import { AtSign, Plus, User } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  createTrip: () => void
}

export function ConfirmTripModal( {
  addNewEmailToInvite,
  closeConfirmTripModal,
  createTrip,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold"> Confirm trip creation  </h2>
            <button onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            To complete the trip creation to <span className="font-semibold text-zinc-100">Florianópolis, Brazil</span> from <span className="font-semibold text-zinc-100">August 16 to 27, 2024</span>, fill in your details below:
          </p>
        </div>

        <form onSubmit={addNewEmailToInvite} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input 
            name="name" 
            placeholder="Your full name" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input 
            type="email" 
            name="email" 
            placeholder="Your personal email" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
          </div>

          <button onClick={createTrip} type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center">
            Confirm trip creation
            <Plus className="size-5" />
          </button>
        </form>

      </div>
    </div>
  )
}