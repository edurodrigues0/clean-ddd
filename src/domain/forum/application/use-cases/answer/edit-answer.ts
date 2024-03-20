import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../../repositories/answers-repository'
import { AnswerNotFoundError } from '../errors/answer-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'
import { Either, left, right } from '@/core/either'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  AnswerNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new AnswerNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
