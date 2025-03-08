"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";
import { useAppStore } from "@/store/app-store-provider";

const CustomPagination = () => {
  const [page, setPage] = useQueryState("page");
  const { totalPages } = useAppStore((state) => state);

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
  };

  const renderPaginationItems = () => {
    const currentPage = parseInt(page || "1");
    const items: React.ReactNode[] = [];

    if (totalPages <= 1) {
      return items;
    }

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className="flex w-full items-center justify-center my-4">
      <Pagination>
        <PaginationPrevious
          onClick={() =>
            handlePageChange(Math.max(1, parseInt(page || "1") - 1))
          }
        >
          Previous
        </PaginationPrevious>
        <PaginationContent>{renderPaginationItems()}</PaginationContent>
        <PaginationNext
          onClick={() =>
            handlePageChange(Math.min(totalPages, parseInt(page || "1") + 1))
          }
        >
          Next
        </PaginationNext>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
