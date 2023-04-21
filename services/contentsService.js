const queryService = require("../services/queryService")

function getWithPaginationAndJoin(table, req, res) {
    const pageNum = req.query.page ? req.query.page : 0
    const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
    const joinParams = [{ tableName: "users", fk: "user_id" }, { tableName: "challenges", fk: "challenge_id" }]
    const join = `LEFT JOIN public.tableNameToJoin ON public.${table}."fk" = public.tableNameToJoin."fk"`
    const query = `SELECT * FROM public.${table} ${joinParams.map((t) => join.replaceAll("tableNameToJoin", t.tableName).replaceAll("fk", t.fk)).join(" ")} LIMIT ${itemsPerPage} OFFSET ${(pageNum) * itemsPerPage}`
    queryService.executeQuery(query, null, res)
}

function getBySearch(table, req, res) {
    const orderedBy = req.query.orderedBy ? `ORDER BY ${req.query.orderedBy} DESC` : ""
    delete req.query.orderedBy
    const query = `SELECT * FROM public.${table} WHERE ${Object.entries(queryObject).map((e, index) => e[0] + "=$" + (index + 1).toString()).join(" AND ")} ${orderedBy}`
    queryService.executeQuery(query, Object.values(queryObject), res)
}

function getById(table, res, id, columnId) {
    const query = `SELECT * FROM public.${table} WHERE ${columnId}=$1`
    queryService.executeQuery(query, [id], res)
}

function post(table, res, body) {
    const query = `INSERT INTO public.${table} (${Object.keys(body).join(",")}) VALUES (${queryService.createValuesIds(Object.values(body))}) RETURNING *`
    const params = Object.values(body)
    queryService.executeQuery(query, params, res)
}

function putSingleColumn(table, res, body, id, columnId) {
    const query = `UPDATE public.${table} SET ${queryService.mapToUpdate(body)} WHERE ${columnId}=$${Object.entries(body).length + 1} RETURNING *`
    queryService.executeQuery(query, Object.values(body).concat(id), res)
}

function deleteRecord(table, res, id, columnId) {
    const query = `DELETE FROM public.${table} WHERE ${columnId} = $1`
    queryService.executeQuery(query, [id], res)
}

module.exports = { getWithPaginationAndJoin, getBySearch, getById, post, putSingleColumn, deleteRecord };
