"use client";

import { ConfirmOrderModal } from "@/components/modal/confirm-order-modal";
import { FeedBackModal } from "@/components/modal/feedback-modal";
import { OrderSheet } from "@/components/modal/order-sheet-modal";
import { RegiterAuctionModal } from "@/components/modal/register-auction-modal";
import { ViewConfirmModal } from "@/components/modal/view-auction-confirm-modal";
import { ViewOrderModal } from "@/components/modal/view-order-modal";
import { WalletModal } from "@/components/modal/wallet-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>
    <RegiterAuctionModal/>
    <WalletModal/>
    <OrderSheet/>
    <ConfirmOrderModal/>
    <ViewOrderModal/>
    <ViewConfirmModal/>
    <FeedBackModal/>
  </>;
};
