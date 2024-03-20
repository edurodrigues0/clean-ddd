import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from '../errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-01',
      title: 'Título editado',
      content: 'Conteúdo editado',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Título editado',
      content: 'Conteúdo editado',
    })
  })

  it('should not be able to edit question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-01'),
      },
      new UniqueEntityID('question-01'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'autor-diferente',
      questionId: newQuestion.id.toValue(),
      title: 'Título editado',
      content: 'Conteúdo editado',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
