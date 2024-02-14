import React, { useState, useEffect } from 'react';
import '../App.css'

const CreateList = ({ selectedLists, setLineData, setCreate, count, countDecreae,setSelectedListsData, setSelectedLists  }) => {
    const [data, setData] = useState({ ...selectedLists, [count]: [] });
    const [error, setError] = useState("");

    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);

    useEffect(() => {
        findMaxValueKey(selectedLists);
        findMinValueKey(selectedLists);
        console.log(data, min, max)
    }, [selectedLists]);

    const findMaxValueKey = (obj) => {
        let maxValue = -9999;
        console.log(  console.log(maxValue))
        for (let key in obj) {
            console.log(maxValue)
            const value = key;
            if (value > maxValue) {
                maxValue = value;
            }
        }
        console.log(maxValue)
        setMax(maxValue);
    };
    
    const findMinValueKey = (obj) => {
        let minValue = 9999;
    
        for (let key in obj) {
            // const value = parseInt(key);
            const value = key;
            if (value < minValue) {
                minValue = value;
            }
        }
    console.log(minValue)
        setMin(minValue);
    };

    const handleCancleButtonClick = () => {
        countDecreae();
        setCreate(false);
    };

    const handleUpdateButtonClick = () => {
        setLineData((prevData) => ({ ...prevData, ...data }));
        setSelectedListsData({}) 
        setSelectedLists([])
        setCreate(false);
    };


    const handleDataChange = (id, listNumber, changeNumber) => {
        setData(prevData => {
            const selectedItem = prevData[listNumber].find(item => item.id === id);
            const updatedCurrentList = prevData[listNumber].filter(item => item.id !== id);
            selectedItem.list_number = changeNumber;

            const updatedNewList = [...prevData[changeNumber], selectedItem];
            return {
                ...prevData,
                [listNumber]: updatedCurrentList,
                [changeNumber]: updatedNewList
            };
        });
    };



    return (
        <div style={{fontSize:"14px"}}>
            {(min !== 0 && max !== 0) ? (<>
                <div style={{ color: 'red' }}>{error}</div>
                <div className='row' style={{ display: 'flex', marginLeft: '10px', marginTop: '10px', padding: '10px', width: '100%' }}>
                    <div key={min} className='ListContainer' style={{position:"relative", width: '15rem', height: "80vh", backgroundColor: 'skyblue', overflowY: 'scroll', margin:"0 1rem" }}>
                        <div className='listInput'>
                            <label>
                                List {min} ({data[min] ? data[min].length : 0})
                            </label>
                        </div>
                        {data[min] && data[min].map((item, index) => (
                            <div key={index} className='listDetails-card' style={{ backgroundColor: "#fff", border: "none", borderRadius: "10px", padding: '10px', margin: '10px',paddingBottom:'30px' }}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <button onClick={() => handleDataChange(item.id, min, count)} style={{position:"absolute",left:"78%"}}>&#8594;</button>
                            </div>
                        ))}
                    </div>
                    <div key={count } className='ListContainer' style={{ width: '15rem', height: "80vh", backgroundColor: 'skyblue', overflowY: 'scroll', margin:"0 1rem" }}>
                        <div className='listInput'>
                            <label>
                                List {count } ({data[count] ? data[count].length : 0})
                            </label>
                        </div>
                        {data[count] && data[count].map((item, index) => (
                            <div key={index} className='listDetails-card' style={{ backgroundColor: "#fff", border: "none", borderRadius: "10px", padding: '10px', margin: '10px' }}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                <button onClick={() => handleDataChange(item.id, count, min)}>&#8592;</button>
                                <button onClick={() => handleDataChange(item.id, count, max)}>&#8594;</button>
                                    </div>
                            </div>
                        ))}
                    </div>
                    <div key={max} className='ListContainer' style={{ width: '15rem', height: "80vh", backgroundColor: 'skyblue', overflowY: 'scroll', margin:"0 1rem" }}>
                        <div className='listInput'>
                            <label>
                                List {max} ({data[max] ? data[max].length : 0})
                            </label>
                        </div>
                        {data[max] && data[max].map((item, index) => (
                            <div key={index} className='listDetails-card' style={{ backgroundColor: "#fff", border: "none", borderRadius: "10px", padding: '10px', margin: '10px' }}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <button onClick={() => handleDataChange(item.id, max, count)}>&#8592;</button>

                            </div>
                        ))}
                    </div>
                </div>
                <div className='new-list2'>
                    <button style={{background:"#3B71CA",padding:".5rem",color:"white",border:"none",borderRadius:"3px", margin:"0 .5rem", fontSize:"1rem"}} onClick={handleUpdateButtonClick}>Update</button>
                    <button style={{padding:".5rem",borderRadius:"3px", margin:"0 .5rem", fontSize:"1rem"}} onClick={handleCancleButtonClick}>Cancel</button>
                </div>
                </>) : null}

        </div>
    );
};

export default CreateList;