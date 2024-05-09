const router = require("express").Router();

const { getIdForDoctor } = require("../controllers/doctorController");
const { addAvailabilitySlot, updateAvailabilitySlot, deleteAvailabilitySlot, getAllAvailabilitySlots } = require("../controllers/doctoravailableController");



router.post('/availability',addAvailabilitySlot );
router.put('/availability/:availabilityId', updateAvailabilitySlot);
router.delete('/availability/:availabilityId', deleteAvailabilitySlot);
router.get('/availabilityall', getAllAvailabilitySlots);
router.post('/find-doctorId',getIdForDoctor);

module.exports = router;
