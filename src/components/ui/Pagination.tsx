import arrow from "@/assets/icons/arrow.svg";

type PageItem = number | "...";

// First, last and the pages around the current one, with "..." for the gaps.
function getPageItems(page: number, lastPage: number): PageItem[] {
  const items: PageItem[] = [];
  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || Math.abs(i - page) <= 1) items.push(i);
    else if (items[items.length - 1] !== "...") items.push("...");
  }
  return items;
}

type PaginationProps = {
  page: number;
  lastPage: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, lastPage, onChange }: PaginationProps) {
  const arrowStyle =
    "size-11 flex items-center justify-center rounded-full bg-surface cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2.5 pt-6">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={arrowStyle}
      >
        <img src={arrow} alt="" className="size-5" />
      </button>
      {getPageItems(page, lastPage).map((item, i) =>
        item === "..." ? (
          <span key={i} className="w-11 text-center text-white text-label-m">
            …
          </span>
        ) : (
          <button
            key={i}
            type="button"
            onClick={() => onChange(item)}
            className={`size-11 rounded-full text-white text-label-m cursor-pointer ${item === page ? "bg-primary" : ""}`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={page === lastPage}
        onClick={() => onChange(page + 1)}
        className={arrowStyle}
      >
        <img src={arrow} alt="" className="size-5 rotate-180" />
      </button>
    </div>
  );
}
