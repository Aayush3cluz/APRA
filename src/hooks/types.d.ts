export type PhotosData = {
  photos: {
    data: {
      id: string;
      title: string;
      thumbnailUrl: string;
      url: string;
    }[];
    meta: {
      totalCount: number;
    };
  };
};

export type PhotosVars = {
  page: number;
  query: string;
};

export interface StateType {
  query: string;
  page: number;
  totalPages: number;
  modalUrl: string;
  modalOpen: boolean;
}

export type Action =
  | { type: "search"; query: string }
  | { type: "changePage"; payload: number }
  | { type: "openModal"; payload: string }
  | { type: "closeModal" };
