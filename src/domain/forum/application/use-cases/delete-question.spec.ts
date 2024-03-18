import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-01',
      authorId: 'author-01',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(async () => {
      await sut.execute({
        authorId: 'autor-diferente',
        questionId: 'question-01',
      })
    }).rejects.toThrow('Not allowed.')
  })
})
