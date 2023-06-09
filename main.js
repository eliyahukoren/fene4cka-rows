class Rowser {
    FORWARD = 1;
    BACKWARD = -1
    LAST_MAX = 'lastMax';
    LAST_CURRENT = 'lastCurrent';
    DEFAULT_MAX = 0;
    DEFAULT_CURRENT = 0;
    MAX_ROWS_ON_PAGE = 12;

    constructor(
        rootDivElement,
        maxRowsInput,
        currentRowInput
    ){
        let lastMax = parseInt(localStorage.getItem(this.LAST_MAX)) || this.DEFAULT_MAX;
        let lastCurrent = parseInt(localStorage.getItem(this.LAST_CURRENT)) || this.DEFAULT_MAX;

        this.rootDivElement = rootDivElement;
        this.maxRowsInput = maxRowsInput;
        this.currentRowInput = currentRowInput; 

        this.maxRows = lastMax;
        this.currentRow = lastCurrent;

        return this;
    }

    get currentRow(){
        return parseInt(this.currentRowInput.value);
    }

    set currentRow(value){
        this.currentRowInput.value = value;
    }

    get maxRows(){
        return parseInt(this.maxRowsInput.value);
    }

    set maxRows(value){
        this.maxRowsInput.value = value;
    }

    nextRow(direction = this.FORWARD){
        let row = 0;
        let current = this.currentRow;
        let max = this.maxRows;

        if (direction === this.FORWARD) {
            row = current + 1 > max ? 1 : ++current;
        } else {
            row = current - 1 === 0 ? max : --current;
        }

        return row;
    }

    numRowDiv = (num) => {
        let div = document.createElement('div');

        div.id = `num_${num}`;
        div.innerHTML = `${num}`;
        div.className = 'num';
        
        return div;
    }    

    rowDiv = (index) => {
        let div = document.createElement('div');    
        
        div.id = `row_${index}`;
        div.className = 'row';
    
        return div;    
    }    

    move(direction = this.FORWARD){
        let current = this.nextRow(direction);
        this.currentRow = current;

        localStorage.setItem(this.LAST_CURRENT, current);

        this.show();
    }

    build(){
        const rows = document.querySelectorAll('.row');

        for(let div of rows){
            let divId = parseInt(div.getAttribute('id').replace('row_', ''));

            div.classList.remove('row-active');
            div.classList.remove('row-any');
            div.classList.remove('row-done');

            div.children[0].classList.remove('num-active');

            if( divId < this.currentRow){
                div.classList.add('row-done');
            }else if (divId === this.currentRow){
                div.classList.add('row-active');
                div.children[0].classList.add('num-active');
            }else{
                div.classList.add('row-any');
                
            } 
        }

        return this;
    }

    restart(){
        localStorage.setItem(this.LAST_MAX, this.maxRows);
        localStorage.setItem(this.LAST_CURRENT, 1);
        this.rootDivElement.innerHTML = '';
        this.show();

        return this;
    }

    calcPage(current, max){
        for(let i = 0; i<=100; i+=12){
            if(current >= 1 + i && current <= 12 + i){
                return { start: i + 1, end: Math.min(12 + i, max)};
            }
        }
    }

    show(){
        let lastMax = parseInt(localStorage.getItem(this.LAST_MAX)) || this.DEFAULT_MAX
        let lastCurrent = parseInt(localStorage.getItem(this.LAST_CURRENT)) || this.DEFAULT_CURRENT;
        
        if (lastMax <= 0) return this;

        const {start, end} = this.calcPage(lastCurrent, lastMax);

        this.rootDivElement.innerHTML = '';

        for (let i = start; i <= end; i++) {
            let rowDiv = this.rowDiv(i, i === lastCurrent);
            let numDiv = this.numRowDiv(i);

            rowDiv.appendChild(numDiv);
            this.rootDivElement.appendChild(rowDiv);
        }

        this.currentRow = lastCurrent;
        this.build();

        return this;
    }
}

const rowser = new Rowser(
    document.getElementById('rowsContainer'),
    document.getElementById('maxRows'),
    document.getElementById('currentRow')
).show();

document.addEventListener('keypress', (event) => {
    if( event.code === 'Space' || event.code === 'Enter'){
        rowser.move();
    }
});

document.getElementById('next').onclick = () => {
    rowser.move();
}

document.getElementById('previous').onclick = () => {
    rowser.move(rowser.BACKWARD);
};

document.getElementById('reset').onclick = () => {
    rowser.restart();
};


