import {
  act,
  render,
  renderHook,
  waitFor,
  screen,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import { GET_PHOTOS } from "../api/Query";
import { ApolloError } from "@apollo/client";
import { ResultsTable } from "../components/ResultsTable";
import { usePhotos } from "./usePhotosHook";

const mockSuccess = [
  {
    request: {
      query: GET_PHOTOS,
      variables: {
        query: "lorem",
        page: 1,
      },
    },
    result: {
      data: {
        photos: {
          __typename: "PhotosPage",
          data: [
            {
              __typename: "Photo",
              id: "10",
              title: "accusamus beatae ad facilis cum similique qui sunt",
              url: "https://via.placeholder.com/600/92c952",
              thumbnailUrl: "https://via.placeholder.com/150/92c952",
            },
            {
              __typename: "Photo",
              id: "11",
              title: "reprehenderit est deserunt velit ipsam",
              url: "https://via.placeholder.com/600/771796",
              thumbnailUrl: "https://via.placeholder.com/150/771796",
            },
            {
              __typename: "Photo",
              id: "12",
              title: "officia porro iure quia iusto qui ipsa ut modi",
              url: "https://via.placeholder.com/600/24f355",
              thumbnailUrl: "https://via.placeholder.com/150/24f355",
            },
            {
              __typename: "Photo",
              id: "13",
              title:
                "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
              url: "https://via.placeholder.com/600/d32776",
              thumbnailUrl: "https://via.placeholder.com/150/d32776",
            },
          ],
          meta: {
            __typename: "PageMetadata",
            totalCount: 4,
          },
        },
      },
    },
  },
];
const mockError = [
  {
    request: {
      query: GET_PHOTOS,
      variables: {
        query: "lorem",
        page: 2,
      },
    },
    error: new Error("Error"),
  },
];
describe("Test the main hook", () => {
  it("Data should be the mocked response when queried with lorem", async () => {
    const { result } = renderHook(() => usePhotos(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mockSuccess}>{children}</MockedProvider>
      ),
    });
    act(() => {
      result.current.doSearch("lorem");
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(mockSuccess[0].result.data);

    expect(result.current.data?.photos.meta.totalCount).toBe(4);
  });

  it("Data should be the mocked response when queried with lorem", async () => {
    const { result } = renderHook(() => usePhotos(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mockError}>{children}</MockedProvider>
      ),
    });
    act(() => {
      result.current.doSearch("lorem");
      result.current.changePage(2);
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(undefined);
    expect(result.current.error).toEqual(mockError[0].error);
  });
});

describe("Test the Results table rendering", () => {
  it("Check that the table exists and renders mock data", () => {
    render(
      <ResultsTable
        data={mockSuccess[0].result.data}
        loading={false}
        openModal={() => {}}
        error={undefined}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();

    expect(
      screen.getByText("accusamus beatae ad facilis cum similique qui sunt")
    ).toBeInTheDocument();
    expect(
      screen.getByText("reprehenderit est deserunt velit ipsam")
    ).toBeInTheDocument();
    expect(
      screen.getByText("officia porro iure quia iusto qui ipsa ut modi")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "culpa odio esse rerum omnis laboriosam voluptate repudiandae"
      )
    ).toBeInTheDocument();
  });

  it("Check that Error Message is displayed if error provided", () => {
    render(
      <ResultsTable
        data={undefined}
        loading={false}
        openModal={() => {}}
        error={new ApolloError({})}
      />
    );

    expect(screen.getByText("Error - Apollo Error")).toBeInTheDocument();
  });
});
