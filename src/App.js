import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    // 1에서 45 사이의 중복되지 않은 정수 6개 반환
    const lotto = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    // console.log(lotto);

    const input = await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n')
    const parseInput = parseInt(input, 10);

    // TODO 유효성 검사 분리
    // TODO 에러 메시지 상수처리
    const validate = (input) => {
      if (typeof input !== 'number') {
        throw new Error('[ERROR] 입력값이 올바르지 않습니다.')
      }
      if (input < 1000) {
        throw new Error('[ERROR] 최소 1,000원 이상 입력해야 합니다.')
      }
      if (input % 1000 !== 0) {
        throw new Error('[ERROR] 입력값이 1,000원 단위로 나누어 떨어지지 않습니다.')
      }
    }

    validate(parseInput);
  }
}

export default App;
