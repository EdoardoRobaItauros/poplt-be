const queryService = require("../services/queryService")

async function get(table, client) {
    const query = `SELECT * FROM public.${table}`
    return await queryService.executeQuery(query, null, client)
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

async function put(table, body, id, columnId, client) {
    const query = `UPDATE public.${table} SET ${queryService.mapToUpdate(body)} WHERE ${columnId}=$${Object.entries(body).length + 1} RETURNING *`
    const params = Object.values(body).concat(id)
    return await queryService.executeQuery(query, params, client)
}

async function deleteRecord(table, id, columnId, client) {
    const query = `DELETE FROM public.${table} WHERE ${columnId} = $1`
    return await queryService.executeQuery(query, [id], client)
}

module.exports = { get, getById, post, put, deleteRecord };
