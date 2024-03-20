import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { QuestionNotFoundError } from '../errors/question-not-found-error'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('slug-teste'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'slug-teste',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]?.title).toEqual(
      newQuestion.title,
    )
  })

  it('not should be able to get a question with wrong slug', async () => {
    const result = await sut.execute({
      slug: 'slug-errada',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(QuestionNotFoundError)
  })
})
