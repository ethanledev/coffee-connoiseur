import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20210525&limit=${limit}`;

const getCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResult = photos.response.results;
  return unsplashResult.map((result) => result.urls.small);
};

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 6,
  isNearBy = false
) => {
  const photos = await getCoffeeStoresPhotos();
  const options = {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee shop", limit),
    options
  );
  const data = await response.json();
  let transformedData = [];
  if (data) {
    transformedData = data.results.map((venue, index) => ({
      id: venue.fsq_id,
      address: venue.location.address,
      neighbourhood: venue.location.neighborhood || null,
      imgUrl: isNearBy ? photos[index + 6] : photos[index],
      ...venue,
    }));
  }

  return transformedData;
};
