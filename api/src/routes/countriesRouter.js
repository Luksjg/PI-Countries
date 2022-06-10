const { Router } = require('express');
// Importar todos los routers;

const Sequelize = require('sequelize')

const axios = require('axios');

//Traemos las tablas de db
const { Country, Activity, country_activity} = require('../db.js');

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

    const queryOrder = req.query.order


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
        let countryName = await Country.findAll({
            where : {
                name: {
                    // Operador que busca coincidencias y no es case sensitive
                    //Si solo pongo queryName me toma la busqueda exacta
                    [Sequelize.Op.iLike] : `%${queryName}%`
                }
            }
        })
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('No se encontro el pais')
    } 
    else if(queryOrder){
        try {
        let country = await Country.findAll({
            // Trae hasta 9 paises
            // limit : 9,
            // Paginado - desde donde empieza a contar
            // offset: req.query.page,
            order : [['population', queryOrder]],
            include: {
                model: Activity,
            }
        })
        res.status(200).send(country)
        } catch (error) {
        res.status(500).send('Error')
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
    // Obtener el detalle de un país en particular
    // Debe traer solo los datos pedidos en la ruta de detalle de país
    // Incluir los datos de las actividades turísticas correspondientes

    const countryId = req.params.idPais
    let aux = countryId.toUpperCase();

    let countryById = await Country.findByPk(aux, {
        include : {
            model : Activity
        }
    })

    res.status(200).send(countryById)
})

module.exports = router;
