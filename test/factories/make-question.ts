import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID('author-01'),
    title: 'Slug Teste',
    content: 'Conteúdo da pergunta',
    ...override,
  })

  return question
}
