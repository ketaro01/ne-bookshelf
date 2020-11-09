class CustomError extends Error {
  public response = {};

  constructor(response: object) {
    super(JSON.stringify(response));
    this.response = response;
  }
}

export default CustomError;
