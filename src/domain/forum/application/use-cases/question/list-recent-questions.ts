import { Question } from '../../../enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface ListRecentQuestionsUseCaseRequest {
  page: number
}

interface ListRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
