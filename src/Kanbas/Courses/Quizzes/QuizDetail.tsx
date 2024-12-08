import {useNavigate} from "react-router-dom";
import * as client from "../client";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function formatDate(date: string | Date) {
  let newDate = new Date()
  if (!date) {
    newDate = new Date()
  }
  if (typeof date === 'string') {
    newDate = new Date(date)
  }
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[newDate.getMonth()];
  const day = newDate.getDate();
  let hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const isPM = hours >= 12;
  hours = hours % 12 || 12;

  return `${month} ${day} at ${hours}${minutes > 0 ? `:${minutes}` : ''} ${isPM ? 'pm' : 'am'}`;
}

export default function QuizDetail() {
  const [quiz, setQuiz] = useState<any>()
  const [grades, setGrades] = useState<any>([])

  const navigate = useNavigate()
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    getQuiz()
    getMyGrades()
  }, [qid])

  const getQuiz = async () => {
    if (qid) {
      const quiz = await client.getQuizById(qid)
      setQuiz(quiz)
    }
  }

  const getMyGrades = async () => {
    if (qid) {
      const grades = await client.getGradeForQuizAndUser(qid, currentUser._id)
      setGrades(grades)
    }
  }

  return (
    <div className="d-flex flex-column" id="wd-home">
      {
        currentUser.role === 'STUDENT' && (
          <>
            <h2>My Grades</h2>
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Grades</th>
              </tr>
              </thead>
              <tbody>
              {
                grades.map((item: any) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.startDate)}</td>
                    <td>{formatDate(item.endDate)}</td>
                    <td>{item.grade}</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </>
        )
      }
      <div className="flex-grow-1 d-flex align-content-center justify-content-center gap-4 py-3 border-bottom mb-4">
        {
          currentUser.role !== 'STUDENT' ? (
            <>
              <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded" style={{width: "fit-content"}} onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Preview/${qid}`)}>
                <span>Preview</span>
              </div>
              <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded gap-2 cursor-pointer" style={{width: "fit-content"}} onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/New/${qid}`)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen"
                     viewBox="0 0 16 16">
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                <span>Edit</span>
              </div>
            </>
          ) : (
            quiz && (quiz.allowMultipleAttempts || grades.length === 0) && (
              <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded" style={{width: "fit-content"}} onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Testing/${qid}`)}>
                <span>{grades.length > 0 ? 'Retry' : 'Start'} Testing</span>
              </div>
            )
          )
        }
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
                {quiz.showCorrectAnswers ? 'Immediately' : 'No' }
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                One Question at a Time
              </div>
              <div className="col-9">
                {quiz.oneQuestionAtATime ? 'Yes' : 'No' }
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Require Respondus LockDown
              </div>
              <div className="col-9">
                {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No' }
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
                {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No' }
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Webcam Required
              </div>
              <div className="col-9">
                {quiz.webcamRequired ? 'Yes' : 'No' }
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Lock Questions After Answering
              </div>
              <div className="col-9">
                {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No' }
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
                {
                  quiz.dates.map((item: any) => (
                    <tr key={item._id}>
                      <td>{formatDate(item.due)}</td>
                      <td>Everyone</td>
                      <td>{formatDate(item.availableFrom)}</td>
                      <td>{formatDate(item.until)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
    </div>

  );
}
