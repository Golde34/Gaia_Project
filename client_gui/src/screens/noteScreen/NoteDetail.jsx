import { useDispatch } from "react-redux"
import Template from "../../components/template/Template"
import { useParams } from "react-router-dom";

function ContentArea() {
    const dispatch = useDispatch();

    const noteId = useParams().noteId;

    // const getNote = useCallback(() => {
    //     dispatch(getNoteDetail(noteId));
    // }, [dispatch, noteId]);

    // useEffect(() => {
    //     if (didNoteRef.current) return;
    //     getNote();
    //     didNoteRef.current = true;
    // });

    return (
        <div>
            <p>Content Area</p>
        </div>
    )
}

const NoteDetail = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default NoteDetail;