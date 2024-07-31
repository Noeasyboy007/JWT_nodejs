const test = async (req,res)=>{
    try {
        res.cookie("Aritra", "Bera");
        res.send("Done")
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {test};