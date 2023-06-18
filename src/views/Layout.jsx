import React, { useEffect, useState } from "react";

import reportService from "../Service/reportService";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Bar, Line } from "react-chartjs-2";
const Layout = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const [Dataa, setData] = useState();
  const [DataClients, setDataClients] = useState({
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  });
  const [DataReservation, setDataReservation] = useState({
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#ccc', // Custom color for y-axis grid lines
        },
      },
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#8884d8',
        titleFontColor: '#fff',
        bodyFontColor: '#fff',
        footerFontColor: '#fff',
      },
      legend: {
        display: true,
        labels: {
          fontColor: '#8884d8',
        },
      },
    },
  };
  useEffect(() => {
    reportService
      .getReport()
      .then((res) => {
        setData(res.data.data);
        let response = res.data.data;
        let labels = [];
        let data = [];
        response?.clients_per_month.forEach((item) => {
          labels.push(0);
          labels.push("2023-04");
          labels.push(item._id);
          data.push(0);
          data.push(1);
          data.push(item.count);
          let chartData = {
            labels: labels,
            datasets: [
              {
                label: "Statistique client par mois",
                data: data,
                borderColor: "#8884d8",
                borderColor: '#8884d8',
                backgroundColor: 'rgba(136, 132, 216, 0.3)', // Custom color for area under line
                pointBackgroundColor: '#fff',
                pointBorderColor: '#8884d8',
                pointHoverBackgroundColor: '#8884d8',
                pointHoverBorderColor: '#fff',
                borderWidth: 2,
              },
            ],
          };
          setDataClients(chartData);
        });
        labels = [];
        data = [];
        response?.reservations_per_month.forEach((item) => {
          labels.push(0);
          labels.push(item._id);
          data.push(0);
          data.push(item.count);
          let chartData2 = {
            labels: labels,
            datasets: [
              {
                label: "Statistique réservations par mois",
                data: data,

                borderColor: "#8884d8",
                backgroundColor: "rgba(136, 132, 216, 0.3)", // Custom color for area under line
                pointBackgroundColor: "#8884d8",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#8884d8",
                borderWidth: 2,
              },
            ],
          };
          setDataReservation(chartData2);
        });
      })

      .catch((e) => {});
  }, []);

  const LineChart = () => {
    return <Line data={DataClients} options={options} />;
  };
  const BarChart = () => {
    return <Bar data={DataReservation} options={options} />;
  };
  return (
    <div>
      {/* Page-header start */}

      {/* Page-header end */}
      <div className="pcoded-inner-content">
        {/* Main-body start */}
        <div className="main-body">
          <div className="page-wrapper">
            {/* Page-body start */}
            <div className="page-body">
              <div className="row">
                {/* task, page, download counter  start */}
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-purple">
                            {Math.abs(Dataa?.revenue)}
                          </h4>
                          <h6 className="text-muted m-b-0">Revenue</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="fa fa-bar-chart f-28" />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-purple">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <p className="text-white m-b-0">% change</p>
                        </div>
                        <div className="col-3 text-right">
                          <i className="fa fa-line-chart text-white f-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-green">
                            {Dataa?.reservations}
                          </h4>
                          <h6 className="text-muted m-b-0">Reservations</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="fa fa-file-text-o f-28" />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-green">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <p className="text-white m-b-0">% change</p>
                        </div>
                        <div className="col-3 text-right">
                          <i className="fa fa-line-chart text-white f-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-red">{Dataa?.cars}</h4>
                          <h6 className="text-muted m-b-0">Voiture dispo</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="fa fa-calendar-check-o f-28" />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-red">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <p className="text-white m-b-0">% change</p>
                        </div>
                        <div className="col-3 text-right">
                          <i className="fa fa-line-chart text-white f-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card">
                    <div className="card-block">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="text-c-blue">{Dataa?.customers}</h4>
                          <h6 className="text-muted m-b-0">Clients</h6>
                        </div>
                        <div className="col-4 text-right">
                          <i className="fa fa-hand-o-down f-28" />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-c-blue">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <p className="text-white m-b-0">% change</p>
                        </div>
                        <div className="col-3 text-right">
                          <i className="fa fa-line-chart text-white f-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* task, page, download counter  end */}
                {/*  sale analytics start */}
                <div className="col-xl-12 col-md-12">
                  <div className="card">{LineChart()}</div>
                </div>

                <div className="col-xl-12 col-md-12">
                  <div className="card">{BarChart()}</div>
                </div>

                {/*  sale analytics end */}
                {/*  project and team member start */}


                {/*  project and team member end */}
              </div>
            </div>
            {/* Page-body end */}
          </div>
          <div id="styleSelector"> </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
