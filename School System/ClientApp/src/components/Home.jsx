import LoadingSpinner from './LoadingSpinner';
import '../css/Home.css'

const Home = ({ students, isOnline }) => {
    return (
        <div>
            {!isOnline && <div className="emptyData">You are offline !<br/><br/>Please connect to the internet to be able to display students.</div>}
            {isOnline && !students && <LoadingSpinner />}
            {isOnline && students && students.length === 0 && <div className="emptyData">No students are regustered yet!</div>}
            {
                isOnline &&
                students &&
                students.length > 0 &&
                <center>
                        <table className="table-students">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Full Name</th>
                                <th>Grade</th>
                                <th>Date of Birth</th>
                                <th>Address</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((student, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{ index+1 }</td>
                                            <td>{student.fullName}</td>
                                            <td>{student.grade}</td>
                                            <td>{student.dateOfBirth}</td>
                                            <td>{student.address}</td>
                                            <td>{student.phone}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </center>
            }
        </div>
    );
}

export default Home;
