import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const ApiKey = '7ef9706670ff026b2f5c9de1823caff7';
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${ApiKey}`;

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url,
        });
        console.log(data);
        setResult(data);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          placeholder="도시입력"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchWeather}
        ></input>
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="tem">
              {Math.round(((result.data.main.temp - 273.15) * 10)) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 2px solid black;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px black solid;
  border-radius: 8px;
  .city {
    font-size: 24px;
  }
  .tem {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;