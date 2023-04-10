const FORWARD = 1;
const BACKWARD = -1

const calcRow = (currentRow, maxRows, direction = FORWARD) => {
    if(direction === FORWARD){
        return currentRow + 1 > maxRows ? 1 : ++currentRow;
    }else{
        return currentRow - 1 === 0 ? maxRows : --currentRow;
    }
};

const rowsContainer = document.getElementById('rowsContainer');

const showCurrent = (value) => {
    document.getElementById('currentRow').value = value;
}

const maxRows = () => {
    return parseInt(document.getElementById('maxRows').value);
}

const getCurrentRow = () => {
    return parseInt(document.getElementById('currentRow').value);
}

const getNumRowDiv = (num, active = false) => {
    let div = document.createElement('div');
    let classNames = ['num'];
    
    if( active )
    classNames.push('num-active');
    
    div.id = `num_${num}`;
    div.innerHTML = `${num}`;
    div.className = classNames.join(' ');
    
    return div;
}

const getRowDiv = (index, active = false, done = false) => {
    let div = document.createElement('div');    
    let classNames = ['row'];
    
    if (active) {
        classNames.push('row-active');
    }
    
    if( done){
        classNames.push('row-done');
    }
    
    if( !active && !done){
        classNames.push('row-any');
    }
    
    div.id = `row_${index}`;
    div.className = classNames.join(' ');
    
    return div;
    
}

const createRows = (maxRows) => {
    for(let i = 1; i <= maxRows; i++){
        let rowDiv = getRowDiv(i, i === 1);
        let numDiv = getNumRowDiv(i);
        
        rowDiv.appendChild(numDiv);
        rowsContainer.appendChild(rowDiv);
    }

    showCurrent(1);
}

const changeShow = (current) => {
    const rows = document.querySelectorAll('.row');

    for(let div of rows){
        let divId = parseInt(div.getAttribute('id').replace('row_', ''));

        div.classList.remove('row-active');
        div.classList.remove('row-any');
        div.classList.remove('row-done');

        div.children[0].classList.remove('num-active');

        if( divId < current){
            div.classList.add('row-done');
        }else if (divId === current){
            div.classList.add('row-active');
            div.children[0].classList.add('num-active');
        }else{
            div.classList.add('row-any');
            
        } 
    }
}

const movePointer = (direction = FORWARD) => {
    let current = getCurrentRow();
    current = calcRow(current, maxRows(), direction);
    showCurrent(current);
    changeShow(current);
}

document.addEventListener('keypress', (event) => {
    if( event.code === 'Space' || event.code === 'Enter'){
        movePointer(FORWARD);
    }
});

document.getElementById('next').onclick = () => {
    movePointer(FORWARD);
}

document.getElementById('previous').onclick = () => {
    movePointer(BACKWARD)
};

document.getElementById('reset').onclick = () => {
    rowsContainer.innerHTML = '';
    createRows(maxRows());
};

if( maxRows() > 0)
    createRows(maxRows());

