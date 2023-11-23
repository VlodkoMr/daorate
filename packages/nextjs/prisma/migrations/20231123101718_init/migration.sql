-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('NFT', 'FT');

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "campaignType" "CampaignType" NOT NULL,
    "contracts" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignWalletBalanceStats" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "network" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CampaignWalletBalanceStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignWalletBalanceTotals" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "network" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CampaignWalletBalanceTotals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletRatings" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletRatings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CampaignWalletBalanceStats_date_network_contractAddress_idx" ON "CampaignWalletBalanceStats"("date", "network", "contractAddress");

-- CreateIndex
CREATE INDEX "CampaignWalletBalanceTotals_date_network_contractAddress_idx" ON "CampaignWalletBalanceTotals"("date", "network", "contractAddress");

-- CreateIndex
CREATE INDEX "WalletRatings_walletAddress_campaignId_idx" ON "WalletRatings"("walletAddress", "campaignId");

-- AddForeignKey
ALTER TABLE "CampaignWalletBalanceStats" ADD CONSTRAINT "CampaignWalletBalanceStats_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignWalletBalanceTotals" ADD CONSTRAINT "CampaignWalletBalanceTotals_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletRatings" ADD CONSTRAINT "WalletRatings_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
