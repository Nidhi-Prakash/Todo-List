import React, {useState} from 'react';
import "./task.scss";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { MdDelete, MdEditNote } from "react-icons/md";

const Task = ({id, title, deleteItem, editItem, setPendingTask}) => {

    const [checked, setChecked] = useState(false);
    const [linecut, setLinecut] = useState(false);

    const checkboxFun = () => {
        if (checked === false) {
            setChecked(true);
            setLinecut(true);
            setPendingTask((prevremainingTasks) => {
                return prevremainingTasks - 1;
            });
        } else {
            setChecked(false);
            setLinecut(false);
            setPendingTask((prevremainingTasks) => {
                return prevremainingTasks + 1;
            })
        }

    }

    return (
        <>
            <div className='taskbar'>
                <div className='taskbar-name'>
                    {
                        checked ? <ImCheckboxChecked className='checkbox' onClick={checkboxFun} /> :
                        <ImCheckboxUnchecked className='checkbox' onClick={checkboxFun} />
                    }
                    <h4 style={{ textDecoration: linecut ? "line-through" : null }}>{title}</h4>
                </div>

                <div className='icons'>
                    <MdEditNote className='edit-icon' onClick={editItem} />
                    <MdDelete className='delete-icon' onClick={deleteItem} />
                </div>
            </div>
        </>


    );
};

export default Task;