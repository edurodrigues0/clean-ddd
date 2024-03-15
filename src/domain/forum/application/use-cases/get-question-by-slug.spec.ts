import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)

    const newQuestion = Question.create({
      authorId: new UniqueEntityID('author-01'),
      content: 'Conteúdo da pergunta',
      title: 'Slug Teste',
    })

    inMemoryQuestionsRepository.create(newQuestion)
  })

  it('should be able to get a question by slug', async () => {
    const { question } = await sut.execute({
      slug: 'slug-teste',
    })

    expect(question.slug.value).toEqual('slug-teste')
  })

  it('not should be able to get a question with wrong slug', async () => {
    await expect(async () => {
      await sut.execute({
        slug: 'slug-errada',
      })
    }).rejects.toThrow('Question not found')
  })
})
