class Rowser {
    FORWARD = 1;
    BACKWARD = -1

    constructor(
        rootDivElement,
        maxRowsInput,
        currentRowInput
    ){
        this.rootDivElement = rootDivElement;
        this.maxRowsInput = maxRowsInput;
        this.currentRowInput = currentRowInput; 

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
        if (direction === this.FORWARD) {
            row = this.currentRow + 1 > this.maxRows ? 1 : ++this.currentRow;
        } else {
            row = this.currentRow - 1 === 0 ? this.maxRows : --this.currentRow;
        }

        return row;
    }

    numRowDiv = (num, active = false) => {
        let div = document.createElement('div');
        let classNames = ['num'];
        
        if( active )
        classNames.push('num-active');
        
        div.id = `num_${num}`;
        div.innerHTML = `${num}`;
        div.className = classNames.join(' ');
        
        return div;
    }    

    rowDiv = (index, active = false, done = false) => {
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

    move(direction = this.FORWARD){
        let current = this.nextRow(direction);
        this.currentRow = current;
        this.show();
    }

    show(){
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
        this.rootDivElement.innerHTML = '';
        this.start();

        return this;
    }

    start(){
        if( this.maxRows <= 0 )
            return this;

        for (let i = 1; i <= this.maxRows; i++) {
            let rowDiv = this.rowDiv(i, i === 1);
            let numDiv = this.numRowDiv(i);

            rowDiv.appendChild(numDiv);
            this.rootDivElement.appendChild(rowDiv);
        }

        this.currentRow = 1;

        return this;
    }
}

const rowser = new Rowser(
    document.getElementById('rowsContainer'),
    document.getElementById('maxRows'),
    document.getElementById('currentRow')
).start();

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