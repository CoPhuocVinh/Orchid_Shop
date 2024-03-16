import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PanigationAuctionPage({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  function handlePageChange(page: number) {
    onPageChange(page);
  }

  return (
    <div className="mt-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              // disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              // disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
