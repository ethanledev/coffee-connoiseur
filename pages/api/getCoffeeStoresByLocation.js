import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit, isNearBy } = req.query;
    const response = await fetchCoffeeStores(latLong, limit, isNearBy);
    res.status(200).json(response);
  } catch (error) {
    console.error("There is an error", error);
    res.status(500);
  }
};

export default getCoffeeStoresByLocation;
