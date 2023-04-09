document.addEventListener('keypress', (event) => {
    if( event.code === 'Space' || event.code === 'Enter'){
        console.log(`Will go to the next line`);
    }
});

const rows = document.getElementById('rowsContainer');
const rowNum = document.createElement('div');
rowNum.className = 'num';
rowNum.innerHTML = 6;

const sDiv = document.createElement('div');
sDiv.className = 'row row-any';
sDiv.appendChild(rowNum);
rows.appendChild(sDiv);