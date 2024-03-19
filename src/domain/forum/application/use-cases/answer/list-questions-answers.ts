import { Answer } from '../../../enterprise/entities/answer'
import { AnswersRepository } from '../../repositories/answers-repository'

interface ListQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface ListQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class ListQuestionAnswersUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
