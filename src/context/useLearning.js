import { useContext } from 'react'
import { LearningContext } from './learning-context.js'

export function useLearning() {
  const context = useContext(LearningContext)
  if (!context) throw new Error('useLearning must be used within LearningProvider')
  return context
}
