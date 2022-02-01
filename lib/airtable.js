import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIR_TABLE_API_KEY }).base(
  process.env.AIR_TABLE_BASE_ID
);

export const table = base("coffee-stores");

export const getRecords = (records) =>
  records.map((record) => ({
    ...record.fields,
  }));
