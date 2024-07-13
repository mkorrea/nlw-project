import { ArrowRight, AtSign, Calendar, MapPin, Plus, Settings2, User, UserRoundPlus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";

export function CreateTripPage() {
  const navigate = useNavigate()

  const [ isGuestsInputOpen, setIsGuestsInputOpen ] = useState(false);
  const [ isGuestsModalOpen, setIsGuestsModalOpen ] = useState(false);
  const [ isConfirmTripModalOpen, setIsConfirmTripModalOpen ] = useState(false)

  const [ emailsToInvite, setEmailsToInvite ] = useState([
    'math@test.com', 'junior@test.com'
  ]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }
  
  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) { 
    // <HTMLFormElement> (no typescript, essa especificação se chama "generic") para especificar para o FormEvent que o evento é um formulário, porque o 'event' pode ser um input, select, form, etc
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString() // formData pode restornar uma string ou file (arquivo), entap preciso especificar com "?.toString()"

    if(!email) {
      return
    }

    if(emailsToInvite.includes(email)) {
      alert("email ja tem")
      return
    }

    setEmailsToInvite([
      ...emailsToInvite, 
      email
    ])

    event.currentTarget.reset() // reseta/apaga o evento aual (que é o input)
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip() {
    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Invite your friends and plan your next trip!
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Where are you going ?" className="bg-transparent text-lg placeholder-zinc-400 -none flex-1" />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="When ?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>
            <div className="w-px h-6 bg-zinc-800"></div>
            {isGuestsInputOpen ? (
              <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700" >
                Change location/date
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400" >
                Continue
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>
          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100 text-lg flex-1 text-left"> {emailsToInvite.length} people invited </span>
                ) : (
                  <span className="text-zinc-400 text-lg flex-1 text-left">Who will be on the trip ?</span>
                )}
              </button>

              <div className="w-px h-6 bg-zinc-800"></div>
              <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirm trip
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          By planning your trip with plann.er, you automatically agree to our  <a className="text-zinc-300 underline" href="#"> terms of use </a> and <a className="text-zinc-300 underline" href="#"> privacy policies. </a>
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal  
        emailsToInvite={emailsToInvite}
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestsModal={closeGuestsModal}
        removeEmailFromInvites={removeEmailFromInvites}
        />
      )}


      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}

    </div>
  );
}
