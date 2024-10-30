import { useDispatch, useSelector } from "react-redux"
import Template from "../../components/template/Template"
import { useParams } from "react-router-dom";
import { getNoteById } from "../../api/store/actions/task_manager/note.actions";
import { useCallback, useEffect, useRef } from "react";
import { Button, Card, Flex, Metric, Text, Title } from "@tremor/react";
import MessageBox from "../../components/subComponents/MessageBox";
import ReactQuill from 'react-quill';

function ContentArea() {
    const dispatch = useDispatch();

    const noteId = useParams().id;
    const noteDetail = useSelector((state) => state.noteDetail);
    const { loading, error, note } = noteDetail;

    const getNote = useCallback(() => {
        dispatch(getNoteById(noteId));
    }, [dispatch, noteId]);

    const debouceRef = useRef(null);

    useEffect(() => {
        clearTimeout(debouceRef.current);
        debouceRef.current = setTimeout(() => {
            getNote();
        }, 200);
    }, [noteId]);

    return (
        <div>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <MessageBox message={error} />
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800">Note Detail
                    </Metric>
                    <Card
                        className={`transition-all duration-300 ease-in-out border-2 border-blue-500 "h-72 p-6"
                  flex flex-col justify-center items-center text-center cursor-pointer`}
                    >
                        <Title className="text-lg font-bold mb-2">{note.name}</Title>
                        {/* <div className="w-full mt-4">
                            <ReactQuill
                                value={atob(note.fileContent)}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                className="bg-gray-100 p-4 rounded-lg h-auto"
                            />
                        </div> */}
                        <div className="w-full mt-4">
                            <ReactQuill
                                value={note.decodedFileContent}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                className="bg-gray-100 p-4 rounded-lg h-auto"
                            />
                        </div>
                        <Flex className="mt-4" justifyContent="end">
                            <Button className="mr-2">Edit</Button>
                            <Button>Save</Button>
                        </Flex>
                    </Card>
                    <a href="/client-gui/note-dashboard" className="flex justify-end">
                        <Button className="mt-5">Back</Button>
                    </a>
                </>
            )
            }
        </div>
    )
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'], // remove formatting button
    ]
};

// Supported formats for Quill editor
const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image'
];

const NoteDetail = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default NoteDetail;