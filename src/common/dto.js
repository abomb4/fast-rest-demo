
/**
 * Create a success response
 *
 * @param {any} data
 */
export function respSuccess(data) {
  return {
    code: 1,
    msg: "success",
    data: data
  };
}

/**
 * Create paginate resp
 *
 * @param {Number} pageNo Page number starts with 1
 * @param {Number} pageSize Page size
 * @param {Number} total Total data count
 * @param {Array} rows Data list
 */
export function paginateRespSuccess(pageNo, pageSize, total, rows) {
  return respSuccess(
    {
      total,
      pageNo,
      pageSize,
      pages: total / pageSize,
      rows
    }
  );
}
