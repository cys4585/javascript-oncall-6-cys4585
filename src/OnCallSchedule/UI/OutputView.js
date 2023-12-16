import { Console } from "@woowacourse/mission-utils";

class OutputView {
  static printError(error) {
    Console.print(error.message);
  }
}

export default OutputView;
