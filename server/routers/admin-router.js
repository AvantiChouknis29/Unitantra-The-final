const express = require('express');
const {getAdminStats,updateUserApplicationStatus,updateApplicationStatus, getAgency, getAllUsers, getAllAgency,deleteUserById,getUsersById,updateUserById,deleteAgencyById,getAgencyById,updateAgencyById,fliightTicketRequest,accomodationRequest,IELTSRequest,CounsellingRequest,queriesRequest,fetchAllAgency,acceptagency,rejectagency,getUser } = require('../controllers/admin-controller');
const authMiddleware=require("../middlewares/auth-middleware")
const adminMiddleware=require('../middlewares/admin-middleware')
const router = express.Router();
router.get('/users',authMiddleware,adminMiddleware, getAllUsers);
router.get('/agency',authMiddleware,adminMiddleware, getAllAgency);
router.get('/users/:id',authMiddleware,adminMiddleware, getUsersById);
router.patch('/users/update/:id',authMiddleware,adminMiddleware,updateUserById)
router.delete('/users/delete/:id',authMiddleware,adminMiddleware,deleteUserById)
router.get('/agency/:id', authMiddleware, adminMiddleware, getAgencyById);
router.patch('/agency/update/:id', authMiddleware, adminMiddleware, updateAgencyById);
router.get('/flights',authMiddleware, adminMiddleware,fliightTicketRequest )
router.delete('/agency/delete/:id', authMiddleware, adminMiddleware, deleteAgencyById);
router.get('/accomodation', authMiddleware, adminMiddleware,accomodationRequest )
router.get('/ielts', authMiddleware, adminMiddleware,IELTSRequest )
router.get('/counselling', authMiddleware, adminMiddleware, CounsellingRequest);
router.get('/queries', authMiddleware, adminMiddleware,queriesRequest )
router.get('/agencies', authMiddleware, adminMiddleware,fetchAllAgency )

router.patch('/agencies/:id/accept', authMiddleware, adminMiddleware,acceptagency )
router.patch('/agencies/:id/reject', authMiddleware, adminMiddleware,rejectagency )
router.get('/applications/:email', authMiddleware, adminMiddleware, getUser);
router.get('/agency/applications/:agencyId', authMiddleware, adminMiddleware, getAgency);
router.put("/agency/application/status/:appId",updateApplicationStatus);
router.put("/user/application/status/:appId", updateUserApplicationStatus);
router.get("/stats",getAdminStats);
module.exports = router;
