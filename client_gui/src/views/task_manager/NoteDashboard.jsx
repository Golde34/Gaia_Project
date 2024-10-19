import { useDispatch, useSelector } from "react-redux";
import Template from "../../components/template/Template";
import { useCallback, useEffect, useRef } from "react";
import { isAccessTokenCookieValid } from "../../kernels/utils/cookie-utils";
import { useNavigate } from "react-router-dom";
import { getNoteList } from "../../api/store/actions/task_manager/note.actions";
import { Metric } from "@tremor/react";
import CardButton from "../../components/subComponents/CardButton";
import NoteItem from "../../components/subComponents/NoteItem";

function ContentArea() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const userId = localStorage.getItem('userInfo');
    const userId = "1";

    const isUserValid = isAccessTokenCookieValid();
    useEffect(() => {
        if (isUserValid) {
            navigate('/signin');
        }
    }, [isUserValid, navigate]);

    // const listNotes = useSelector(state => state.noteList);
    // const { loading, error, notes } = listNotes;

    // const getListNotes = useCallback(() => {
    //     dispatch(getNoteList(userId));
    // }, [dispatch, userId]);

    // const debounceRef = useRef(null);
    // useEffect(() => {
    //     clearTimeout(debounceRef.current);
    //     debounceRef.current = setTimeout(() => {
    //         getListNotes();
    //     }, 200);
    // }, [])

    const notes = [
        {
            id: 1,
            name: "Note 1"
        },
        {
            id: 2,
            name: "Note 2"
        },
        {
            id: 3,
            name: "Note 3"
        },
        {
            id: 4,
            name: "Note 4"
        },
        {
            id: 5,
            name: "Note 5"
        },
    ]

    return (
        <div>
            {/* {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : ( */}
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Note Dashboard
                    </Metric>
                    <div className="grid md:grid-cols-3 w-full h-full items-center">
                        {
                            notes.length === 0 || notes.length === undefined ? (
                                <p>No notes found</p>
                            ) : (
                                notes.map((note) => (
                                    <div key={note.id} className="m-3">
                                        <NoteItem name={note.name} 
                                            url={`/note/${note.id}`} buttonText="View note" elementId={note.id}
                                        />
                                    </div>
                                ))
                            )
                        }
                    </div>

                </>
            {/* )
            } */}
        </div>
    )
}

const NoteDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    );
}

export default NoteDashboard;