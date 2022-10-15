import "./singleKamar.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart2 from "../../components/chart2/Chart2";
import { addSale } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { kamarInputs } from "../../formSource";
import { publicRequest, userRequest } from "../../requestMethods";

const SingleKamar = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[1];
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const dispatch = useDispatch();
  const [kamarUp, setKamarUp] = useState({})
  const [sale, setSale] = useState({
    "keldi": 0,
    "ketdi": 0
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSale((prev) => ({ ...prev, kamarId: id, [e.target.id]: e.target.value }));
  };

  const handleChangeUpdate = (e) => {
    setKamarUp((prev) => (
      {
        ...prev,
        [e.target.id]: e.target.value
      }
    ))
  }

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const newSale = {
        ...sale,
      };

      const newInfo = {
        soni: data.soni + (sale.keldi - sale.ketdi),
      }

      addSale(newSale, dispatch);
      await userRequest.put(`/kamars/${id}`, newInfo);
      navigate(`/${path}`);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedKamar = {
        ...kamarUp,
      }

      await userRequest.put(`/kamars/${id}`, updatedKamar);
      navigate(`/${path}`);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const date = new Date()
    //keyingi kun uchun
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const nextYear = nextDate.getFullYear();
    const nextEndMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
    const nextDay = nextDate.getDate().toString().padStart(2, '0');
    //start day uchun
    const year = date.getFullYear()
    const day = date.getDate().toString().padStart(2, '0');
    const endFullDate = `${nextYear}-${nextEndMonth}-${nextDay}`
    setEndDate(endFullDate)

    const startMonth = date.getMonth().toString().padStart(2, '0');
    const startFullDate = `${startMonth === '00' ? year - 1 : year}-${startMonth === '00' ? '12' : startMonth}-${day}`

    setStartDate(startFullDate)
  }, [])

  const { data, loading } = useFetch(`/kamars/find/${id}`);

  return (
    <div className="skamar">
      <Sidebar />
      <div className="skamarContainer">
        <Navbar />
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="top">
              <div className="left">
                <div className="editButton">Info</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={data.img}
                    alt="no image"
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{data.category}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Size:</span>
                      <span className="itemValue">{data.size}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Color:</span>
                      <span className="itemValue">{data.color}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Temir:</span>
                      <span className="itemValue">
                        {data.temir}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Narxi:</span>
                      <span className="itemValue">{data.price}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Soni:</span>
                      <span className="itemValue">{data.soni}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue">{data.desc}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart2 id={id} startDate={startDate} endDate={endDate} />
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-left">
                <form >
                  <div className="formInputs">
                    <label>Keldi: </label>
                    <input
                      id="keldi"
                      onChange={handleChange}
                      type="number"
                      placeholder="Keldi"
                    />
                  </div>
                  <div className="formInputs">
                    <label>Ketdi: </label>
                    <input
                      id="ketdi"
                      onChange={handleChange}
                      type="number"
                      placeholder="Sotildi"
                    />
                  </div>
                  <button onClick={handleClick}>Update</button>
                </form>
              </div>
              <div className="bottom-right">
                <ul className="home-choose-date">
                  <li>
                    <label htmlFor="start-date">Initial Date</label>
                    <input type="date" name="start-date" value={startDate} onChange={event => setStartDate(event.target.value)} />
                  </li>
                  <li>
                    <label htmlFor="end-date">Final date</label>
                    <input type="date" name="end-date" value={endDate} onChange={event => setEndDate(event.target.value)} />
                  </li>
                </ul>
              </div>
            </div>
            <form>
              {kamarInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChangeUpdate}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <button onClick={handleUpdate}>Update</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleKamar;