var express = require('express');
var router = express.Router();
const Pool = require('pg').Pool;

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

process.on('unhandledRejection', function (e) {
  console.log(e.message, e.stack);
})

var pool = new Pool(config)

/* GET users listing. */
router.get('/', function(req, res, next) {
  getUsers().then((resp) => {
    res.status(200).json({
      meta: {
        code: 200,
        message: "Success"
      },
      data: {
        users: resp.rows
      }
    });
  })
  .catch((err) => {
    console.log('### err response', err)
    res.status(500).send({
      meta: {
        code: 500,
        message: "Internal Server Error"
      }
    });
  })
});

router.post('/add', function(req, res, next) {
  const name = req.body.name;
  insertUser(name).then((resp) => {
    res.status(200).json({
      meta: {
        code: 200,
        message: "Success"
      }
    });
  })
  .catch((err) => {
    res.status(500).json({
      meta: {
        code: 500,
        message: "Internal Server Error"
      }
    })
  });
});

const insertUser = (name) => {
  return pool.query(`INSERT INTO account (name) VALUES ($1::text)`, [name]);
}

const getUsers = () => {
  return pool.query(`SELECT * FROM account`);
}

module.exports = router;
