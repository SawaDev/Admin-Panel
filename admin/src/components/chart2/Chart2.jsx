import axios from 'axios';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetch from '../../hooks/useFetch';

export default function Chart2({ id, startDate, endDate }) {

  const [sale, setSale] = useState([])
  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await axios.get(`/sales/${id}/daily?start=${startDate}&end=${endDate}`)
        setSale(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getSales();
  }, [id, startDate, endDate])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={sale}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalKeldi" fill="#8884d8" />
        <Bar dataKey="totalKetdi" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}