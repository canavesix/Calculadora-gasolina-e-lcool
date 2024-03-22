import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'

/*
  Calculo: alcool / gasolina
  e se o resultado for menor que 0.7 compensa usar alcool

*/
interface infoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}


function App() {
  const[gasolinaInput, setGasolinaInput] = useState(0)
  const[alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<infoProps>()

  function calcular(event:FormEvent){
    event.preventDefault();
    
    let calculo = (alcoolInput / gasolinaInput);

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa álcool!",
        gasolina: moeda(gasolinaInput),
        alcool: moeda(alcoolInput)
      })
    }else{
      setInfo({
        title: "Compensa usar gasolina!",
        gasolina: moeda(gasolinaInput),
        alcool: moeda(alcoolInput)
      })
    }

  }

  function moeda(valor:number){
    let valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency:"BRL"
    })

    return valorFormatado;
  }

  return(
    <div>
      <main className='container'>
        <img 
        className='logo'
        src={logoImg}
        alt='Logo da calculadora posto de gasolina'
        />
        <h1 className='title'>Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Alcool (preço por litro):</label>
          <input 
          className='input'
          type='number'
          placeholder='4,90'
          min="1"
          step='0.01'
          required
          value={alcoolInput}
          onChange={(e)=> setAlcoolInput(Number(e.target.value))}
          />
        

        <label>Gasolina (preço por litro):</label>
          <input 
          className='input'
          type='number'
          placeholder='4,90'
          min="1"
          step='0.01'
          required
          value={gasolinaInput}
          onChange={(e)=> setGasolinaInput(Number(e.target.value))}
        />

        <input className='button' type="submit" value='Calcular' />
        </form>

        {info && Object.keys(info).length>0 &&(
          <section className='result'>
          <h2 className='result-title'>
            {info.title}
          </h2>
          <span>álcool {info.alcool}</span>
          <span>gasolina {info.gasolina}</span>
        </section>
        )}
      </main>
    </div>
  )

}

export default App
