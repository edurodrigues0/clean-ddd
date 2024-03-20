import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { ListRecentQuestionsUseCase } from './list-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: ListRecentQuestionsUseCase

describe('List Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to list recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 20),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 18),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 16),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 16) }),
    ])
  })

  it('should be able to list paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})
