'use server';

import axios from 'axios';

export async function getVehicleMakes(make: string) {
  const response = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100&offset=0&select=make&where=search(make,"${make}")`
  );
  const makes = response.data?.results?.map((result: any) => result.make);
  return [...new Set(makes)];
}

export async function getVehicleModels(model: string) {
  const response = await axios.get(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100&offset=0&select=model&where=search(model,"${model}")`
  );
  const models = response.data?.results?.map((result: any) => result.model);
  return [...new Set(models)];
}
