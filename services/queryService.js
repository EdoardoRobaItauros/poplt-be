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

function executeQuery(query, params, res) {
    client.query(query, params, (error, results) => {
        if (error) {
            console.error(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
}

module.exports = { executeQuery, mapToUpdate, createValuesIds };