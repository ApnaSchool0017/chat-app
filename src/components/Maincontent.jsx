import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaRegCalendarMinus } from "react-icons/fa";

function Maincontent() {
  const [chart, setChart] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "Earning",
        data: [60, 32, 48, 39, 99, 41, 70, 91],
      },

      {
        name: "lost",
        data: [60, 70, 91, 30, 41, 65, 20, 49],
      },
    ],
  });
  return (
    <div>
      <h2 className="mb-8 font-bold text-3xl">Dashboard</h2>
      <div className="grid grid-cols-3 gap-x-10 gap-y-14">
        {/* card 1 */}
        <div className="bg-white border-l-4 border-teal-400 cursor-pointer p-10  rounded-2xl hover:shadow-teal-300  shadow-lg transform hover:scale-[105%] transition ease-out duration-300  ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-600 text-lg mb-2">
                Earning (Monthly)
              </h2>
              <h1 className="font-bold text-2xl ">$30,000</h1>
            </div>
            <div>
              <FaRegCalendarMinus className="font-extrabold text-4xl text-teal-500" />
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="bg-white border-l-4 border-lime-500 cursor-pointer p-10  rounded-2xl hover:shadow-lime-300  shadow-lg transform hover:scale-[105%] transition ease-out duration-300  ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-600 text-lg mb-2">
                Erning (Annual)
              </h2>
              <h1 className="font-bold text-2xl ">$2,80,000</h1>
            </div>
            <div>
              <FaRegCalendarMinus className="font-extrabold text-4xl text-lime-500" />
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div className="bg-white border-l-4 border-orange-500 cursor-pointer p-10  rounded-2xl hover:shadow-orange-300  shadow-lg transform hover:scale-[105%] transition ease-out duration-300  ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-600 text-lg mb-2">
                Tasks (Pendding)
              </h2>
              <h1 className="font-bold text-2xl ">1000</h1>
            </div>
            <div>
              <FaRegCalendarMinus className="font-extrabold text-4xl text-orange-500" />
            </div>
          </div>
        </div>

        {/* card 4 */}
        <div className="bg-white col-span-2 h-72 border-l-4 border-pink-500 cursor-pointer p-4  rounded-2xl hover:shadow-pink-300  shadow-lg transform hover:scale-[105%] transition ease-out duration-300  ">
          <Chart
            options={chart.options}
            series={chart.series}
            type="area"
            width="100%"
            height="100%"
          />
        </div>

        {/* card 5 */}
        <div className="bg-white h-72 border-l-4 border-blue-600 cursor-pointer  rounded-2xl hover:shadow-blue-300  shadow-lg transform hover:scale-[105%] transition ease-out duration-300  ">
          <div className="flex flex-col gap-6 items-center justify-between">
            <div>
              <h2 className="font-semibold m-4 text-gray-600 text-lg mb-2">
                Earning (Monthly)
              </h2>
            </div>
            <div>
            <Chart
              options={{
                labels:['jan','feb','mar','april','may','jun','jul','aug','sep','nov','dec'],
              colors:['#F44336', '#E91E63', '#9C27B0','#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800','#546E7A', '#E91E63'],

              }}
              series={[223,33,333,444,653,223,33,333,444,288,93]}
              type="pie"
              width="100%"
            />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maincontent;
