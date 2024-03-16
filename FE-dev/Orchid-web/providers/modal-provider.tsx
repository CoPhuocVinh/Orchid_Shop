"use client";

import { OrderSheet } from "@/components/modal/order-sheet-modal";
import { RegiterAuctionModal } from "@/components/modal/register-auction-modal";
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
  </>;
};
