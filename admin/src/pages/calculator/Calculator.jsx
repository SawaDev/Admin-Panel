import { useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./calculator.scss"

function Calculator() {

  const [soni, setSoni] = useState(0);
  const [price, setPrice] = useState(0);
  const [price_in_dollar, setPrice_in_dollar] = useState(0);
  const [dollar_kurs, setDollar_kurs] = useState(0);
  const [result, setResult] = useState();

  function handleClick() {
    setResult(price * soni - price_in_dollar * dollar_kurs * soni);
  };

  return (
    <div className="calculator">
      <Sidebar />
      <div className="calculatorContainer">
        <Navbar />
        <div className="bottom">
          <div className="container">
            <form>
              <div className="title">Here you can calculate your profit: </div>
              <div className="formInput">
                <div className="input-box">
                  <label> Price: </label>
                  <input
                    placeholder={price}
                    onChange={e => setPrice(+e.target.value)}
                    type="number"
                  />
                </div>
                <div className="input-box">
                  <label> In dollar </label>
                  <input
                    placeholder={price_in_dollar}
                    onChange={e => setPrice_in_dollar(+e.target.value)}
                    type="number"
                    min="0" step="any"
                  />
                </div>
                <div className="input-box">
                  <label> Dollar Kursi</label>
                  <input
                    placeholder={dollar_kurs}
                    onChange={e => setDollar_kurs(+e.target.value)}
                    type="number"
                  />
                </div>
                <div className="input-box">
                  <label> Soni: </label>
                  <input
                    placeholder={soni}
                    onChange={e => setSoni(+e.target.value)}
                    type="number"
                  />
                </div>

                <button type="button" onClick={handleClick}>Calculate</button>
              </div>

              <h1> Your profit is: {result}</h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator