import {useEffect, useState} from "react";
import { Editor } from '@tinymce/tinymce-react';
import {useNavigate} from "react-router-dom";
import * as client from "../client";
import {useParams} from "react-router";
import NewQuestion from "./NewQuestion";

export default function NewQuiz() {
  const [name, setName] = useState("Unnamed Quiz")
  const [editorData, setEditorData] = useState("");
  const [tab, setTab] = useState(0)
  const [quizType, setQuizType] = useState("Graded Quiz")
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes")
  const [shuffleAnswers, setShuffleAnswers] = useState(false)
  const [timeLimit, setTimeLimit] = useState(false)
  const [timeLimitMinutes, setTimeLimitMinutes] = useState('20')
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false)
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true)
  const [webcamRequired, setWebcamRequired] = useState(false)
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false)
  const [dates, setDates] = useState([
    { _id: new Date().getTime().toString(), due: '', availableFrom: '', until: '' }
  ])

  const [questions, setQuestions] = useState([])

  const [editQuiz, setEditQuiz] = useState<any>()

  const navigate = useNavigate()
  const { cid, qid } = useParams();

  useEffect(() => {
    getQuiz()
  }, [qid])

  const getQuiz = async () => {
    if (qid) {
      const quiz = await client.getQuizById(qid)
      setEditQuiz(quiz)
      setName(quiz.name)
      setEditorData(quiz.content)
      setQuizType(quiz.quizType)
      setAssignmentGroup(quiz.assignmentGroup)
      setShuffleAnswers(quiz.shuffleAnswers)
      setTimeLimit(quiz.timeLimit)
      setTimeLimitMinutes(quiz.timeLimitMinutes)
      setAllowMultipleAttempts(quiz.allowMultipleAttempts)

      setShowCorrectAnswers(quiz.showCorrectAnswers)
      setAccessCode(quiz.accessCode)
      setOneQuestionAtATime(quiz.oneQuestionAtATime)
      setWebcamRequired(quiz.webcamRequired)
      setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering)
      setDates(quiz.dates || [])
      setQuestions(quiz.questions || [])
    }
  }

  const save = async (publish: boolean) => {
    if (cid) {
      if (editQuiz && qid) {
        await client.updateQuiz(qid, {
          name,
          content: editorData,
          quizType,
          assignmentGroup,
          shuffleAnswers,
          timeLimit,
          timeLimitMinutes,
          allowMultipleAttempts,
          showCorrectAnswers,
          accessCode,
          oneQuestionAtATime,
          webcamRequired,
          lockQuestionsAfterAnswering,
          dates,
          publish
        });
      } else {
        await client.createQuizForCourse(cid, {
          name,
          content: editorData,
          quizType,
          assignmentGroup,
          shuffleAnswers,
          timeLimit,
          timeLimitMinutes,
          allowMultipleAttempts,
          showCorrectAnswers,
          accessCode,
          oneQuestionAtATime,
          webcamRequired,
          lockQuestionsAfterAnswering,
          dates,
          publish
        });
      }
      if (!publish) {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/Detail/${qid}`)
      } else {
        navigate(`/Kanbas/Courses/${cid}/Quizzes`)
      }
    }
  }

  const handleQuestionsSave = async () => {
    if (qid) {
      await client.updateQuiz(qid, {
        questions
      });
    }
  }

  return (
    <div className="d-flex flex-column" id="wd-home">
      <div className="flex-grow-1 d-flex align-items-center justify-content-end py-3 border-bottom mb-4">
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-3">
            <div className="text-dark-emphasis fw-semibold">Points {questions ? questions.reduce((total: number, item: any) => total += +item.points, 0) : 0}</div>
            <div className="d-flex align-items-center gap-1 text-body-tertiary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban"
                   viewBox="0 0 16 16">
                <path
                  d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
              </svg>
              { editQuiz ? (editQuiz.publish ? 'Published' : 'Not Published') : 'Not Published' }
            </div>
          </div>
          <button type="button" className="btn btn-light border">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
          </button>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={`nav-link ${tab === 0 ? 'active' : 'text-danger'}`} onClick={() => setTab(0)}>Details</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${tab === 1 ? 'active' : 'text-danger'}`} onClick={() => setTab(1)}>Questions</a>
        </li>
      </ul>

      {
        tab === 0 ? (
          <>
            <div className="my-4">
              <input type="text" className="form-control w-75" placeholder="Search for Quiz" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="mb-2">Quiz Instructions:</div>
            <Editor
              apiKey='kpvrf4j8y5ogcac8m39zh8g43kgussnq0nlb00dr9731j7kc'
              init={{
                plugins: [
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
              }}
              value={editorData}
              onEditorChange={content => setEditorData(content)}
            />
            <div className="mt-4">
              <div className="row g-3 align-items-center mb-3">
                <div className="col-2 text-end">
                  <label htmlFor="quizType" className="col-form-label">Quiz Type</label>
                </div>
                <div className="col-auto">
                  <select id="quizType" className="form-select" style={{width: 250}} value={quizType} onChange={e => setQuizType(e.target.value)}>
                    <option selected value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </select>
                </div>
              </div>
              <div className="row g-3 align-items-center mb-3">
                <div className="col-2 text-end">
                  <label htmlFor="assignmentGroup" className="col-form-label">Assignment Group</label>
                </div>
                <div className="col-auto">
                  <select id="assignmentGroup" className="form-select" style={{width: 250}} value={assignmentGroup} onChange={e => setAssignmentGroup(e.target.value)}>
                    <option value="Quizzes" selected>Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
              </div>
              <div className="row g-3 align-items-center mb-3">
                <div className="col-2 text-end">

                </div>
                <div className="col-10">
                  <div className="text-dark-emphasis fw-semibold mb-2">Options</div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={shuffleAnswers} onChange={e => setShuffleAnswers(e.target.checked)} id="shuffle_answers" />
                    <label className="form-check-label" htmlFor="shuffle_answers">
                      Shuffle Answers
                    </label>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="time_limit" checked={timeLimit} onChange={e => setTimeLimit(e.target.checked)} />
                      <label className="form-check-label" htmlFor="time_limit">
                        Time Limit
                      </label>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <input className="form-control" type="text" id="minutes" style={{width: 50}} value={timeLimitMinutes} onChange={e => setTimeLimitMinutes(e.target.value)} />
                      <label className="form-check-label" htmlFor="minutes">
                        Minutes
                      </label>
                    </div>
                  </div>
                  <div className="form-check my-2">
                    <input className="form-check-input" type="checkbox" value="" id="multiple_attempts" checked={allowMultipleAttempts} onChange={e => setAllowMultipleAttempts(e.target.checked)} />
                    <label className="form-check-label" htmlFor="multiple_attempts">
                      Multiple Attempts
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input className="form-check-input" type="checkbox" value="" id="show_correct_answers" checked={showCorrectAnswers} onChange={e => setShowCorrectAnswers(e.target.checked)} />
                    <label className="form-check-label" htmlFor="show_correct_answers">
                      Show Correct Answers
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input className="form-check-input" type="checkbox" value="" id="one_question_at_a_time" checked={oneQuestionAtATime} onChange={e => setOneQuestionAtATime(e.target.checked)} />
                    <label className="form-check-label" htmlFor="one_question_at_a_time">
                      One Question at a Time
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input className="form-check-input" type="checkbox" value="" id="webcam_required " checked={webcamRequired} onChange={e => setWebcamRequired(e.target.checked)} />
                    <label className="form-check-label" htmlFor="webcam_required">
                      Webcam Required
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input className="form-check-input" type="checkbox" value="" id="lock_questions_after_answering " checked={lockQuestionsAfterAnswering} onChange={e => setLockQuestionsAfterAnswering(e.target.checked)} />
                    <label className="form-check-label" htmlFor="lock_questions_after_answering">
                      Lock Questions After Answering
                    </label>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className="col-2 text-end">
                  Access Code
                </div>
                <div className="col-10">
                  <input className="form-control w-25" type="text" id="access_code" value={accessCode} onChange={e => setAccessCode(e.target.value)} />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className="col-2 text-end">
                  Assign
                </div>
                <div className="col-10">
                  <div className="border rounded p-2 w-50">
                    <div className="text-dark-emphasis fw-semibold mb-2">Assign to</div>
                    <div className="p-2 border my-2 rounded">
                      <div className="d-inline-flex align-items-center bg-body-secondary p-2 gap-2 rounded">
                        <span>Everyone</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x"
                             viewBox="0 0 16 16">
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                      </div>
                    </div>
                    {
                      dates.map(item => (
                        <div key={item._id}>
                          <div className="text-dark-emphasis fw-semibold mb-2">Due</div>
                          <div className="input-group mb-3">
                            <input type="date" className="form-control" value={item.due} onChange={e => {
                              item.due = e.target.value
                              setDates([...dates])
                            }} />
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="flex-grow-1">
                              <div className="text-dark-emphasis fw-semibold mb-2">Available from</div>
                              <div className="input-group mb-3">
                                <input type="date" className="form-control" value={item.availableFrom} onChange={e => {
                                  item.availableFrom = e.target.value
                                  setDates([...dates])
                                }} />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="text-dark-emphasis fw-semibold mb-2">Until</div>
                              <div className="input-group mb-3">
                                <input type="date" className="form-control" value={item.until} onChange={e => {
                                  item.until = e.target.value
                                  setDates([...dates])
                                }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="d-flex align-items-center justify-content-center bg-light border rounded p-2 w-50" onClick={() => {
                    setDates([...dates,  { _id: new Date().getTime().toString(), due: '', availableFrom: '', until: '' }])
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus"
                         viewBox="0 0 16 16">
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    <span>Add</span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-3 p-3 border-top">
                  <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={() => save(false)}>Save</button>
                  <button type="button" className="btn btn-danger" onClick={() => save(true)}>Save And Publish</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <NewQuestion handleSave={handleQuestionsSave} questions={questions} setQuestions={setQuestions} />
        )
      }
    </div>

  );
}
