import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

const Stats = () => {
  const state = useSelector((state) => state.products);


  console.log("my state",state)
  const [genderChart, setGenderChart] = useState(null);
  const [categoryChart, setCategoryChart] = useState(null);

  useEffect(() => {
    if (genderChart) {
      genderChart.destroy();
    }
    if (categoryChart) {
      categoryChart.destroy();
    }
    renderCharts();
  }, [state]);

  const renderCharts = () => {
    const categoryCount = {};
    const genderCount = { };

    state.forEach((product) => {
      if (categoryCount[product.category]) {
        categoryCount[product.category]++;
      } else {
        categoryCount[product.category] = 1;
      }
      genderCount[product.gender]++;
    });

    if (categoryChart) {
      categoryChart.destroy();
    }

    // Render Category Chart
    const categoryChartCtx = document.getElementById('categoryChart').getContext('2d');
    const newCategoryChart = new Chart(categoryChartCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryCount),
        datasets: [
          {
            label: 'Category',
            data: Object.values(categoryCount),
            backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple'],
          },
        ],
      },
    });
    setCategoryChart(newCategoryChart);
  };

  return (
    <Flex >
      <div style={{width:"300px", marginRight:"100px"}}>
        <h2>Category Chart</h2>
        <canvas id="categoryChart" width="100" height="300"></canvas>
      </div>
      <div >
        <h2>Gender Chart</h2>
        <canvas id="genderChart" width="100" height="300"></canvas>
      </div>

      </Flex>
  );
};

export default Stats;
