export interface IPaginationOptions {
  currentPage: number;
  itemsPerPage: number;
}

export interface IPaginatedData<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

export const paginate = <T>(
  data: T[],
  options: IPaginationOptions
): IPaginatedData<T> => {
  const { currentPage, itemsPerPage } = options;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const slicedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (options.currentPage > totalPages) {
    // options.currentPage = totalPages;
    throw new Error(
      `Page out of bounds: Current page ${options.currentPage} exceeds total pages ${totalPages}`
    );
  }

  const result = {
    currentPage: options.currentPage,
    totalPages: totalPages,
    totalItems: data.length,
    items: slicedData,
  };

  return result;
};
