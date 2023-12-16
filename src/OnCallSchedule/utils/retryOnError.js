import OutputView from "../UI/OutputView.js";

const retryOnErrorAsync = async (asyncCallback) => {
  try {
    return await asyncCallback();
  } catch (error) {
    OutputView.printError(error);
    return retryOnErrorAsync(asyncCallback);
  }
};

export default retryOnErrorAsync;
