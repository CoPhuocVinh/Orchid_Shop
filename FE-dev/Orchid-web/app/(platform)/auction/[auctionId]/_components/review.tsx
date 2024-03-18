"use client";

import { Button } from "@/components/ui/button";
import Section from "@/components/platform/section";

import ReviewCard from "./review-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useRef, useState } from "react";

export default function ReviewBlock({ reviewsData }: any) {
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviewsData.reviews.length / reviewsPerPage);

  const firstReviewRef = useRef<HTMLDivElement>(null);
  const handlePageChange = (
    pageNumber: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewsData.reviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  useEffect(() => {
    if (firstReviewRef.current) {
      firstReviewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <Section
      id="reviews"
      title="35 reviews"
      className="scroll-mt-20 py-5 xl:py-7"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl hidden md:block"
      rightElement={
        <Button
          size="lg"
          variant="outline"
          className="hidden !border-gray-dark !px-4 !py-[10px] !text-sm !font-bold !leading-[18px] text-gray-dark hover:bg-gray-1000 hover:text-white md:block md:border-gray md:!text-base lg:!px-[30px] lg:!py-[14px]"
        >
          Add Review
        </Button>
      }
    >
      <div className="md:mt-8">
        {currentReviews.map((item: any, index: number) => (
          <div
            ref={index === 0 ? firstReviewRef : null}
            key={`review-${index}`}
          >
            <ReviewCard
              key={`review-${index}`}
              avatar={item.avatar}
              name={item.name}
              date={item.date}
              location={item.location}
              rating={item.rating}
              review={item.review}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center md:justify-end space-x-4 xl:mt-12">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => handlePageChange(currentPage - 1, e)}
                />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageChange(index + 1, e)}
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => handlePageChange(currentPage + 1, e)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </Section>
  );
}
