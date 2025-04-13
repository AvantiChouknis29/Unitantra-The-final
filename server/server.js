require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db");
const authRoute = require('./routers/auth-router');
const errorMiddleware = require('./middlewares/error-middleware');
const profileRoute = require("./routers/profile-router");
const shortlistRoutes = require('./routers/shortlist');
const AirTicket = require("./routers/AirTicket-router");
const Accommodation = require("./routers/Accomodation-router");
const { submitApplication} = require('./controllers/application-controller'); // Adjust path as needed
const IELTSRoute=require('./routers/Ielts-router')
const CounsellingForm=require('./routers/Counselling')
const MovieTicketForm=require('./routers/newmovieticket-router')
const QueriesForm=require('./routers/Queries')
const agencyRoutes = require('./routers/agency-router');
const agencyProfileRoute=require('./routers/agencyProfile-router')
const agencyStudentsRoute = require('./routers/agencyStudents'); // Adjust the path if needed
const addStudentAgencyRoute=require('./routers/agencyAddStudent-router')
const agencyCartRoute = require("./routers/agencyCartRoute"); 
const agencyApplications=require("./routers/agencyApplication-router")
const adminRoute=require("./routers/admin-router")
const applicationRouter = require('./routers/StudentApplied'); 

// Middleware
app.use(express.json());

// Handling CORS policy issue
const corsOptions = {
    origin: ["http://localhost:5173",
    "https://unitantra-the-final-frontend.onrender.com"],
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
};

// Register CORS middleware
app.use(cors(corsOptions));

// Register routes
app.use('/api', shortlistRoutes);
app.use("/api/auth", authRoute);
app.use("/api/form", profileRoute);
app.use("/api", AirTicket);
app.use("/api", Accommodation);
app.use("/api",IELTSRoute)
app.post('/api/apply', submitApplication);


app.use('/api/',CounsellingForm)
app.use('/api',MovieTicketForm)
app.use('/api',QueriesForm)
app.use('/api', agencyRoutes);
app.use('/api',agencyProfileRoute)
app.use('/api/agency-students', agencyStudentsRoute);
app.use(addStudentAgencyRoute)
app.use('/api', agencyCartRoute);
app.use('/api/agencyApplications',agencyApplications)
app.use("/api/admin",adminRoute)
app.use("/api",applicationRouter)

// Error middleware handler
app.use(errorMiddleware);

// cart route
const cart_route = require("./routers/cartRoute");
app.use('/api', cart_route);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server working at port ${PORT}`);
    });
});
