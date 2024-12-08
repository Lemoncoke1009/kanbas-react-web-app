import {useNavigate} from "react-router-dom";
import * as client from "../client";
import {useParams} from "react-router";
import {useEffect, useState} from "react";

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

  return `${month} ${day} at ${hours}${minutes > 0 ? `:${minutes}` : ''}${isPM ? 'pm' : 'am'}`;
}

function getCurrentTime() {
  const date = new Date()
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  hours = hours % 12 || 12;

  return `at ${hours}${minutes > 0 ? `:${minutes}` : ''}${isPM ? 'pm' : 'am'}`;
}

export default function QuizPreview() {
  const [quiz, setQuiz] = useState<any>()
  const [curIndex, setCurIndex] = useState(0)
  const [answers, setAnswers] = useState<any>([])
  const [testPoints, setTestPoints] = useState(0)
  const [finish, setFinish] = useState(false)

  const navigate = useNavigate()
  const { cid, qid } = useParams();

  useEffect(() => {
    getQuiz()
  }, [qid])

  const getQuiz = async () => {
    if (qid) {
      const quiz = await client.getQuizById(qid)
      setQuiz(quiz)
      if (quiz.questions) {
        const newAnswers = []
        for (let i = 0; i < quiz.questions.length; i++) {
          newAnswers.push('')
        }
        setAnswers(newAnswers)
      }
    }
  }

  const handleNext = () => {
    if (answers[curIndex]) {
      if (curIndex < quiz.questions.length - 1) {
        setCurIndex(curIndex + 1)
      } else {
        submitQuiz()
      }
    }
  }

  const submitQuiz = () => {
    let testPoints = 0
    for (let i = 0; i < answers.length; i++) {
      const question = quiz.questions[i]
      if (question.type !== 'Fill in the Blank') {
        const matchedChoice = question.choices.find((choice: any) => choice._id === answers[i]._id)
        if (matchedChoice && matchedChoice.isCorrectAnswer) {
          testPoints += +question.points
        }
      } else {
        const matchedChoice = question.choices.some((choice: any) => choice.value.toLowerCase() === answers[i].toLowerCase())
        if (matchedChoice) {
          testPoints += +question.points
        }
      }
    }
    setTestPoints(testPoints)
    setFinish(true)
  }

  const reset = () => {
    setTestPoints(0)
    setFinish(false)
    setCurIndex(0)
    const newAnswers = []
    for (let i = 0; i < quiz.questions.length; i++) {
      newAnswers.push('')
    }
    setAnswers(newAnswers)
  }

  const question = quiz && quiz.questions && quiz.questions.length > 0 && quiz.questions[curIndex]

  return (
    <div className="d-flex flex-column" id="wd-home">
      {
        quiz && (
          <div>
            <h1>{quiz.name}</h1>
            <div className="d-flex align-items-center gap-2 alert alert-danger" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
              </svg>
              <span>This is a preview of the published version of the quiz</span>
            </div>
            <div>
              Started: {formatDate(new Date())}
            </div>
            {
              finish ? (
                <>
                  <div className="py-2 fs-1 border-bottom">Your Score</div>
                  <div className="p-3 text-center">
                    <div className="fs-1">{testPoints} points</div>
                    <button type="button" className="btn btn-light border" onClick={reset}>Reset</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="py-2 fs-1 border-bottom">Quiz Instructions</div>
                  {
                    question && (
                      <div key={question._id} className="border w-50 mx-auto my-5">
                        <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-secondary-subtle">
                          <div className="d-flex gap-3">
                            <div className="fw-bold fs-4">{question.title}</div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <div>{question.points} pts</div>
                          </div>
                        </div>
                        <div className="p-3" dangerouslySetInnerHTML={{__html: question.content}}></div>
                        {
                          question.type !== 'Fill in the Blank' ? question.choices.map((choice: any) => (
                            <div key={choice._id} className="d-flex align-items-center gap-3 mx-3 py-2 border-top">
                              {
                                question.type !== 'Fill in the Blank' && <input className="form-check-input mt-0" type="radio" name={question._id + "-radio"} onClick={() => {
                                  answers[curIndex] = choice
                                  setAnswers([...answers])
                                }} />
                              }
                              <div className="d-flex align-items-center gap-2">
                                {
                                  question.type !== 'True/False' ? choice.value : (choice.value ? 'True' : 'False')
                                }
                              </div>
                            </div>
                          )) : (
                            <div className="d-flex align-items-center gap-3 mx-3 py-2 border-top">
                              <input className='form-control' onChange={(e) => {
                                answers[curIndex] = e.target.value
                                setAnswers([...answers])
                              }} />
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                  <div className="w-50 mx-auto text-end">
                    <button type="button" className="btn btn-light border" onClick={handleNext}>
                      {curIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </div>

                  <div className="d-flex justify-content-end align-items-center border p-2 my-4">
                    <span className="me-2 text-body-secondary">Quiz saved {getCurrentTime()}</span>
                    <button type="button" className="btn btn-light border" onClick={submitQuiz}>Submit Quiz</button>
                  </div>
                </>
              )
            }

            <div className="d-flex align-items-center gap-2 border p-2 my-4 bg-body-tertiary border cursor-pointer" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/New/${qid}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   className="bi bi-pencil" viewBox="0 0 16 16">
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
              <span>Keep Editing This Quiz</span>
            </div>

            <div className="fs-4">Questions</div>
            <div>
              {
                quiz && quiz.questions && quiz.questions.map((question: any, index: number) => (
                  <div className="d-flex align-items-center gap-1 ms-3" key={question._id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-question-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path
                        d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                    </svg>
                    <span className={curIndex === index ? 'text-danger fw-bold' : ''}>Question {index + 1}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>

  );
}
