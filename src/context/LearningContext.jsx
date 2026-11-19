import { useMemo, useState } from 'react'
import { learningPaths } from '../data/learningPaths.js'
import { LearningContext } from './learning-context.js'

const TRACK_KEY = 'mashwar-selected-track'
const PROGRESS_KEY = 'mashwar-completed-skills'

function readStoredValue(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

export function LearningProvider({ children }) {
  const [selectedTrackId, setSelectedTrackId] = useState(() => {
    const storedId = readStoredValue(TRACK_KEY, learningPaths[0].id)
    return learningPaths.some((path) => path.id === storedId) ? storedId : learningPaths[0].id
  })
  const [completedSkills, setCompletedSkills] = useState(() => readStoredValue(PROGRESS_KEY, {}))

  function selectTrack(trackId) {
    if (!learningPaths.some((path) => path.id === trackId)) return
    localStorage.setItem(TRACK_KEY, JSON.stringify(trackId))
    setSelectedTrackId(trackId)
  }

  function toggleSkill(trackId, skillId) {
    setCompletedSkills((current) => {
      const trackSkills = new Set(current[trackId] || [])
      if (trackSkills.has(skillId)) trackSkills.delete(skillId)
      else trackSkills.add(skillId)
      const next = { ...current, [trackId]: [...trackSkills] }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(
    () => ({ selectedTrackId, completedSkills, selectTrack, toggleSkill }),
    [selectedTrackId, completedSkills],
  )
  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}
