/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */
// GET /projects
// returns all of the projects from the database
export async function listProjects(signal) {
  const url = new URL(`${API_BASE_URL}/projects`);
  return await fetchJson(url, { headers, signal }, [])
}

// POST /projects
export async function createProject(newProject, signal){
  const url = new URL(`${API_BASE_URL}/projects`);
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({ data: newProject });
  return await fetchJson(url, { method, headers, body, signal }, []);
}
// GET /projects/:project_id
export async function getProject(project_id, signal, ) {
  const url = new URL(`${API_BASE_URL}/projects/${project_id}`);
  return await fetchJson(url, { headers, signal }, [])
}
// PUT /project/:project_id
export async function updateProjectStatus(status, project_id, signal){
  const url = new URL(`${API_BASE_URL}/projects/${project_id}`);
  const method = "PUT";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({ data: {status} });
  
  return await fetchJson(url, { method, headers, body, signal }, []);
}

// PUT /project/:project_id/edit
export async function updateProject(project, project_id, signal){
  const url = new URL(`${API_BASE_URL}/projects/${project_id}/edit`);
  const method = "PUT";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({ data: project });
  
  return await fetchJson(url, { method, headers, body, signal }, []);
}