export type TMintInfo = {
  Id: string;
  To: string;
  TokenId: string;
  TransactionHash: string;
  Username: string;
};

export type TUser = {
  username: string;
  id: number;
  node_id: string;
  stars: number;
  repo_count: number;
  followers: number;
  following: number;
  contributed_repo_count: number;
  pr_count: number;
  commits_count: number;
  issues_count: number;
  rank: number;
  image: string;
  git_id_mint_info?: TMintInfo;
};
