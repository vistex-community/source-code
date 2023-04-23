import { useState } from "react";

export const usePagination = () => {
  const initPageSize = 5;
  const [pageSize, setPageSize] = useState(initPageSize);

  const increasePageSize = () => {
    setPageSize(pageSize + initPageSize);
  };

  const resetPageSize = () => {
    setPageSize(initPageSize);
  };

  return [pageSize, increasePageSize, resetPageSize];
};
