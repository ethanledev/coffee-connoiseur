import { table, getRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

    try {
      //find a record
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();
      if (findCoffeeStoreRecords.length > 0) {
        const records = getRecords(findCoffeeStoreRecords);
        res.json(records);
      } else {
        if (name) {
          //create a record
          const createdRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                neighbourhood,
                voting,
                imgUrl,
              },
            },
          ]);
          const records = getRecords(createdRecords);
          res.json(records);
        } else {
          res.status(400).json({ message: "Name field is missing" });
        }
      }
    } catch (error) {
      console.error({ message: "Error finding or creating store:", error });
      res
        .status(500)
        .json({ message: "Error finding or creating store:", error });
    }
  }
};

export default createCoffeeStore;
