import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComments: AnswerComment) {
    this.items.push(answerComments)
  }
}
