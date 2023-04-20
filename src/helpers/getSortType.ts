import { SortType } from "../types/sortType";

export const getSortType = (sort: SortType) => {
  let sortType: { [key: string]: 1 | -1 } = { rating: -1, title: 1 };

  switch (sort) {
    case "price-ask-rank":
      sortType = { price: 1, title: 1 };
      break;
    case "price-desc-rank":
      sortType = { price: -1, title: 1 };
      break;
    case "rating-ask-rank":
      sortType = { rating: 1, title: 1 };
      break;
    case "rating-desc-rank":
      sortType = { rating: -1, title: 1 };
      break;
    default:
      sortType = { rating: -1, title: 1 };
  }

  return sortType;
};

// 1 - ask
// -1 - desc
