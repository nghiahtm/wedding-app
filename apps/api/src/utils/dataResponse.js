/** @typedef {{field?: string, message: string}} DataError */
/** @template T @typedef {{data: T|null, errors: DataError[], message: string}} DataResponse */

/** @template T @param {T} data @param {string} [message] @returns {DataResponse<T>} */
export function successResponse(data, message = '') {
  return { data, errors: [], message };
}

/** @param {DataError[]} errors @param {string} message @returns {DataResponse<never>} */
export function errorResponse(errors, message) {
  return { data: null, errors, message };
}

export function validationErrors(error) {
  return Object.values(error.errors ?? {}).map(({ path, message }) => ({
    field: path,
    message
  }));
}