"use client"
import {Chart as    ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts} : DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: "Banks",
                data: [12000, 5000, 3000],
                backgroundColor: ["red", "yellow", "blue"]
            }
        ],
        labels: ["Bank1", "Bank2", "Bank3"]
    }
  return (
    <div>
      <Doughnut
       data={data}
       options={{
        cutout: "60%",
        plugins: {
            legend: {
                display: false
            }
        }
       }}
       />
    </div>
  )
}

export default DoughnutChart
