import '../css/Card.css'

const Card = ({ input, index, handleFormChange, removeFields, maxDate}) => {
    let grades = [];

    for (let i = 1; i <= 12; i++) {
        grades.push({ value: i, label: i });
    }

    return (
        <div>
            <center>
                <div className="title">
                    Student #{index + 1}
                </div>
            </center>
            <div className="row">
                <div className="student-input">
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        name='fullName'
                        placeholder='Full Name'
                        value={input.fullName}
                        onChange={event => handleFormChange(index, event)}
                        required
                    />
                    <label htmlFor='grade'>Grade</label>
                    <select
                        name='grade'
                        value={input.grade}
                        onChange={event => handleFormChange(index, event)}
                        required
                    >
                        <option key={0} value="" disabled>grade</option>
                        {grades.map(({ value, label }) => <option key={value} value={value} >{label}</option>)}
                    </select>
                    <label htmlFor='dateOfBirth'>Date of Birth</label>
                    <input
                        name='dateOfBirth'
                        type='date'
                        value={input.dateOfBirth}
                        onChange={event => handleFormChange(index, event)}
                        max={maxDate}
                        required
                    />
                    <label htmlFor='address'>Address</label>
                    <input
                        name='address'
                        type="text"
                        placeholder='Address'
                        value={input.address}
                        onChange={event => handleFormChange(index, event)}
                        required
                    />
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='tel'
                        pattern='^01[0125][0-9]{8}$'
                        name='phone'
                        placeholder='Phone'
                        value={input.phone}
                        onChange={event => handleFormChange(index, event)}
                        title="Should be a valid egyptian number --> 11 digits starting with 010 / 011 / 012 / 015"
                        required
                    />
                </div>
                <button className="btn remove-btn" type="button" onClick={() => removeFields(index)}>Remove</button>
            </div>
        </div>
    );
}

export default Card;