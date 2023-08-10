const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

// const corsOptions = {
//     exposedHeaders: 'Authorization',
//   };
// app.use(cors(corsOptions))

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const { seed } = require('./controllers/seed.js')
const { userLogin, userSignup } = require('./controllers/userAuthentication')
const { getGirls, getActivities, getUpcomingActivity, updateGirlsInfo, deleteGirl, addGirl, getActivitiesByGirl,updateActivity,deleteActivity, addActivity, getActivity, getGirlsByActivity, getGirlsNotInActivity,addParticipant } = require('./controllers/girlsScout');


//entry-point for app
app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

//console.log("Going to seed")
//seed endpoint
app.post('/api/seed',seed)  

//login and signup auth endpoints_ used at userlogin/signup
app.post('/api/login',userLogin)
app.post('/api/signUp',userSignup)

// girls and activities EP
app.post('/api/addGirl',addGirl)//addGirl.html
app.post('/api/addActivity',addActivity)//addActivity.html
app.post('/api/addParticipant',addParticipant)//activityDetail.html


app.get('/api/getGirls/:id',getGirls)// in dashboard
app.get('/api/getActivitiesByGirl/:girl_id',getActivitiesByGirl)//used when a girl is clicked girlDetail

app.get('/api/getActivities',getActivities)//used in dashboard
app.get('/api/getUpcomingActivity',getUpcomingActivity)//used in the landing page index.html

app.get('/api/getActivity',getActivity)//used when an activity is clicked to get details
app.get('/api/getGirlsByActivity/:activity_id',getGirlsByActivity)//used when an activity is clicked to get details
app.get('/api/getGirlsNotInActivity/:activity_id',getGirlsNotInActivity)//used when an activity is clicked to get details,get the list girls who are not part of the activity

app.put('/api/updateGirlsInfo',updateGirlsInfo)
app.delete('/api/deleteGirl/:id',deleteGirl)
app.put('/api/updateActivity',updateActivity)
app.delete('/api/deleteActivity/:id',deleteActivity)

app.listen(4001,() => console.log(`server running on 4001`))//