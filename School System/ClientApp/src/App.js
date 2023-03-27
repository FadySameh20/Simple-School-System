import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NewStudent from './components/NewStudent';
import { useEffect, useState } from 'react';
import NotFound from './components/NotFound';


const App = () => {
    const [students, setStudents] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);  // Update network status
        };

        window.addEventListener('online', handleStatusChange);  // Listen to the online status
        window.addEventListener('offline', handleStatusChange);  // Listen to the offline status

        if (navigator.onLine && !isDataFetched) {
            fetch('student').then(res => {
                if (!res.ok) {
                    console.log("fail");
                    return null;
                }
                return res.json();
            }).then(data => {
                setStudents(data);
                setIsDataFetched(true);
            }).catch(err => {
                console.log("Error: " + err.message);
            })
        }

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline, isDataFetched]);

    const addStudents = (newStudents) => {
        const newStudentsList = students.concat(newStudents);
        setStudents(newStudentsList);
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Navbar />}>
                <Route index element={<Home students={students} isOnline={isOnline} />} />
                <Route path="addStudent" element={<NewStudent addStudents={addStudents} isOnline={isOnline} />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App;
