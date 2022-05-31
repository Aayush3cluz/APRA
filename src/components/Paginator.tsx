import React from "react";

interface PaginatorProps {
  page: number;
  maxPages: number;
  changePage: (page: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
  page,
  maxPages,
  changePage,
}: PaginatorProps) => {
  return (
    <div>
      <button disabled={page === 1} onClick={() => changePage(1)}>
        {"<<"}
      </button>
      <button hidden={page === 1} onClick={() => changePage(page - 1)}>
        {page - 1}
      </button>
      <button>
        <b>{page}</b>
      </button>
      <button hidden={page + 1 > maxPages} onClick={() => changePage(page + 1)}>
        {page + 1}
      </button>
      <button disabled={page === maxPages} onClick={() => changePage(maxPages)}>
        {">>"}
      </button>
    </div>
  );
};
