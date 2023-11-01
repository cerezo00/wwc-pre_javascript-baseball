import { Console, Random } from '@woowacourse/mission-utils';
import Strings from './resources/Strings';
import Board from './Board';


class GameManager {

	/** @type {Board} */
	#board = null;

	/**
	 * GameManager를 실행한다.
	 */
	async play() {
		do {
			this.#startGame();
			await this.#playGame();
			this.#finishGame();
		} while (await this.#willReplay());
	}

	/**
	 * 게임을 시작한다.
	 */
	#startGame() {
		Console.print(Strings.START);
		this.#board = new Board();
	}

	/**
	 * 정답을 맞출 때까지 게임을 진행한다.
	 */
	async #playGame() {
		do {
			await this.#board.getUserGuess();
			this.#board.checkUserGuess();
			this.#board.printFeedback();
		} while (!this.#board.isCorrectAnswer());
	}

	/**
	 * 게임을 마무리한다.
	 */
	#finishGame() {
		Console.print(Strings.FINISH);
	}

	/**
	 * 사용자로부터 재시작 여부를 입력받는다.
	 * [1 : ture, 2 : false]
	 * @returns {boolean}
	 * @throws [1, 2]를 제외한 값의 입력
	 */
	async #willReplay() {
		Console.print(Strings.REPLAY);
		const input = await Console.readLineAsync();
		if (input === '1') return true;
		if (input === '2') return false;
		throw new Error(Strings.ERROR_INPUT_REPLAY)
	}
}

export default GameManager;
