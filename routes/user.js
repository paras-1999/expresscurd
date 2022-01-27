import express from 'express'
const router = express.Router();
router.get("/", (req, res) => {
    res.send('user Page')
})
router.get("/paras", (req, res) => {
    res.send('user paras')
})
export default router;