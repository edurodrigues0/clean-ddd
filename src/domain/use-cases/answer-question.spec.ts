import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorId: 'instructor-01',
    questionId: 'question-01',
    content: 'Nova resposta.',
  })

  expect(answer.content).toEqual('Nova resposta.')
})