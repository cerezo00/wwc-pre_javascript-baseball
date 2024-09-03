import { Random, Console } from '@woowacourse/mission-utils';

class App {
  play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    const computerNumbers = this.generateComputerNumbers();
    this.gameLoop(computerNumbers);
  }

  generateComputerNumbers() {
    const computerNumbers = [];
    while (computerNumbers.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computerNumbers.includes(number)) {
        computerNumbers.push(number);
      }
    }
    return computerNumbers;
  }

  gameLoop(computerNumbers) {
    Console.readLine('숫자를 입력해주세요 : ', (userInput) => {
      if (!/^\d{3}$/.test(userInput)) {
        throw new Error('잘못된 입력입니다. 3자리 숫자를 입력해주세요.');
      }

      const userNumbers = [...userInput].map(Number);
      const result = this.calculateResult(computerNumbers, userNumbers);
      Console.print(result);

      if (result === '3스트라이크') {
        Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
        Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (restart) => {
          if (restart === '1') {
            this.play(); // 재시작
          } else if (restart === '2') {
            Console.close(); // 종료
          } else {
            throw new Error('잘못된 입력입니다.');
          }
        });
      } else {
        // 잘못된 재귀 대신 반복적으로 gameLoop 호출
        this.gameLoop(computerNumbers);
      }
    });
  }

  calculateResult(computerNumbers, userNumbers) {
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
      if (userNumbers[i] === computerNumbers[i]) {
        strikes += 1;
      } else if (computerNumbers.includes(userNumbers[i])) {
        balls += 1;
      }
    }

    if (strikes === 0 && balls === 0) {
      return '낫싱';
    }

    return `${balls > 0 ? balls + '볼 ' : ''}${strikes > 0 ? strikes + '스트라이크' : ''}`.trim();
  }
}

export default App;
