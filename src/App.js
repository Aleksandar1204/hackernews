import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import React, { useEffect , useRef} from 'react';
import ContentCard from './ContentCard/ContentCard';
import NavBar from './NavBar/NavBar';



function App(props) {
 
  var [data, setData]= useState([]);
  var [filterOption, setOption]= useState("last");
  var i=0;
  var items = [];
  var timeArr = [];
 const getDatas = async () => {
   axios.all([
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(response=>{
      
    
    response.data.map(itemId=>{  
      return  axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`).then(response=>{
       
     if(i<=60){
      
     
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
       if(i === 60){
         setData(items)
         //console.log(items);
         //console.log(timeArr)
         
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

function filterHandler (event) {
  setOption(event.target.value)
  
}
// console.log(filterOption)
var arr = [];

data.map(dat=>{
  return dat[1].hours <=24 ? arr.push(dat):null
})
console.log(arr)
  // if(filterOption === "last"){
   
    

   
    console.log(data);
    if(filterOption === "last"){
      arr.map(dat=>{
        return dat[1].hours <=24 ? arr.sort(function(a,b){
   
           return b[1].hours-a[1].hours;
         }
         
         ):null
       })
      return (
    
        <div className="App">
         <div id="navbar">
                <select name={filterOption} onChange={filterHandler}>
                    <option value="last">Last 24h</option>
                    <option value="first">Unordered</option>
                </select>
                </div>
          <div className="App-header">
          
          {arr.map((dat)=>(
            <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} 
            time={dat[1]}
              />
          ))
           }
      
          </div>
        </div>
      );
    }else {
      return (
    
        <div className="App">
         <div id="navbar">
                <select name={filterOption} onChange={filterHandler}>
                    <option value="last">Last 24h</option>
                    <option value="first">asdasdasd</option>
                </select>
                </div>
          <div className="App-header">
          
          {data.map((dat)=>(
            <ContentCard key={dat[0].id} title={dat[0].title} score={dat[0].score} by={dat[0].by} url={dat[0].url} 
            time={dat[1]}
              />
          ))
           }
      
          </div>
        </div>
      );
    }
  
    }


export default App;