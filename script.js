// Loader: hide when page loads
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// -------------------------
// Chart Data
// -------------------------
const allData = [
    { label: 'A', value: 549, type: 'Refurbishment', status: 'Complete' },
    { label: 'B', value: 875, type: 'New', status: 'Complete' },
    { label: 'C', value: 617, type: 'New', status: 'Estimate' },
    { label: 'D', value: 506, type: 'Refurbishment', status: 'Complete' },
    { label: 'E', value: 881, type: 'New', status: 'Complete' },
    { label: 'F', value: 550, type: 'Refurbishment', status: 'Estimate' },
    { label: 'G', value: 539, type: 'Refurbishment', status: 'Complete' },
    { label: 'H', value: 607, type: 'New', status: 'Complete' }
];

// -------------------------
// Chart Setup
// -------------------------
const ctx = document.getElementById('barChart').getContext('2d');

const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Embodied Carbon (kgCO₂e/m²)',
                data: [],
                backgroundColor: '#733c3c'
            },
            {
                label: 'Target 2030 (500)',
                data: [],
                type: 'line',
                borderColor: 'gray',
                borderDash: [5, 5],
                fill: false
            },
            {
                label: 'Target 2025 (600)',
                data: [],
                type: 'line',
                borderColor: '#000',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'kgCO₂e/m²'
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        }
    }
});

// -------------------------
// Chart Updater
// -------------------------
function updateChart(filterType = "All", filterStatus = "All") {
    const filtered = allData.filter(item => {
        const typeMatch = (filterType === "All") || (item.type === filterType);
        const statusMatch = (filterStatus === "All") || (item.status === filterStatus);
        return typeMatch && statusMatch;
    });

    const labels = filtered.map(d => d.label);
    const values = filtered.map(d => d.value);

    barChart.data.labels = labels;
    barChart.data.datasets[0].data = values;
    barChart.data.datasets[1].data = Array(values.length).fill(500);
    barChart.data.datasets[2].data = Array(values.length).fill(600);
    barChart.update();
}

updateChart(); // Initial call to render chart

// -------------------------
// Filter Buttons
// -------------------------
let currentType = "All";
let currentStatus = "All";

document.querySelectorAll('.filter-type').forEach(btn => {
    btn.addEventListener('click', () => {
        currentType = btn.dataset.type;
        updateChart(currentType, currentStatus);
    });
});

document.querySelectorAll('.filter-status').forEach(btn => {
    btn.addEventListener('click', () => {
        currentStatus = btn.dataset.status;
        updateChart(currentType, currentStatus);
    });
});

// -------------------------
// Dark Mode Toggle
// -------------------------
const toggleBtn = document.getElementById('modeToggle');
const userPref = localStorage.getItem('darkMode');

if (userPref === 'true') {
    document.body.classList.add('dark-mode');
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.querySelector('.chart');
    chartContainer.innerHTML = '';

    const ctx = document.createElement('canvas');
    chartContainer.appendChild(ctx);

    const data = [549, 278, 875, 617, 506, 36, 185, 191, 122, 550, 881, 539, 269, 29, 82, 44, 109, 106, 607, 528];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: data,
                backgroundColor: '#8b5d5d',
                barThickness: 30,
                borderRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 500,
                            yMax: 500,
                            borderColor: '#8b5d5d',
                            borderWidth: 1,
                            borderDash: [5, 5],
                        },
                        line2: {
                            type: 'line',
                            yMin: 600,
                            yMax: 600,
                            borderColor: '#8b5d5d',
                            borderWidth: 1,
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1200,
                    grid: {
                        color: '#e5e5e5',
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 200,
                        color: '#666666',
                        font: {
                            size: 12
                        }
                    },
                    border: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                }
            }
        }
    });
});
