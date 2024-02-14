import { React, useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import CreateList from './CreateList';

const ErrorPage = ({ onRetry }) => (
    <div className='error-page'>
        <img src="data:image/png;base64,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" alt="Error" />
      <p>Failed to fetch data. Please try again.</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );

const ListShow = () => {
    const [data, setdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ListData, setListData] = useState(null);
    const [count, setCount] = useState(2);
    const [selectedLists, setSelectedLists] = useState([]);
    const [selectedListsData, setSelectedListsData] = useState({});
    const [error, setError] = useState('');
    const [apiError,setApiError] = useState('')
    const [create, setCreate] = useState(false)
    const maxSelect = 2;

    const countDecreae=()=>{
        setCount((count)=>count-1)
    }


    const handleCreateButtonClick = () => {
        if (selectedLists.length >= 2) {
            // Perform create action
          setCount((count)=>count+1)
          setCreate(true)
          setError('')
        } else {
            setError('You must select at least two lists to create');
        }
    };
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            if (selectedLists.length < maxSelect) {
                setSelectedLists([...selectedLists, value]);
                setSelectedListsData(prevData => ({
                    ...prevData,
                    [value]: ListData[value]
                }));
            } else {
                event.target.checked = false;
                setError(`You can only select ${maxSelect} lists`);
            }
        } else {
            setSelectedLists(selectedLists.filter(list => list !== value));
            setSelectedListsData(prevData => {
                const newData = { ...prevData };
                delete newData[value];
                return newData;
            });
            setError('');
        }
    };
    
    const ListDataGet = (i) => {
        let b = {};
        i.forEach(element => {
            if (!b[element.list_number]) {
                b[element.list_number] = [];
            }
            b[element.list_number].push(element);
        });

        setListData(b);
        console.log(b)
    };

    const fetchData = async () => {
        try {
          const res = await axios.get('https://apis.ccbp.in/list-creation/lists');
          setdata(res.data);
          ListDataGet(res.data.lists);
          setLoading(false);
        } catch (error) {
          setApiError('Error fetching data');
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const handleRetry = () => {
        setLoading(true);
        setApiError('')
        fetchData(); 
      };
    



    return (

        <div>
            {loading ? (
            <h1>Loading...</h1>
           ): apiError ? (
            <ErrorPage onRetry={handleRetry} />
          )  :(
            <>
            {ListData != null && !create ?(<div className='new-list'>
                <h2>List Creation</h2>
                <button onClick={handleCreateButtonClick}>Create a new list</button>
                <p>{error}</p>
             </div>):null
                
            }
            
            <div className='row' style={{ display: 'flex', marginLeft: '10px', marginTop: '10px', padding: '10px', width: '100%' }} >

            {ListData != null && !create ? (
                    <>
                    {Object.entries(ListData).map(([listNumber, listItems]) => (
                        <div key={listNumber} className='ListContainer' style={{ width: '15rem', height: "100vh", backgroundColor: 'skyblue', overflowY: 'scroll',margin:"0 1rem" }}>
                            <div className='listInput'>
                                <label>
                                    <input
                                        type='checkbox'
                                        value={listNumber}
                                        onChange={handleCheckboxChange}
                                        checked={selectedLists.includes(listNumber)}
                                    />
                                    List {listNumber}
                                </label>
                            </div>
                            {listItems.map((item, index) => (
                                <div className='listDetails-card' style={{ backgroundColor: "#fff", border: "1px solid grey", borderRadius: "10px", padding: '10px', margin: '10px' }}>
                                    {/* Render list items for this list */}

                                    <div key={index}>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ))}
                    </>
                ) : null}
            </div>
            {create ? (<CreateList
                    selectedLists={selectedListsData}
                    setLineData={setListData}
                    setCreate={setCreate}
                    count={count}
                    countDecreae={countDecreae}
                    setSelectedListsData={setSelectedListsData}
                    setSelectedLists={setSelectedLists}
                />) : null}
            </>)}
        </div>

    )
}


export default ListShow;