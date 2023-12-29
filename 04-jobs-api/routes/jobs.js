const router = require("express").Router();
const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").patch(updateJob).get(getJob).delete(deleteJob);

module.exports = router;
