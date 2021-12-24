import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import React, { useEffect , useRef} from 'react';

function App() {
  var [datas, setDatas]= useState([]);
  var [data, setData]= useState([]);
 
 const getDatas = async () => {
    await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty').then(response=>{
    
    //console.log(response.data);
    
     setDatas(response.data);
    })
  }
  var i=0;
  var items = [];
  const getData = async () => {
    
   
      datas.map(itemId=>{  
         return  axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`).then(response=>{
          console.log("asdasdasdasdasdasd")
        if(i<=30){
          items[i]=response.data;      
          i++;    
          if(i === 30){
            setData(items)
          }
        }        
          }) 
          
      })
      
     
  }
 
  useEffect(() => {
   
    getDatas();
    getData();
},[]);



  return (
    <div className="App">
      <header className="App-header">
aaaaaaaa
      {data.map((dat)=>{
        return(
  
           <p key={dat.id}>{dat.title}</p>  
        )
      })}
  
      </header>
    </div>
  );
    }


export default App;