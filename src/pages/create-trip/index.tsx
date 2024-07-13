import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./destination-and-date-step";
import { InviteGuestsStep } from "./invite-guests-step";

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

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
        <DestinationAndDateStep  
          closeGuestsInput={closeGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          openGuestsInput={openGuestsInput}
        />

      
      
      {isGuestsInputOpen && (
        <InviteGuestsStep 
          emailsToInvite={emailsToInvite}
          openConfirmTripModal={openConfirmTripModal}
          openGuestsModal={openGuestsModal}
        />
      )}
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

        <p className="text-sm text-zinc-500">
          By planning your trip with plann.er, you automatically agree to our  <a className="text-zinc-300 underline" href="#"> terms of use </a> and <a className="text-zinc-300 underline" href="#"> privacy policies. </a>
        </p>
      </div>
    </div>
  );
}
