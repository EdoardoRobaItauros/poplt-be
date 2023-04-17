const express = require("express");
const client = require("../config/connection.js")
const router = express.Router();

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
        ids += i === 0 ? key+'=$1' : `,${key} = $${i + 1}`;
    }
    return ids;
    // return Object.entries(body).map((e) => {
    //     return e[0] + " = " + e[1]})
}

router.get("/", function (req, res) {
    client.query('SELECT * FROM public.users', (error, results) => {
        if (error) {
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
});

router.get("/:id", function (req, res) {
    client.query('SELECT * FROM public.users WHERE id=$1', [req.params.id], (error, results) => {
        if (error) {
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
});

router.post("/", function (req, res) {
    const body = req.body
    client.query(`INSERT INTO public.users (${Object.keys(body).join(",")}) VALUES (${createValuesIds(Object.values(body))}) RETURNING *`, Object.values(body), (error, results) => {
        if (error) {
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
});

router.put("/:id", function (req, res) {
    const body = req.body
    const id = req.params.id
    client.query(`UPDATE public.users SET ${mapToUpdate(body)} WHERE id=$${Object.entries(body).length+1} RETURNING *`, Object.values(body).concat(id), (error, results) => {
        if (error) {
            console.log(error)
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
});

router.delete("/:id", function (req, res) {
    client.query('DELETE FROM public.users WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
            res.status(406).json({ error: error })
        } else {
            res.status(200).json(results.rows)
        }
    })
});

module.exports = router;