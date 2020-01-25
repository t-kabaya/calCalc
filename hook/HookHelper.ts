import { useState } from 'react'

export const hookFactory = (preStates: any): any => {
  const hooks = {}

  preStates.forEach((preState: any) => {
    const [state, setState] = useState(preState[1])
    hooks[preState[0]] = state
    hooks['set' + capitalize(preState[0])] = setState
  })

  return hooks
}

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)
