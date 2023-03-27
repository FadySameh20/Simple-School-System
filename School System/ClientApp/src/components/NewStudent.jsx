import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { validateLetters } from '../validation';
import '../css/NewStudent.css'
import Card from './Card';

const NewStudent = ({ addStudents, isOnline}) => {

    const [navigate, setNavigate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnDisabled, setBtnDisabled] = useState(false);
    const [inputFields, setInputFields] = useState([
        { fullName: '', grade: '', dateOfBirth: '', address: '', phone: '' }
    ]);
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        var date = new Date();
        var currentDate = date.getFullYear().toString();
        if ((date.getMonth() + 1).toString().length === 1) {
            currentDate += "-0" + (date.getMonth() + 1).toString();
        } else {
            currentDate += "-" + (date.getMonth() + 1).toString();
        }
        if (date.getDate().toString().length === 1) {
            currentDate += "-0" + date.getDate().toString();
        } else {
            currentDate += "-" + date.getDate().toString();
        }
        setMaxDate(currentDate);
    }, []);

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        if (inputFields.length === 0) {
            setBtnDisabled(false);
        }
        let newfield = { fullName: '', grade: '', dateOfBirth: '', address: '', phone: '' }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
        if (data.length === 0) {
            setBtnDisabled(true);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        if (validateLetters()) {
            setIsLoading(true);
            await fetch("student", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputFields)
            }).then(() => {
                addStudents(inputFields);
                setInputFields([
                    { fullName: '', grade: '', dateOfBirth: '', address: '', phone: '' }
                ]);
                setIsLoading(false);
                setNavigate(true);
                console.log("Added new student successfully");
            }).catch(err => {
                console.log("Error:", err.message);
            });
        }
    }

    return (
        <div>
            {!isOnline && <div className="emptyData">You are offline !<br /><br />Please connect to the internet to be able to add new students.</div>}
            {isOnline && isLoading && <LoadingSpinner />}
            {isOnline && !isLoading && navigate && <Navigate to="/" />}
            {isOnline && !isLoading &&
                <form name="add-student-form" onSubmit={submit}>
                    <div className="scrollable">
                        {inputFields.map((input, index) => {
                            return (
                                <div key={index} className="card">
                                    <Card input={input} index={index} handleFormChange={handleFormChange} removeFields={removeFields} maxDate={maxDate} />
                                </div>
                            )
                        })}
                    </div>
                    <center>
                        <button className="btn" type="button" onClick={addFields}>Add More..</button>
                        <button className="btn" type="submit" disabled={isBtnDisabled}>Submit</button>
                    </center>
                </form>
            }
        </div>
    );
}

export default NewStudent;