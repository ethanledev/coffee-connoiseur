const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20210525&limit=${limit}`;

export const fetchCoffeeStores = async () => {
  const options = {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(
      "43.65267326999575,-79.39545615725015",
      "coffee stores",
      "8"
    ),
    options
  );
  const data = await response.json();
  let transformedData = [];
  if (data) {
    transformedData = data.results.map((venue) => ({
      id: venue.fsq_id,
      address: venue.location.address,
      neighbourhood: venue.location.neighborhood || null,
      imgUrl:
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      ...venue,
    }));
  }

  return transformedData;
};
