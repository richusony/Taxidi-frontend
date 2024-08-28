import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const LineGraph = ({ chartData }) => {


    const options = {}

    const labels = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]
    const data = {
        labels: chartData?.labels,
        datasets: [{
            label: 'Bookings',
            data: chartData?.data,
            backgroundColor: "#593CFB",
            // borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    return (
        <Line data={data} options={options} />
    )
}

export default LineGraph