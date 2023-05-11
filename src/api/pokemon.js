import {API_HOST} from '../utils/constants';

export async function getPokemonsApi(endpointUrl) {
  try {
    const response = await fetch(endpointUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonsApiAll() {
  try {
    const endpointUrl = `${API_HOST}/pokemon?limit=200`;
    const response = await fetch(endpointUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonTypesModal(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDescriptionApi(id) {
  try {
    const url = `${API_HOST}/pokemon-species/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonGenders() {
  try {
    const female = `${API_HOST}/gender/1`;
    const male = `${API_HOST}/gender/2`;
    const genderless = `${API_HOST}/gender/3`;
    const femaleResponse = await fetch(female);
    const femaleResult = await femaleResponse.json();
    const maleResponse = await fetch(male);
    const maleResult = await maleResponse.json();
    const genderlessResponse = await fetch(genderless);
    const genderlessResult = await genderlessResponse.json();
    
  } catch (error) {
    throw error;
  }
}
