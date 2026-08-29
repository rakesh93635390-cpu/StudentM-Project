const express=require('express')
const router=express.Router()
const pool=require('../db')

// Add New Student
router.post('/students',async(req,res)=>{
    try{
         const {name,register_no,department}=req.body
         const result= await pool.query('INSERT INTO students(name,register_no,department) VALUES($1,$2,$3)RETURNING *',[name,register_no,department])
         res.json(result.rows[0])
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Error"
        })
    }
})
//Show student
router.get("/students",async(req,res)=>{
    try{
const result=await pool.query('SELECT * FROM students')
res.json(result.rows)
    }
    
    catch(err){
        console.log(err);
    res.status(500).json({
      message: err.message
        })
    }
})
// Student update
router.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, register_no, department } = req.body;

  try {
    const result = await pool.query(
      `UPDATE students
       SET name = $1,
           register_no = $2,
           department = $3
       WHERE id = $4
       RETURNING *`,
      [name, register_no, department, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});


// Delete student
router.delete("/students/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    res.json({
      message: "Student deleted successfully",
      student: result.rows[0]
    });

  } catch(err) {

    console.log(err);
    res.status(500).json({
      message:"Delete failed"
    });

  }

});

module.exports=router