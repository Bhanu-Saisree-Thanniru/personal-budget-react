import React from 'react';
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './App.scss'
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import ChartJS from './ChartJS/ChartJS';
import D3ChartJS from './D3JSChart/D3JSChart';

function App() {

  
  const reqURL = "http://localhost:3000/budget";
  const [dataSource, setDataSource] = React.useState({
    datasets: [
      {
          data: [],
          backgroundColor: [
              'red',
              'blue',
              'teal',
              'black',
              'orange',
              'silver',
              'grey',
              'green'
          ],
      }
  ],
  labels: []
  });

  const [d3DataSource, setD3DataSource] = React.useState([]);

  React.useEffect(() => {
    axios.get(reqURL).then((res) => {
      setD3DataSource(res.data.myBudget);
      setDataSource({
        datasets: [
          {
              data: res.data.myBudget.map((d) => d.budget),
              backgroundColor: [
                  'red',
                  'blue',
                  'teal',
                  'black',
                  'orange',
                  'silver',
                  'grey',
                  'green'
              ],
          }
      ],
      labels: res.data.myBudget.map((d) => d.title)
      });
    });
  }, []);

  if (!dataSource) return null;

  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className='mainContainer'>
        <Routes>
          <Route path='/about' element={<AboutPage/>}>
            
          </Route>
          <Route path='/login' element={ <LoginPage/>}>
           
          </Route>
          <Route path='' element={<HomePage/>}> 
          </Route>
        </Routes>
      </div>
      
      <ChartJS chartData= {dataSource}/>
      <D3ChartJS d3JSDataSource={d3DataSource}/>
      <Footer/>
    </Router>
  );
}

export default App;
