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

async function executeQuery(query, params) {
    // client.query(query, params, (error, results) => {
    //     if (error) {
    //         console.error(error)
    //         return { error: error, statusCode: 406 }
    //     } else {
    //         return { data: results.rows, statusCode: 200 }
    //     }
    // })
    try {
        const results = await client.query(query, params)
        return { data: results.rows, statusCode: 200 }
    } catch (e) {
        return { errorMessage: e.toString(), statusCode: 406 }
    }
    // .then(results => { resp = { data: results.rows, statusCode: 200 } })
    // .catch(e => { resp = { error: e, statusCode: 406 } })

}

module.exports = { executeQuery, mapToUpdate, createValuesIds };