import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({ closeCreateActivityModal } : CreateActivityModalProps) {

  function createActivity(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    const data = new FormData(event.currentTarget)
    
    const title = data.get('title')?.toString
    const occours_at = data.get('occurs_at')?.toString
    
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold"> Register activity  </h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            All guests can see the activities
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input 
            name="title" 
            placeholder="What is the activity ?" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-1 items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
              type="datetime-local"
              name="occurs-at"
              placeholder="Date and time of the activity"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>
          </div>

          <Button variant="primary" size="full">
            Save activity 
          </Button>
        </form>

      </div>
    </div>
  )
}