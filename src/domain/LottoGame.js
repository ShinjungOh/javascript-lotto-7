import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import Utils from "../Utils.js";
import LottoWinner from "./LottoWinner.js";

class LottoGame {
  #lotto = [];

  async play() {
    await this.#createLotto();
  }

  async #createLotto() {
    const { prise, parsePrice } = await InputView.readLinePrice();

    this.validatePrice(prise);
    this.validateParsePrice(parsePrice);

    const getLottoCount = (number) => number / 1000;
    const lottoCount = getLottoCount(parsePrice);

    await this.#generateLotto(lottoCount);
    OutputView.printLotto(this.#lotto, lottoCount);

    const { trimLotto, parseLottoNumber } = await InputView.readLineNumber();
    const { bonusNumber, parseBonusNumber } = await InputView.readLineBonusNumber();

    this.#validateNumber(trimLotto);
    this.#validateBonusNumber(bonusNumber);

    const lottoWinner = new LottoWinner(parseLottoNumber, parseBonusNumber);
  }

  async #generateLotto(lottoCount) {
    const lotto = Utils.range(lottoCount, []).map(() => {
      return this.#getRandomLottoNumber();
    });
    this.#lotto.push(lotto);
  }

  getLotto() {
    return this.#lotto;
  }

  #getRandomLottoNumber() {
    return MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
  }

  #getSortNumber(array) {
    return array.sort(a - b);
  }

  validatePrice(input) {
    this.#validateIsInteger(input);
  }

  validateParsePrice(input) {
    this.#validateIsNumber(input);
    this.#validateIsOverThousand(input);
    this.#validateIsMultiplesOfThousand(input);
  }

  #validateIsNumber(input) {
    if (typeof input !== 'number') {
      throw new Error('[ERROR] 입력값이 올바르지 않습니다.')
    }
  }

  #validateIsOverThousand(input) {
    if (input < 1000) {
      throw new Error('[ERROR] 최소 1,000원 이상 입력해야 합니다.')
    }
  }

  #validateIsMultiplesOfThousand(input) {
    if (input % 1000 !== 0) {
      throw new Error('[ERROR] 입력값이 1,000원 단위로 나누어 떨어지지 않습니다.')
    }
  }

  #validateIsInteger(input) {
    if (input.includes('.')) {
      throw new Error('[ERROR] 소숫점을 입력할 수 없습니다.')
    }
  }

  #validateNumber(trimLotto) {
    this.#validateLottoNumber(trimLotto);
    trimLotto.forEach((number) => this.#validateIsInteger(number))
  };

  #validateBonusNumber(bonusNumber) {
    this.#validateIsOneNumber(bonusNumber);
    this.#validateIsInteger(bonusNumber);
  };

  #validateLottoNumber(input) {
    if (input.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  #validateIsOneNumber(input) {
    if (input.includes(',')) {
      throw new Error('[ERROR] 보너스 번호는 1개 입력해야 합니다.')
    }
  }

  #validateNumberIsInteger(input) {
    input.forEach((number) => this.#validateIsInteger(number));
  }
}

export default LottoGame;
