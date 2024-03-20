import { Either, left, right } from '@/core/either'
import { QuestionNotFoundError } from '../errors/question-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  QuestionNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new QuestionNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right({})
  }
}
