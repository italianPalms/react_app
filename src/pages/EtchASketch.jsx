import { LoggedInHeader } from "../components/LoggedInHeader";
import React, { useEffect, useState } from 'react';


function EtchASketch() {

    const [size, setSize] = useState(20);
    console.log(size);
    const [pink, setPink] = useState(false);
    const [rainbow, setRainbow] = useState(false);


    useEffect(() => {
        createGrid();
    }, [size]);

    const createGrid = () => {
        // clearGrid(); 
        makeRowsAndColumns();
        applyHoverPink();
    };

    //functionality to clear grid
    const clearGrid = () => {
        const cells = document.getElementsByClassName('cell');
        for(let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'white';
        }
        console.log('clear grid clicked');
    }
    
    const makeRowsAndColumns = () => {
        clearGrid();

        const container = document.getElementById('container');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const cellWidth = containerWidth / size;
        const cellHeight = containerHeight / size;

        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.style.width = `${cellWidth}px`;
                cell.style.height = `${cellHeight}px`;
                container.appendChild(cell);
            }
        }
    };


    const applyHoverPink = () => {
        const cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('mouseover', (event) => {
                event.target.style.backgroundColor = 'pink';
            })
        }
    }
    //add logic for rainbow color
  
    const applyHoverColor = () => {
        const cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('mouseover', (event) => {
                    const randomColor = getRandomColor();
                    event.target.style.backgroundColor = randomColor;
            })
        }
    };

    //add random color to the rainbow functionality
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    //add logic to handle size change with prompt and alert

    const handlePinkColor = () => {
        console.log('Pink color button clicked');
        setRainbow(false);
        setPink(true);
        applyHoverPink();
    };
    //add handler for rainbow color
    const handleRainbowColor = () => {
        console.log('Rainbow color button clicked');
        setRainbow(true);
        setPink(false);
        applyHoverColor();
    }
    

    return (
        <>
        <div className="flex">
            <LoggedInHeader />
        </div>

        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-medium pb-4 mt-10">Etch-a-sketch</h1>
                <div className="main">
                    <div className="btns p-2 font-medium flex justify-center">
                        
                        <button className="grid-size p-2"
                        onClick={createGrid}
                        >Create Grid</button>

                        <button className="clear-grid p-2"
                        onClick={clearGrid}
                        >Clear Grid</button>

                        <button className="pink p-2"
                        onClick={handlePinkColor}
                        >Pink Color</button>

                        <button className="rainbow p-2"
                        onClick={handleRainbowColor}
                        >Rainbow Color</button>
                    </div>
                    <div id="container" className="mt-6"></div>
                </div>
        </div>
        </>
    )}

    export default EtchASketch;