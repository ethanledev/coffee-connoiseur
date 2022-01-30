import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20210525&limit=${limit}`;

const getCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 10,
  });
  const unsplashResult = photos.response.results;
  return unsplashResult.map((result) => result.urls.small);
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStoresPhotos();
  const options = {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(
      "43.65267326999575,-79.39545615725015",
      "coffee stores",
      "6"
    ),
    options
  );
  const data = await response.json();
  let transformedData = [];
  if (data) {
    transformedData = data.results.map((venue, index) => ({
      id: venue.fsq_id,
      address: venue.location.address,
      neighbourhood: venue.location.neighborhood || null,
      imgUrl: photos[index],
      ...venue,
    }));
  }

  return transformedData;
};
