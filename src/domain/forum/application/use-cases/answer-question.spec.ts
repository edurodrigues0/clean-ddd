import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-01',
    questionId: 'question-01',
    content: 'Nova resposta.',
  })

  expect(answer.content).toEqual('Nova resposta.')
})
