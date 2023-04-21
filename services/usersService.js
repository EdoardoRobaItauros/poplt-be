const queryService = require("../services/queryService")

function get(table, res) {
    const query = `SELECT * FROM public.${table}`
    queryService.executeQuery(query, null, res)
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

function put(table, res, body, id, columnId) {
    const query = `UPDATE public.${table} SET ${queryService.mapToUpdate(body)} WHERE ${columnId}=$${Object.entries(body).length + 1} RETURNING *`
    const params = Object.values(body).concat(id)
    queryService.executeQuery(query, params, res)
}

function deleteRecord(table, res, id, columnId) {
    const query = `DELETE FROM public.${table} WHERE ${columnId} = $1`
    queryService.executeQuery(query, [id], res)
}

module.exports = { get, getById, post, put, deleteRecord };
