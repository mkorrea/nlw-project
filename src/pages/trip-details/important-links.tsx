import { Link2, Plus } from "lucide-react";


export function ImportantLinks() {
  return (
    <div className="space-y-6 font-semibold text-xl"> 
      <h2>Important Links</h2> 
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">AirBnB reservation</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/10470001194679234923942
            </a>
          </div>
          <Link2 className="size-5 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="block font-medium text-zinc-100">AirBnB reservation</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/10470001194679234923942
            </a>
          </div>
          <Link2 className="size-5 text-zinc-400" />
        </div>

        </div>
        <button className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700" >
        <Plus className="size-5" />
        Register new link
      </button>
    </div>  
  )
}