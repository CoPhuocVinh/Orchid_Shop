import { useGetAuctionsWithStatus } from "@/lib/react-query/queries";
import { AuctionStatus, IAuction } from "@/types/dashboard";
import React, { useEffect, useState } from "react";
type AuctionData = IAuction[];

interface GetAllData_AuctionProps {
  children: (props: {
    allAuctions: AuctionData;
    filteredAuctionListing: (selectedStatus: AuctionStatus) => void;
    filterStatus: AuctionStatus | null;
    auctionLoading: boolean;
  }) => React.ReactNode;
}
function GetAllData_Auction({ children }: GetAllData_AuctionProps) {
  const { data: liveAuction, isLoading: auctionLoading } =
    useGetAuctionsWithStatus(AuctionStatus.LIVE);
  const { data: commingAuction, isLoading: commingAuctionLoading } =
    useGetAuctionsWithStatus(AuctionStatus.COMING);
  const { data: endAuction, isLoading: endAuctionLoading } =
    useGetAuctionsWithStatus(AuctionStatus.END);
  const combineAuctionData = (
    liveData: AuctionData,
    comingData: AuctionData,
    endData: AuctionData
  ): AuctionData => {
    const combinedData: AuctionData = [];

    if (liveData) {
      combinedData.push(...liveData);
    }

    if (comingData) {
      combinedData.push(...comingData);
    }

    if (endData) {
      combinedData.push(...endData);
    }

    return combinedData;
  };

  const [allAuctions, setAllAuctions] = useState<AuctionData>([]);
  const [filterStatus, setFilterStatus] = useState<AuctionStatus | null>(null);

  // Sử dụng useEffect để gọi và kết hợp dữ liệu khi có sự thay đổi
  useEffect(() => {
    const combinedData = combineAuctionData(
      liveAuction?.data ?? [],
      commingAuction?.data ?? [],
      endAuction?.data ?? []
    );
    setAllAuctions(combinedData);
  }, [liveAuction, commingAuction, endAuction]);

  const filteredAuctionListing = (selectedStatus: AuctionStatus) => {
    setFilterStatus(selectedStatus);
  };

  return children({
    allAuctions,
    filteredAuctionListing,
    filterStatus,
    auctionLoading,
  });
}

export default GetAllData_Auction;
