const client = require("../config/connection.js")

function createValuesIds(vals) {
    let ids = '';
    for (let i = 0; i < vals.length; i++) {
        ids += i === 0 ? '$1' : `, $${i + 1}`;
    }
    return ids;
}

function mapToUpdate(body) {
    let ids = '';
    for (let i = 0; i < Object.entries(body).length; i++) {
        key = Object.entries(body)[i][0]
        val = Object.entries(body)[i][1]
        ids += i === 0 ? '"' + key + '"=$1' : `,${key} = $${i + 1}`;
    }
    return ids;
    // return Object.entries(body).map((e) => {
    //     return e[0] + " = " + e[1]})
}

function get(table, res) {
    client.query(`SELECT * FROM public.${table}`, (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function getWithPaginationAndJoin(table, res, pageNum, itemsPerPage, tablesToJoin) {
    const join = `LEFT JOIN public.tableNameToJoin ON public.${table}."fk" = public.tableNameToJoin."fk"`
    client.query(`SELECT * FROM public.${table} ${tablesToJoin.map((t) => join.replaceAll("tableNameToJoin", t.tableName).replaceAll("fk", t.fk)).join(" ")} LIMIT ${itemsPerPage} OFFSET ${(pageNum) * itemsPerPage}`, (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function getBySearch(table, res, queryObject, orderedBy) {
    client.query(`SELECT * FROM public.${table} WHERE ${Object.entries(queryObject).map((e, index) => e[0] + "=$" + (index+1).toString()).join(" AND ")} ${orderedBy}`, Object.values(queryObject), (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function getById(table, res, id, columnId) {
    client.query(`SELECT * FROM public.${table} WHERE ${columnId}=$1`, [id], (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function post(table, res, body) {
    client.query(`INSERT INTO public.${table} (${Object.keys(body).join(",")}) VALUES (${createValuesIds(Object.values(body))}) RETURNING *`, Object.values(body), (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function put(table, res, body, id) {
    client.query(`UPDATE public.${table} SET ${mapToUpdate(body)} WHERE id=$${Object.entries(body).length + 1} RETURNING *`, Object.values(body).concat(id), (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function putSingleColumn(table, res, body, id) {
    client.query(`UPDATE public.${table} SET ${mapToUpdate(body)} WHERE id=$${Object.entries(body).length + 1} RETURNING *`, Object.values(body).concat(id), (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

function deleteRecord(table, res, id) {
    client.query(`DELETE FROM public.${table} WHERE id = $1`, [id], (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

module.exports = { get, getWithPaginationAndJoin, getById, getBySearch, post, put, putSingleColumn, deleteRecord };