const { Router } = require('express');
const router = Router();
const { Country, Activity} = require('../db.js')



router.get('/', async (req,res) => {
    try {
        let activities = await Activity.findAll()
        res.status(200).send(activities)
    } catch (errors) {
        res.status(500).send('Error')
    }
})

router.post("/",async(req,res)=>{
    try{
        let {name, difficulty, duration, season, countries} = req.body
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        })

         
        countries.forEach(async (country) => {
            let activityCountry = await Country.findOne({
                where: {
                    name: country
                }
            }) 
            await newActivity.addCountry(activityCountry)
        });
        
        res.status(200).send('La actividad se creo exitosamente')
    } catch(error) {
        res.status(500).send('No se pudo crear la actividad')
    }
})

//ruta no aplicada aun

router.put("/:id", async(req,res)=>{
    const {name} = req.body
    const id = req.params.id
    try {
        let activityById = await Activity.findByPk(id)
        activityById.update({
            name:name
        })
        await activityById.save()
        res.status(202).send(activityById)
    } catch (error) {
        res.status(500).send("eror")
    }

})

module.exports = router;
