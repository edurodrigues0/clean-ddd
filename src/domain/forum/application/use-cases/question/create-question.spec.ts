import { beforeEach } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-01',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta.',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
