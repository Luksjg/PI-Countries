import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, postActivity } from '../../actions/index'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import styles from "./CreateActivity.module.css"

export default function CreateActivity(){
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season:'',
        countries: []
    })

    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    
    
    
    const [errors, setErrors] = useState({})

    function validation(e){
        let errors={}
        if(!/^([A-Za-z]+)$/.test(e.name)){
            errors.name = "Por favor ingrese un nombre valido"
        }
        if(!/^[0-9]+$/.test(e.duration)){
            errors.duration = "Ingrese solamente horas"
        }
        return errors
    }

    function handleCheck(e){

        if(e.target.checked){
            setInput({
                ...input, 
                [e.target.name] : e.target.value
            })
        }
    }

    function handleChange(e){

        setInput({
            ...input, 
            [e.target.name] : e.target.value
        })

        setErrors(validation({
            ...input,
            [e.target.name]:e.target.value
        }))
    }


    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(country => country !== e)
        })
    }

        
    function handleSelect(e){

        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }

    let aux = 1
    
    async function handleSubmit(e){
        if(!input.name || !input.difficulty || !input.duration || !input.season || input.countries.length < 1){
            e.preventDefault()
            return alert('Complete todos los campos para poder continuar')
        }else{
            e.preventDefault()
            dispatch(postActivity(input));
            alert('Tu actividad ha sido creada exitosamente');
            history.push("/home")
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season:'',
                countries: []
            })
        }
    }
    
    
    useEffect(() => {
        dispatch(getCountries('ASC'))
    }, [dispatch])

    return(
        <div className={styles.container}>
            <div>
                <Link to="/home"><button className={styles.btn}>Volver</button></Link>
            </div>

            <h1>Crear actividad</h1>

            <form onSubmit={(e) => handleSubmit(e)} >
                <div>
                <div>
                    <p>Nombre</p>
                    {errors.name ? <p> {errors.name} </p> : null}
                    <input type="text" value={input.name} name='name' onChange={e=>handleChange(e)}></input>
                </div>
                <div>
                    <p>Dificultad</p>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='1' value='1' name='difficulty'/> 1 </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='2' value='2' name='difficulty'/> 2 </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='3' value='3' name='difficulty'/> 3 </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='4' value='4' name='difficulty'/> 4 </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='5' value='5' name='difficulty'/> 5 </label>
                </div>
                <div>
                    <p>Duracion</p>
                    {errors.duration ? <p> {errors.duration} </p> : null}
                    <input type="text" value={input.duration} name="duration" onChange={e=>handleChange(e)}></input><label> horas</label>
                </div>
                <div>
                    <p>Temporada</p>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='Verano' value='Verano' name='season'/> Verano </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='Primavera' value='Primavera' name='season'/> Primavera </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='Oto??o' value='Oto??o' name='season'/> Oto??o </label>
                    <label> <input onChange={(e) => handleCheck(e)} type="radio" key='Invierno' value='Invierno' name='season'/> Invierno </label>
                </div>
                
                <div>
                    <p>Pais donde se realiza: </p>
                    <div>
                    <select onChange={(e) => handleSelect(e)}>
                    {countries.map((country) => (
                        <option id={country.name} key={country.name} value={country.name}>{country.name}</option>
                    ))}
                    </select>
                    </div>
                </div>

                {input.countries.map((e) => 
                <div key={aux} id={aux}>
                    <label key={aux++}>  {e}</label>
                    <button type='button' onClick={() => handleDelete(e)}>X</button>
                </div> 
                )}
                <div>
                    <button type="submit" className={styles.btn} disabled={Object.keys(errors).length === 0 ? false : true }>Crear actividad</button>
                </div>
                </div>
            </form>
        </div>
    )
}