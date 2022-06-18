const { Router } = require('express');
// Importar todos los routers;

const Sequelize = require('sequelize')

const axios = require('axios');

//Traemos las tablas de db
const { Country, Activity} = require('../db.js');

// const Countries = require('./countries.js');

const router = Router();


const getCountriesApi = async () => {
    const countriesUrl = await axios.get('https://restcountries.com/v3/all');
    const countries = await countriesUrl.data.map(country => {
        return{
            name: country.name.common,
            id: country.cca3,
            flags: country.flags[0],
            continent: country.continents[0],
            capital: country.capital != null ? country.capital : 'No se encontro capital',
            subregion: country.subregion,
            area: country.area,
            population: country.population
        }
    });
    return countries;
}




router.get('/', async (req,res) => {
    // Se traen todos los paises desde la API a la DB para utilizarlos desde ahi
    // Se almacenan solo los datos necesarios para la ruta principal 
    // Se obtiene un listado de los paises

    // Guardo en una constante lo que obtengo de la api
    const countries = await getCountriesApi()

    const queryName = req.query.name


    let bd = await Country.findAll({
        include: {
            model: Activity,
        }
    })
    // Si no hay datos, se crean
    if(!bd.length){
        // bulkCreate busca los campos en el objeto y los pasa a la tabla
        // los datos del objeto para los que no hay campos en la tabla, no los guarda
        await Country.bulkCreate(countries)
    } 


    if(queryName){
        try {
            let countryName = await Country.findAll({
                where : {
                    name: {
                        [Sequelize.Op.iLike] : `%${queryName}%`
                    }
                }
            })
            res.status(200).send(countryName) 
        } catch (error) {
            res.status(404).send('')
        }
    } 
    else {
        let full = await Country.findAll({
            include: {
                model: Activity
            }
        })
        res.status(200).send(full)
    }

})

router.get('/:idPais', async (req,res) => {

    const countryId = req.params.idPais
    let aux = countryId.toUpperCase();

    let countryById = await Country.findByPk(aux, {
        include : {
            model : Activity
        }
    })
    countryById ?
    res.status(200).send(countryById):
    res.status(404).send(":v")
})

module.exports = router;
