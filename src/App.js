import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import React, { useEffect , useRef} from 'react';
import ContentCard from './ContentCard/ContentCard';
import NavBar from './NavBar/NavBar';



function App() {
 
  var [data, setData]= useState([]);
  
  var i=0;
  var items = [];
  var timeArr = [];
 const getDatas = async () => {
   axios.all([
    axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty').then(response=>{
      
    
    response.data.map(itemId=>{  
      return  axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`).then(response=>{
       
     if(i<=30){
      
     
        const oneDay = 24 * 60 * 60 * 1000;
        var firstDate = new Date(response.data.time *1000);
        var secondDate = new Date();
       
        var days = Math.round(Math.abs((secondDate - firstDate) / oneDay));
        var hours = Math.round(Math.abs(secondDate - firstDate) / 36e5);
        var minutes = hours * 60;
        var seconds = minutes * 60;
        
       
     //console.log(hours)
      timeArr[i] = {days,hours,minutes,seconds}
      items[i]=[response.data,timeArr[i]];
       i++;    
       if(i === 30){
         setData(items)
         
         //console.log(timeArr)
         console.log(items)
       }
     }        
       }) 
       
   })
     
    }),
    
  
   ])  
  }
 
  useEffect(() => {  
    getDatas()
},[]);

  return (
    <div className="App">
      <header className="App-header">
      <NavBar/>
      {data.map((dat)=>(
        <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} 
        time={dat[1]}
          />
      ))
       }
  
      </header>
    </div>
  );
    }


export default App;