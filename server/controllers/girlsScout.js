require("dotenv").config();
const { DATABASE_CONFIG } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_CONFIG, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
   
    getGirls:(req,res) => {
        console.log("Getting Girls");
        const {id} = req.params
        sequelize.query(`
          select * from girls where leader_id = ${id}
          order by girl_id desc
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(400).send(err))
    },

    getActivities:(req,res) => {
      console.log("Getting Activities");
      //  Get upcoming activities (ordered by date ascending)and  Get past activities (ordered by date descending)
      sequelize.query(`
      
      SELECT *
      FROM activities
      WHERE CAST(date AS DATE) >= current_date
      order by DATE
      

    
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err))
    },

    getUpcomingActivity:(req,res) => {
      console.log("Getting Activities");
      //  Get upcoming activities (ordered by date ascending)and  Get past activities (ordered by date descending)
      sequelize.query(`
      
      SELECT *
      FROM activities
      WHERE CAST(date AS DATE) >= current_date
      order by DATE
      limit 1
      

    
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err))
    },

    

    updateGirlsInfo:(req,res) => {
      console.log("updateGirlsInfo");
      const { girl_id,leader_id, girl_name, guardian_name, contact_number, age } = req.body;
      sequelize.query(`
                UPDATE girls
                SET leader_id = ${leader_id},
                girl_name = '${girl_name}',
                guardian_name = '${guardian_name}',
                contact_number = '${contact_number}',
                age = ${age}
            WHERE girl_id = ${girl_id};
          
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(400).send(err))
    },


    deleteGirl:(req,res)=>{
        console.log("deleteGirl");

        const {id} = req.params
        sequelize.query(`
            DELETE FROM participation
            WHERE girl_id = ${id};
            DELETE FROM girls
            WHERE girl_id = ${id};

        `).then (dbRes=>res.status(200).send(dbRes[0]))
            .catch(err => res.status(400).send(err))
    },

    deleteActivity:(req,res)=>{
        console.log("deleteActivity");

        const {id} = req.params
        sequelize.query(`
            DELETE FROM participation
            WHERE activity_id = ${id};
            DELETE FROM activities
            WHERE activity_id = ${id};

        `).then (dbRes=>res.status(200).send(dbRes[0]))
            .catch(err => res.status(400).send(err))
    },
    updateActivity:(req,res) => {
        console.log("updateActivity");
        const { activity_name, date, description, activity_id } = req.body;
            sequelize.query(`
                    UPDATE activities
                    SET activity_name = '${activity_name}',
                    date = '${date}',
                    description = '${description}'
                WHERE activity_id = ${activity_id};
              
            `).then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(400).send(err))
    },

    addGirl:(req,res) => {
      console.log("addGirl");
      const { leader_id, girl_name, guardian_name, contact_number, age } = req.body;
      sequelize.query(`
      insert into girls (leader_id, girl_name, guardian_name, contact_number, age)
      VALUES (${leader_id}, '${girl_name}', '${guardian_name}', '${contact_number}', ${age})
        
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err))
    },

    addActivity:(req,res) => {
      console.log("addActivity");
      const { activity_name, date, description, leader_id } = req.body;
      sequelize.query(`

      INSERT INTO activities (activity_name, date, description, leader_id)
        values ('${activity_name}', '${date}', '${description}', ${leader_id} )
        
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err))
    },
    // i wan t to display the activity details on html pagewhen i retrieve data from these 3 methods. first the name date and decription of the activity and the girls who are part of the activity. And  then a drop down box where i can select the girls name to add to the participation table
    getActivity:(req,res) => {
      console.log(" getActivity");
      const {  activity_id } = req.params;
      
      sequelize.query(`
        select * from activities 
        where activity_id = ${activity_id}
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err))
    },

    getGirlsByActivity:(req,res) => {
      console.log("getGirlsByActivity");
      const {  activity_id } = req.params;
            sequelize.query(`
                    select g.girl_name  from girls g
                     join participation p on g.girl_id = p.girl_id
                     where p.activity_id = ${activity_id}
              `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(400).send(err))
    },
    getGirlsNotInActivity:(req,res) => {
      // this method is called in an activity description page where we list the girls not in activity , so we can add them
      console.log("getGirlsNotInActivity");
      const {  activity_id } = req.params;
            sequelize.query(`
                    select  g.girl_id, g.girl_name  from girls g
                     left join participation p on g.girl_id = p.girl_id
                     and  p.activity_id = ${activity_id}
                     where  p.activity_id is NULL
              `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => res.status(400).send(err))
    },
  
    getActivitiesByGirl : (req,res) => {
        console.log("getActivitiesByGirl Girls");
        const {girl_id} = req.params
        sequelize.query(`
          select a.activity_name, a.activity_id from activities a
          join participation p on a.activity_id = p.activity_id 
          where p.girl_id = ${girl_id}

        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(400).send(err))
    },
    addParticipant:(req,res) => {
      console.log("addParticipant");
      const { girl_id, activity_id } = req.body;
      sequelize.query(`
      INSERT INTO participation (girl_id, activity_id)
      VALUES (${girl_id},  ${activity_id})
        
      `).then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => res.status(400).send(err))
    }            
          
}