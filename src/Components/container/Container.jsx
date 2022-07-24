import React, { useState } from 'react';
import "./container.scss";
import Task from './task/Task';
import Footer from './footer/Footer';
import { RiAddBoxFill } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";


const Container = () => {

    const [task, setTask] = useState([]);
    const [inputVal, setInputVal] = useState();
    const [pendingTask, setPendingTask] = useState(0);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const inputfunc = (e) => {
        const value = e.target.value;
        setInputVal(value);
    };

    const addClickFun = () => {
        // console.log("added");

        if (!inputVal) {
            alert('Input field can not be empty');
        } else if (inputVal && !toggleSubmit) {
            setTask(
                task.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputVal }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);

            setInputVal("");

            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputVal, isDone: false }
            setTask((prevItems) => {
                return [...prevItems, allInputData];
            });
            setInputVal("");
            setPendingTask(pendingTask + 1);
        }
    };

    const deleteItem = (index) => {
        // console.log("deleted");

        setTask((prevItems) => {
            return prevItems.filter((arrElem) => {
                return index !== arrElem.id;
            });
        });
        setPendingTask((prevremainingTasks) => {
            return prevremainingTasks - 1;
        })
    };

    const editItem = (id) => {
        // console.log("edited");

        let newEditItem = task.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputVal(newEditItem.name);

        setIsEditItem(id);

    };

    const clearall = () => {
        setTask([]);
        setPendingTask(0);
    };

    return (
        <>
            <div className='main-container'>
                <div className='container'>
                    <div className='title'>
                        <h1 className='title'>What you're gonna do today?</h1>
                    </div>

                    <div className='add-here'>
                        <input type="text"
                            value={inputVal}
                            className='main-input'
                            name='task'
                            placeholder=' Add your task here'
                            onChange={inputfunc} />
                        {
                            toggleSubmit ? <RiAddBoxFill className='add-icon' onClick={addClickFun} /> :
                                <MdEditNote className='editing-icon' onClick={addClickFun} />
                        }
                    </div>
                </div>


                <ol className='itmes-list'>
                    {
                        task.map((item) => {
                            return (
                                <Task title={item.name}
                                    key={item.id}
                                    setPendingTask={setPendingTask}
                                    deleteItem={() => { deleteItem(item.id) }}
                                    editItem={() => { editItem(item.id) }} />
                            )
                        })
                    }
                </ol>


                <Footer remainingtask={pendingTask} clearall={clearall} />

            </div>
        </>
    );
};

export default Container;