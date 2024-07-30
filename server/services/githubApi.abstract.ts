export abstract class GithubApi {
  abstract history(): Promise<unknown>;

  abstract trigger(): Promise<unknown>;

  abstract getLogs(jobId: string): Promise<unknown>;
}
