import React from 'react';
import { Block } from './Block';
import { FinalBlock } from './FinalBlock';
import './index.scss';
import axios from 'axios';



function App() {
  const defaultAPI="https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  const [fromCurrency,setFromCurrency] = React.useState('UAH');
  const [toCurrency,setToCurrency] = React.useState('USD');
  const [ApiCurrency,setApiCurrency] = React.useState({});
  const [fromPrice,setFromPrice]= React.useState(0);
  const [toPrice,setToPrice]= React.useState(0);

  React.useEffect(()=>{
    axios.get(defaultAPI)
    .then (function (responce){
      setApiCurrency(responce.data)
    })
    .catch(function (error) {
      console.warn(error);
      alert('Не вдалося отримати інформацію')
    })
  },[])
let currentval=0
let newcurrenval=0
 for(let i =0;i<ApiCurrency.length;i++){
  if(toCurrency==="UAH"){
  currentval=1
  }
  if(fromCurrency==="UAH"){
    newcurrenval=1
  }
  if(toCurrency===ApiCurrency[i].cc){
  currentval=ApiCurrency[i].rate}
  if(fromCurrency===ApiCurrency[i].cc){
    newcurrenval = ApiCurrency[i].rate
  }
}
  const onChangeFromPrice =(value)=>{
    if(value<0){
      alert("Введіть лише позитивні значення")
      value=0;
    }
    setFromPrice(value);
  }

 function onSubmit(){
  const price= fromPrice*newcurrenval/currentval
  setToPrice(price)
 }


  return (
    <div className="App">
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice} />
     <input 
     onClick={onSubmit}
     className='submit'
      value="КОНВЕРТУВАТИ"
      type="submit"
      placeholder={0}
    />
      <FinalBlock
      value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} 
     />
    </div>
  );
}

export default App;
