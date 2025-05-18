 //import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import KeyValueTile from "../components/Tiles/KeyValueTile";
import LineChart from "../components/Charts/LineChart";

// Константы с данными для дашборда
const DASHBOARD_DATA = {
  title: "Дашборд добычи нефти",
  tiles: [
    {
      id: 1,
      title: "Слои",
      values: [{ label: "Всего слоев", value: 3 }]
    },
    {
      id: 2,
      title: "Скважины",
      values: [
        { label: "Добывающие", value: 3 },
        { label: "Нагнетательные", value: 4 }
      ]
    },
    {
      id: 3,
      title: "ГТМ",
      values: [
        { label: "Выполнено", value: 10 },
        { label: "Запланировано", value: 42 }
      ]
    },
    {
      id: 4,
      title: "Добыча",
      values: [
        { label: "Накопленная", value: 100 },
        { label: "За месяц", value: 10 }
      ]
    }
  ],
  productionChart: {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    datasets: [
      {
        label: "Добыча нефти (тыс.т)",
        data: [12.5, 11.8, 12.2, 11.5, 11.0, 10.8, 10.5, 10.2, 10.0, 9.8, 9.5, 9.3],
        borderColor: "#1976d2",
        yAxisID: 'y',
      },
      {
        label: "Добыча жидкости (тыс.т)",
        data: [25.1, 24.3, 24.8, 23.9, 23.5, 23.2, 22.8, 22.5, 22.1, 21.8, 21.5, 21.2],
        borderColor: "#4caf50",
        yAxisID: 'y',
      },
      {
        label: "Обводненность (%)",
        data: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
        borderColor: "#ff9800",
        yAxisID: 'y1',
      }
    ]
  },
  economicChart: {
    labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    datasets: [
      {
        label: "CAPEX",
        data: [1200, 800, 600, 400, 300, 200, 100, 100, 100, 100, 100, 100],
        borderColor: "#1976d2",
      },
      {
        label: "OPEX",
        data: [300, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220],
        borderColor: "#4caf50",
      },
      {
        label: "Tax",
        data: [50, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10],
        borderColor: "#ff9800",
      },
      {
        label: "Cash Flow",
        data: [500, 600, 550, 580, 620, 650, 700, 720, 750, 770, 800, 850],
        borderColor: "#9c27b0",
      }
    ]
  }
};

const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Заголовок страницы */}
      <Typography variant="h4" gutterBottom>
        {DASHBOARD_DATA.title}
      </Typography>

      {/* Контейнер для плиток */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 2,
          mb: 4,
        }}
      >
        {DASHBOARD_DATA.tiles.map((tile) => (
          <KeyValueTile
            key={tile.id}
            title={tile.title}
            value={
              <Box>
                {tile.values.map((item, index) => (
                  <Typography key={index}>
                    {item.label}: <strong>{item.value}</strong>
                  </Typography>
                ))}
              </Box>
            }
            sx={{
              minHeight: 100,
              maxHeight: 120,
              bgcolor: 'White',
              p: 2,
            }}
          />
        ))}
      </Box>


      {/* График добычи */}
      <Paper sx={{ p: 3, mb: 4, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Динамика добычи (2025 год)
        </Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <LineChart 
            data={{
              ...DASHBOARD_DATA.productionChart,
              datasets: DASHBOARD_DATA.productionChart.datasets.map(dataset => ({
                ...dataset,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
              }))
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Добыча (тыс.т)'
                  },
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                    drawOnChartArea: false,
                  },
                  title: {
                    display: true,
                    text: 'Обводненность (%)'
                  },
                  min: 0,
                  max: 100,
                },
              },
            }}
          />
        </Box>
      </Paper>

      {/* График экономики */}
      <Paper sx={{ p: 3, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Динамика экономических показателей (2025 год)
        </Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <LineChart 
            data={{
              ...DASHBOARD_DATA.economicChart,
              datasets: DASHBOARD_DATA.economicChart.datasets.map(dataset => ({
                ...dataset,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
              }))
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Тысяч долларов ($k)'
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardPage;