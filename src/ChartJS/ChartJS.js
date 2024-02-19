import React from "react";
import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

function ChartJS(props) {
    
    return (
      <div className="chart-container" style={{ width: 350, height: 350 }}>
        <div style={{ textAlign: "center", height: "350px!important", width: "350px!important"}}>Pie Chart</div>
        <Pie
          data={props.chartData}
        />
      </div>
    );
  }
  export default ChartJS;