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

export default function QuizStart() {
  const [quiz, setQuiz] = useState<any>()
  const [curIndex, setCurIndex] = useState(0)
  const [answers, setAnswers] = useState<any>([])
  const [tempAnswers, setTempAnswers] = useState<any>([])
  const [testPoints, setTestPoints] = useState(0)
  const [finish, setFinish] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const { currentUser } = useSelector((state: any) => state.accountReducer);

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
        setTempAnswers(JSON.parse(JSON.stringify(newAnswers)))
      }
    }
  }

  const handleNext = () => {
    if (tempAnswers[curIndex]) {
      if (curIndex < quiz.questions.length - 1) {
        setAnswers(JSON.parse(JSON.stringify(tempAnswers)))
        setCurIndex(curIndex + 1)
      } else {
        setAnswers(JSON.parse(JSON.stringify(tempAnswers)))
        submitQuiz()
      }
    }
  }

  const submitQuiz = async () => {
    if (qid) {
      let testPoints = 0
      for (let i = 0; i < tempAnswers.length; i++) {
        const question = quiz.questions[i]
        if (question.type !== 'Fill in the Blank') {
          const matchedChoice = question.choices.find((choice: any) => choice._id === tempAnswers[i]._id)
          if (matchedChoice && matchedChoice.isCorrectAnswer) {
            testPoints += +question.points
          }
        } else {
          const matchedChoice = question.choices.some((choice: any) => choice.value.toLowerCase() === tempAnswers[i].toLowerCase())
          if (matchedChoice) {
            testPoints += +question.points
          }
        }
      }
      await client.createGradeForQuiz(qid, {
        user: currentUser._id,
        answers: tempAnswers,
        grade: testPoints,
        startDate,
        endDate: new Date(),
      })
      setTestPoints(testPoints)
      setFinish(true)
    }
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
    setTempAnswers(JSON.parse(JSON.stringify(newAnswers)))
  }

  const question = quiz && quiz.questions && quiz.questions.length > 0 && quiz.questions[curIndex]

  return (
    <div className="d-flex flex-column" id="wd-home">
      {
        quiz && (
          <div>
            <h1>{quiz.name}</h1>
            <div>
              Started: {formatDate(startDate)}
            </div>
            {
              finish ? (
                <>
                  <div className="py-2 fs-1 border-bottom">Your Score</div>
                  <div className="p-3 text-center">
                    <div className="fs-1">{testPoints} points</div>
                    {
                      quiz.allowMultipleAttempts ? (
                        <button type="button" className="btn btn-light border" onClick={reset}>Retry</button>
                      ) : (
                        <button type="button" className="btn btn-light border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Detail/${qid}`)}>View My Grades</button>
                      )
                    }
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
                                  tempAnswers[curIndex] = choice
                                  setTempAnswers([...tempAnswers])
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
                                tempAnswers[curIndex] = e.target.value
                                setTempAnswers([...tempAnswers])
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

            <div className="fs-4">Questions</div>
            <div>
              {
                quiz && quiz.questions && quiz.questions.map((question: any, index: number) => (
                  <div className="d-flex align-items-center gap-1 ms-3" key={question._id}>
                    {
                      answers[index] ? (
                          question.choices.find((choice: any) => choice._id === answers[index]._id) &&
                        question.choices.find((choice: any) => choice._id === answers[index]._id).isCorrectAnswer ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                            <path
                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </svg>
                          ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-x-circle-fill text-danger" viewBox="0 0 16 16">
                            <path
                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                          </svg>
                        )
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-question-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                          <path
                            d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                        </svg>
                      )
                    }
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
//test