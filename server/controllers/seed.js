require('dotenv').config()
const {DATABASE_CONFIG} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(DATABASE_CONFIG, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed:(req,res) => {
        sequelize.query(`
            drop table if exists participation;
            drop table if exists activities;
            drop table if exists girls;
            drop table if exists leaders;

            create table leaders(
                leader_id serial primary key,
                email varchar not null unique,
                leader_name varchar not null,
                password varchar(500) not null
            );

            create table girls(
                    girl_id serial primary key,
                    leader_id integer references leaders(leader_id),
                    girl_name varchar not null,
                    guardian_name varchar not null,
                    contact_number varchar not null,
                    age integer not null
                
            );
            create table activities(
                activity_id serial primary key,
                activity_name varchar not null,
                date date not null,
                description text null,
                leader_id integer references leaders(leader_id)
            );

            create table participation(
                activity_id integer references activities(activity_id),
                girl_id integer references girls(girl_id)
            );

            insert into  leaders (email, leader_name, password)
            VALUES ('leader1@gmail.com', 'Leader One', 'secretpassword'),
            ('leader2@gmail.com', 'Leader Two', 'hashed_password2');


            insert into girls (leader_id, girl_name, guardian_name, contact_number, age)
            VALUES (1, 'Girl One', 'Guardian One', '123-456-7890', 10),
            (2, 'Girl Two', 'Guardian Two', '987-654-3210', 8);


            INSERT INTO activities (activity_name, date, description, leader_id)
            VALUES ('Horse Riding', '2023-09-02', 'At camp Ricoe', 1),
            ('Food Bank', '2023-10-02', 'At camp Beumount',1),
            ('Canoeing', '2023-10-02', 'At camp Beumount',1),
            ('Camping', '2023-10-02', 'At camp Eldorado', 1),
            ('Movie under the stars', '2023-10-02', 'At camp Eldorado', 1),
            ('Selling Cookies', '2023-11-02', 'H.E.B', 1),
            ('Recycling', '2023-10-05', 'Scout Room', 1),
            ('First Aid', '2023-11-14', 'San Jacinto Community Center', 1),
            ('Library', '2023-11-14', 'Reading badge - San Jacinto Library', 1),
            ('Senior Home Visit', '2023-12-14', 'Trinity Oaks Of Pearland', 1);

            INSERT INTO participation (activity_id, girl_id)
            VALUES (1, 1), (1, 2);
                
        `).then(dbRes => res.sendStatus(200))
        .catch(err => res.status(400).send(err))
    }
}