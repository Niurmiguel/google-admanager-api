export abstract class AdsReportUtilities {
  private WAIT_PERIOD: number = 30 * 1000;

  /**
   * Returns a flag indicating whether the caller should wait more time for
   * the report download to complete.
   * @returns True, if the caller should wait more, false otherwise.
   */
  protected async shouldWaitMore(): Promise<boolean> {
    return false;
  }

  protected schedule(): void {}
  protected abstract getReport(): any;

  /**
   * Gets the report download response.
   * @returns The report response.
   */
  async getResponse(): Promise<any> {
    this.schedule();
    while (await this.shouldWaitMore()) {
      new Promise((resolve) => setTimeout(resolve, this.WAIT_PERIOD));
    }

    return this.getReport();
  }
}
