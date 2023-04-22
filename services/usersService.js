const queryService = require("../services/queryService")

async function get(table) {
    const query = `SELECT * FROM public.${table}`
    const resp = await queryService.executeQuery(query, null)
    return resp
}

async function getById(table, id, columnId) {
    const query = `SELECT * FROM public.${table} WHERE ${columnId}=$1`
    return await queryService.executeQuery(query, [id])
}

async function post(table, body) {
    const query = `INSERT INTO public.${table} (${Object.keys(body).join(",")}) VALUES (${queryService.createValuesIds(Object.values(body))}) RETURNING *`
    const params = Object.values(body)
    return await queryService.executeQuery(query, params)
}

async function put(table, body, id, columnId) {
    const query = `UPDATE public.${table} SET ${queryService.mapToUpdate(body)} WHERE ${columnId}=$${Object.entries(body).length + 1} RETURNING *`
    const params = Object.values(body).concat(id)
    return await queryService.executeQuery(query, params)
}

async function deleteRecord(table, id, columnId) {
    const query = `DELETE FROM public.${table} WHERE ${columnId} = $1`
    return await queryService.executeQuery(query, [id])
}

module.exports = { get, getById, post, put, deleteRecord };
