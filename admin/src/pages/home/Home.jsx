import "./home.scss";
//  import "./home2.scss";
import api from '../../api'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from 'react'
import { publicRequest } from "../../requestMethods";

const Home = () => {
  const [data, setData] = useState('');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [value, setValue] = useState(1);
  const [convertedValue, setConvertedValue] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0)
  const [base, setBase] = useState('USD')
  const [symbol, setSymbol] = useState('UZS')
  const [symbols, setSymbols] = useState({
    "UZS": {
      "description": "Uzbekistan Som",
      "code": "UZS"
    },
    "USD": {
      "description": "United States Dollar",
      "code": "USD"
    },
  })
  const [stats, setStats] = useState([])

  useEffect(() => {
    api.getCurrentQuote(base, symbol)
      .then(response => {
        if (response.error) console.log(response.error)
        else setCurrentQuote(response)
      })
  }, [base, symbol])

  useEffect(() => {
    setConvertedValue(value * currentQuote)
  }, [value, currentQuote])

  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    const endMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const endFullDate = `${year}-${endMonth}-${day}`
    setEndDate(endFullDate)

    const startMonth = date.getMonth().toString().padStart(2, '0');
    const startFullDate = `${startMonth === '00' ? year - 1 : year}-${startMonth === '00' ? '12' : startMonth}-${day}`

    setStartDate(startFullDate)
  }, [])

  useEffect(() => {
    api.getTimeSeries(startDate, endDate, base, symbol)
      .then(response => {
        if (response.error) console.log(response.error)
        else setData(response)
      })
  }, [startDate, endDate, base, symbol])

  useEffect(() => {
    api.getSymbols()
      .then(response => {
        if (response.error) console.log(response.error)
        else setSymbols(response)
      })
  }, [])

  useEffect(() => {
    publicRequest.get('/kamars/warehouse')
      .then(response => {
        if (response.error) console.log(response.error)
        else setStats(response.data)
      })
  }, [])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="warehouse" stats={stats}/>
          <Widget type="money_in_warehouse" stats={stats}/>
          <Widget type="earning" stats={stats}/>
          <Widget type="balance" stats={stats}/>
        </div>
        <div className="charts">
          <Featured className='featured' />
          <div className="container">
            <div className="chart">
              <Chart data={data} symbol={symbol} />
            </div>

            <ul className="home-choose-date">
              <li>
                <label htmlFor="start-date">Initial Date</label>
                <input type="date" name="start-date" value={startDate} onChange={event => setStartDate(event.target.value)} />
              </li>
              <li>
                <label htmlFor="end-date">Final date</label>
                <input type="date" name="end-date" value={endDate} onChange={event => setEndDate(event.target.value)} />
              </li>
              <li>
                <label htmlFor="from">From</label>
                <select name="from" id="from" value={base} onChange={event => setBase(event.target.value)}>
                  {Object.keys(symbols).map(key => (
                    <option value={key} key={key}>{symbols[key].description}</option>
                  ))}
                </select>
              </li>
              <li>
                <label htmlFor="to">To</label>
                <select name="to" id="to" value={symbol} onChange={event => setSymbol(event.target.value)}>
                  {Object.keys(symbols).map(key => (
                    <option value={key} key={key}>{symbols[key].description}</option>
                  ))}
                </select>
              </li>
              <li>
                <label htmlFor="value">Value</label>
                <input type="number" value={value} onChange={event => setValue(event.target.value)} />
              </li>
              <li>
                <label htmlFor="convertedValue">Converted Value</label>
                <span>{convertedValue}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
