'use client'

import type { Guestbook } from '@/components/comments/usePost'
import { useEffect, useState, type ReactNode } from 'react'
import { SubmitButton } from '../(site)/guestbook/form'
import { deleteGuestbookEntries } from '@/db/actions'

type GForm = {
  entries: Guestbook[]
}
export default function Form({ entries }: GForm) {
  const [selectedInputs, setSelectedInputs] = useState<string[]>([])
  const [startShiftClickIndex, setStartShiftClickIndex] = useState<number>(0)
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false)
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false)

  useEffect(() => {
    const keyDownHandler = ({ key }: { key: string }) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(true)
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(true)
      }
    }
    const keyUpHandler = ({ key }: { key: string }) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(false)
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(false)
      }
    }

    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  const handleNormalClick = (checked: boolean, id: string, index: number) => {
    setSelectedInputs((prevInputs) =>
      checked
        ? [...prevInputs, id]
        : prevInputs.filter((inputId) => inputId !== id)
    )
    setStartShiftClickIndex(index)
  }

  const handleCommandClick = (id: string) => {
    setSelectedInputs((prevInputs) =>
      prevInputs.includes(id)
        ? prevInputs.filter((inputId) => inputId !== id)
        : [...prevInputs, id]
    )
  }

  const handleShiftClick = (index: number, checked: boolean) => {
    const startIndex = Math.min(startShiftClickIndex, index)
    const endIndex = Math.max(startShiftClickIndex, index)

    setSelectedInputs((prevInputs) => {
      const newSelection = entries
        .slice(startIndex, endIndex + 1)
        .map((item: { id: any }) => item.id)

      if (checked) {
        const combinedSelection = Array.from(
          new Set([...prevInputs, ...newSelection])
        )
        return combinedSelection
      }
      return prevInputs.filter((inputId) => !newSelection.includes(inputId))
    })
  }

  const handleCheck = (checked: boolean, id: string, index: number) => {
    if (isCommandKeyPressed) {
      handleCommandClick(id)
    } else if (isShiftKeyPressed && startShiftClickIndex !== null) {
      handleShiftClick(index, checked)
    } else {
      handleNormalClick(checked, id, index)
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    index: number
  ) => {
    if (event.key === 'Enter') {
      // Check if the checkbox was already selected
      const isChecked = selectedInputs.includes(id)

      // Toggle the checkbox
      handleCheck(!isChecked, id, index)
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await deleteGuestbookEntries(selectedInputs)
      }}
    >
      <SubmitButton name="delete" isActive={selectedInputs.length !== 0} />
      {entries.map((entry, index) => (
        <GuestbookEntry key={index} entry={entry}>
          <input
            name={String(entry.id)}
            type="checkbox"
            className="mr-2 w-4 h-4"
            onChange={(e) =>
              handleCheck(e.target.checked, String(entry.id), index)
            }
            onKeyDown={(e) => handleKeyDown(e, String(entry.id), index)}
            checked={selectedInputs.includes(String(entry.id))}
          />
        </GuestbookEntry>
      ))}
    </form>
  )
}

type GEntry = {
  entry: Guestbook
  children: ReactNode
}

function GuestbookEntry({ entry, children }: GEntry) {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words items-center flex">
        {children}
        <span className="text-neutral-600 dark:text-neutral-400 mr-1 border-neutral-100">
          {entry.author.name}:
        </span>
        {entry.body}
      </div>
    </div>
  )
}
