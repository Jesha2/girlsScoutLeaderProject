require("dotenv").config();
const bcrypt = require("bcryptjs");
const { DATABASE_CONFIG, SECRET } = process.env;
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

const createToken = (email, id) => {
  return jwt.sign(
    {
      email,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

const sequelize = new Sequelize(DATABASE_CONFIG, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
module.exports = {
  userLogin: (req, res) => {
    console.log("starting to authenticate");
    const { email, password } = req.body;
    console.log("starting to authenticate", email,password);


    sequelize
      .query(`select * from leaders where email = '${email}'`)
      .then((dbRes) => {
        if (!dbRes[0][0]) {
          return res.status(400).send("Account not found, try signing up");
        }
        // const {passHash} = dbRes[0][0]

        const authenticated = bcrypt.compareSync(
          password,
          dbRes[0][0].password
        );
        if (!authenticated) {
          res.status(403).send("incorrect password");
        }
        delete dbRes[0][0].password;
        // optional to do this step of creating token and sending it to front encodeURI. but its GeolocationCoordinates, it will keep for 2 days in the browser. the expiration is in crete token method above//
        const token = createToken(email, dbRes[0][0].leader_id);
        console.log("token", token);
        const userToSend = { ...dbRes[0][0], token};
        res.status(200).send(userToSend);
      })
      .catch((err) => console.log(err));
  },
  userSignup: (req, res) => {
    console.log("email, password, leader_name");
    const { email, password, leader_name } = req.body; 
    console.log(email,  leader_name);
    sequelize
      .query(`select * from leaders where email = '${email}'`)
      .then((dbRes) => {
        console.log("dbRes[0]");
        //console.log(dbRes[0]);

        if (dbRes[0][0]) {
          console.log(" *******Email is already in use, try login");
          return res.status(400).send("Email is already in use, try to login");
        } else {
          //leader already in the system
          let salt = bcrypt.genSaltSync(10);
          const passHash = bcrypt.hashSync(password, salt);
          sequelize
            .query(
              `
                    insert into leaders(email,password,leader_name) values('${email}','${passHash}','${leader_name}');
                    select * from leaders where email = '${email}';
                `
            )
            .then((dbResponse) => {
               console.log(dbRes[0][0])
              delete dbResponse[0][0].password;
              const token = createToken(email, dbResponse[0][0].leader_id);
              console.log("token", token);
              const userToSend = { ...dbResponse[0][0], token };
              console.log(userToSend);
              res.status(200).send(userToSend);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },
};