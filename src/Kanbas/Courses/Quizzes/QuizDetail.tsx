import {useNavigate} from "react-router-dom";
import * as client from "../client";
import {useParams} from "react-router";
import {useEffect, useState} from "react";

export default function QuizDetail() {
  const [quiz, setQuiz] = useState<any>()

  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    getQuiz()
  }, [])

  const getQuiz = async () => {
    if (id) {
      const quiz = await client.getQuizById(id)
      setQuiz(quiz)
    }
  }

  return (
    <div className="d-flex flex-column" id="wd-home">
      <div className="flex-grow-1 d-flex align-content-center justify-content-center gap-4 py-3 border-bottom mb-4">
        <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded" style={{width: "fit-content"}}>
          <span>Preview</span>
        </div>
        <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded gap-2" style={{width: "fit-content"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen"
               viewBox="0 0 16 16">
            <path
              d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
          </svg>
          <span>Edit</span>
        </div>
      </div>

      {
        quiz && (
          <div>
            <h1>{quiz.name}</h1>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Quiz Type
              </div>
              <div className="col-9">
                {quiz.quizType}
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Points
              </div>
              <div className="col-9">
                29
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Assignment Group
              </div>
              <div className="col-9">
                {quiz.assignmentGroup}
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Shuffle Answers
              </div>
              <div className="col-9">
                {quiz.shuffleAnswers ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Time Limit
              </div>
              <div className="col-9">
                {quiz.timeLimitMinutes} Minutes
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Multiple Attempts
              </div>
              <div className="col-9">
                {quiz.allowMultipleAttempts ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                View Response
              </div>
              <div className="col-9">
                {quiz.viewResponse ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Show Correct Answers
              </div>
              <div className="col-9">
                Immediately
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                One Question at a Time
              </div>
              <div className="col-9">
                Yes
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Require Respondus LockDown
              </div>
              <div className="col-9">
                No
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Browser
              </div>
              <div className="col-9">

              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Required to View Quiz Results
              </div>
              <div className="col-9">
                No
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Webcam Required
              </div>
              <div className="col-9">
                No
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Lock Questions After Answering
              </div>
              <div className="col-9">
                No
              </div>
            </div>

            <table className="table">
              <thead>
              <tr>
                <th scope="col">Due</th>
                <th scope="col">For</th>
                <th scope="col">Available from</th>
                <th scope="col">Until</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Step 21 at 1pm</td>
                <td>Everyone</td>
                <td>Step 21 at 11:40am</td>
                <td>Step 21 at 1pm</td>
              </tr>
              </tbody>
            </table>
          </div>
        )
      }
    </div>

  );
}
