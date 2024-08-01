import { Flex, IconButton, Button } from '@strapi/design-system';
import { ChevronLeft, ChevronRight, More } from '@strapi/icons';
import useFormattedLabel from '../../hooks/useFormattedLabel';

interface PaginationProps {
  page: number;
  maxPerPage: number;
  numberOfItems: number;
  setPage: (page: number) => void;
}

export function Pagination({ page, numberOfItems, setPage, maxPerPage }: PaginationProps) {
  const totalPages = Math.ceil(numberOfItems / maxPerPage) || 1;

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => {
    return (
      <Button
        key={item}
        size="L"
        onClick={() => setPage(item)}
        label={`${item}`}
        variant={item === page ? 'tertiary' : 'ghost'}	
      >
        {item}
      </Button>
    );
  })

  return (
    <Flex gap={2}>
      <IconButton size="L" onClick={handlePrevPage} label={useFormattedLabel('pagination.prev')} disabled={page === 1}>
        <ChevronLeft />
      </IconButton>
      {
        pagesArray.length > 5 ? (
            <>
                {pagesArray.slice(0, 2)}
                <More />
                {pagesArray.slice(-1)}
            </>
            ) : (
            pagesArray
            )
      }
      <IconButton size="L" onClick={handleNextPage} label={useFormattedLabel('pagination.next')} disabled={page === totalPages}>
        <ChevronRight />
      </IconButton>
    </Flex>
  );
}
