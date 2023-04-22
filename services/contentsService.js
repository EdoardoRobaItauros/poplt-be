const queryService = require("../services/queryService")

async function getWithPaginationAndJoin(table, req, client) {
    const pageNum = req.query.page ? req.query.page : 0
    const itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 10
    const joinParams = [{ tableName: "users", fk: "user_id" }, { tableName: "challenges", fk: "challenge_id" }]
    const join = `LEFT JOIN public.tableNameToJoin ON public.${table}."fk" = public.tableNameToJoin."fk"`
    const query = `SELECT * FROM public.${table} ${joinParams.map((t) => join.replaceAll("tableNameToJoin", t.tableName).replaceAll("fk", t.fk)).join(" ")} LIMIT ${itemsPerPage} OFFSET ${(pageNum) * itemsPerPage}`
    return await queryService.executeQuery(query, null, client)
}

async function getBySearch(table, req, client) {
    const orderedBy = req.query.orderedBy ? `ORDER BY ${req.query.orderedBy} DESC` : ""
    delete req.query.orderedBy
    const query = `SELECT * FROM public.${table} WHERE ${Object.entries(req.query).map((e, index) => e[0] + "=$" + (index + 1).toString()).join(" AND ")} ${orderedBy}`
    return await queryService.executeQuery(query, Object.values(req.query), client)
}

async function getById(table, id, columnId, client) {
    const query = `SELECT * FROM public.${table} WHERE ${columnId}=$1`
    return await queryService.executeQuery(query, [id], client)
}

async function post(table, body, client) {
    const query = `INSERT INTO public.${table} (${Object.keys(body).join(",")}) VALUES (${queryService.createValuesIds(Object.values(body))}) RETURNING *`
    const params = Object.values(body)
    return await queryService.executeQuery(query, params, client)
}

async function putSingleColumn(table, body, id, columnId, client) {
    const query = `UPDATE public.${table} SET ${queryService.mapToUpdate(body)} WHERE ${columnId}=$${Object.entries(body).length + 1} RETURNING *`
    return await queryService.executeQuery(query, Object.values(body).concat(id), client)
}

async function deleteRecord(table, id, columnId, client) {
    const query = `DELETE FROM public.${table} WHERE ${columnId} = $1`
    return await queryService.executeQuery(query, [id], client)
}

module.exports = { getWithPaginationAndJoin, getBySearch, getById, post, putSingleColumn, deleteRecord };
