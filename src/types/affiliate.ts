export interface AffiliateSummaryItem {
  affiliateId: number;
  affiliateCode: string;
  affiliateCodeUrl: string;
  createdAt: string;
  clicks: number;
  friends: number;
  activeFriends: number;
  totalDeposits: string;
  uniqueDeposits: number;
  totalWithdrawal: string;
  totalValidWager: string;
  totalCosts: string;
  totalPnl: string;
}

export interface AffiliateMonthlyCommission {
  dateFrom: string;
  dateTo: string;
  affiliateCodeId: number;
  affiliateCode: string;
  affiliateCodeUrl: string;
  createdAt: string;
  friendsToDate: number;
  activeFriends: number;
  totalValidWager: string;
  sharedCosts: string;
  pnl: string;
  commissionRate: number;
  calculatedCommission: string;
}

export interface AffiliateFriendPerformance {
  memberId: number;
  friends: string;
  affiliateCodeId: number;
  affiliateCode: string;
  affiliateCodeUrl: string;
  depositCount: number;
  depositAmount: string;
  withdrawalCount: number;
  withdrawalAmount: string;
  adjustmentCount: number;
  adjustmentAmount: string;
  wagerCount: number;
  wagerAmount: string;
  validWagerAmount: string;
  totalRebate: number;
  leaderboardPrize: number;
  friendPnl: string;
  friendPnlPercent: number;
  netPnl: string;
  netPnlPercent: number;
}
