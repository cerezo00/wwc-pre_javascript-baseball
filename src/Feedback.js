import { Console, Random } from '@woowacourse/mission-utils';
import Strings from './resources/Strings';


class Feedback {

  /** @type {string} */
  #feedback = null;

  /** @type {number} */
  #balls = null;

  /** @type {number} */
  #strikes = null;

  /**
   * 객체 생성 시, 피드백을 생성한다.
   * @param {number} balls 
   * @param {number} strikes 
   */
  constructor(balls, strikes) {
    this.#balls = balls;
    this.#strikes = strikes;
    this.#makeFeedback();
  }

  /**
   * 피드백을 생성한다.
   * - 낫싱
   * - ${balls}볼
   * - ${strikes}스트라이크
   * - ${balls}볼 ${strikes}스트라이크
   */
  #makeFeedback() {
    let string = ''
    if (this.#balls) string += this.#balls + Strings.BALL + Strings.SPACE;
    if (this.#strikes) string += this.#strikes + Strings.STRIKE;
    if (!string) string += Strings.NOTHING
    this.#feedback = string;
  }

  /**
   * 피드백을 출력한다.
   */
  print() {
    Console.print(this.#feedback);
  }

  /**
   * strikes를 반환한다.
   * @returns {number}
   */
  getStrikes() {
    return this.#strikes;
  }
}

export default Feedback;
