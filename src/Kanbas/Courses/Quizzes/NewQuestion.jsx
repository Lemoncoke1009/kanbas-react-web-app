import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

export default function NewQuestion({ questions, setQuestions, handleSave }) {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)

  const addQuestion = () => {
    const newQuestion = {
      _id: new Date().getTime().toString(),
      title: '',
      type: 'Multiple Choice',
      points: '',
      content: '',
      choices: [
        {
          _id: new Date().getTime().toString(),
          value: '',
          isCorrectAnswer: true
        },
        {
          _id: new Date().getTime().toString() + 1,
          value: '',
          isCorrectAnswer: false
        },
        {
          _id: new Date().getTime().toString() + 2,
          value: '',
          isCorrectAnswer: false
        },
        {
          _id: new Date().getTime().toString() + 3,
          value: '',
          isCorrectAnswer: false
        }
      ],
      isEdit: true
    }
    setQuestions([...questions, newQuestion])
  }

  const handleTypeChange = (question, type) => {
    question.type = type
    if (type === 'True/False') {
      question.choices = [
        {
          _id: new Date().getTime().toString(),
          value: true,
          isCorrectAnswer: true
        },
        {
          _id: new Date().getTime().toString() + 1,
          value: false,
          isCorrectAnswer: false
        },
      ]
    } else if (type === 'Fill in the Blank') {
      question.choices.forEach(item => item.isCorrectAnswer = true)
    } else {
      question.choices.forEach(item => item.isCorrectAnswer = false)
    }
    setQuestions([...questions])
  }

  const handleAddChoice = (question) => {
    if (question.type !== 'True/False') {
      question.choices.push({
        _id: new Date().getTime().toString(),
        value: '',
        isCorrectAnswer: false
      })
      setQuestions([...questions])
    }
  }

  const handleDeleteChoice = (question, choice) => {
    question.choices = question.choices.filter(item => item._id !== choice._id)
    setQuestions([...questions])
  }

  const handleChoiceValueChange = (question, choice, value) => {
    const matchedChoice = question.choices.find(item => item._id === choice._id)
    if (matchedChoice) {
      matchedChoice.value = value
      setQuestions([...questions])
    }
  }

  const handleCorrectAnswerChange = (question, choice) => {
    question.choices.forEach(item => item.isCorrectAnswer = false)
    const matchedChoice = question.choices.find(item => item._id === choice._id)
    if (matchedChoice) {
      matchedChoice.isCorrectAnswer = true
      setQuestions([...questions])
    }
  }

  const saveQuestions = () => {
    setEditMode(false)
    handleSave()
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center p-4 gap-3">
        <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded cursor-pointer" style={{width: "fit-content"}} onClick={addQuestion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus"
               viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
          <span>New Question</span>
        </div>

        <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded cursor-pointer" style={{width: "fit-content"}} onClick={() => setEditMode(!editMode)}>
          <span>{editMode ? 'View' : 'Edit'} Mode</span>
        </div>
      </div>
      <div className="my-5">
        {
          questions && questions.map(question => (
            <div key={question._id} className="border w-50 mx-auto mb-5">
              {
                editMode ? (
                  <>
                    <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                      <div className="d-flex gap-3">
                        <input type="text" className="form-control" placeholder="Question Title" value={question.title} onChange={e => {
                          question.title = e.target.value
                          setQuestions([...questions])
                        }} />
                        <select className="form-select" value={question.type} onChange={e => handleTypeChange(question, e.target.value)}>
                          <option value="Multiple Choice">Multiple Choice</option>
                          <option value="True/False">True/False</option>
                          <option value="Fill in the Blank">Fill in the Blank</option>
                        </select>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div>pts: </div>
                        <input type="text" className="form-control" style={{width: 60}} value={question.points} onChange={e => {
                          question.points = e.target.value
                          setQuestions([...questions])
                        }} />
                      </div>
                    </div>
                    <div className="p-3">
                      <div>
                        { question.type === 'Multiple Choice' ? 'Enter your question and multiple answers, then select the one correct answer.' : question.type === 'True/False' ? 'Enter your question text, then select if True or False is the correct answer.' : 'Enter your question text, then defne all possible correct answers for the blank.\n' +
                          'Students will see the question followed by a small text box to type their answer.'}
                      </div>
                      <div className="fw-bold fs-5 mb-2 mt-1">Question:</div>
                      <Editor
                        apiKey='kpvrf4j8y5ogcac8m39zh8g43kgussnq0nlb00dr9731j7kc'
                        init={{
                          plugins: [
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                          ],
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough',
                          tinycomments_mode: 'embedded',
                          tinycomments_author: 'Author name',
                          height: 200
                        }}
                        value={question.content}
                        onEditorChange={content => {
                          question.content = content
                          setQuestions([...questions])
                        }}
                      />
                      <div className="fw-bold fs-5 mb-2 mt-1">Answers:</div>
                      {
                        question.choices.map(choice => (
                          <div key={choice._id} className="d-flex align-items-center justify-content-between ps-5 mb-2">
                            <div className="d-flex align-items-center gap-2">
                              {
                                question.type !== 'Fill in the Blank' && <input className="form-check-input mt-0" type="radio" name={question._id + "-radio"} checked={choice.isCorrectAnswer} onChange={() => handleCorrectAnswerChange(question, choice)} />
                              }
                              {
                                question.type !== 'True/False' ? (
                                  <>
                                    <div style={{whiteSpace: 'nowrap'}} className={choice.isCorrectAnswer ? "text-success" : ""}>{choice.isCorrectAnswer ? 'Correct' : 'Possible'} Answer: </div>
                                    <input type="text" className="form-control" value={choice.value} onChange={e => handleChoiceValueChange(question, choice, e.target.value)} />
                                  </>
                                ) : (
                                  <span>{ choice.value ? 'True' : 'False' }</span>
                                )
                              }
                            </div>
                            {
                              question.type !== 'True/False' && (
                                <div onClick={() => handleDeleteChoice(question, choice)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                       className="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                  </svg>
                                </div>
                              )
                            }
                          </div>
                        ))
                      }
                      {
                        question.type !== 'True/False' && (
                          <div className="d-flex align-items-center gap-2 text-danger justify-content-end cursor-pointer" onClick={() => handleAddChoice(question)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                              <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            <span>Add Another Answer</span>
                          </div>
                        )
                      }
                    </div>

                    <div className="p-3 d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center bg-light p-2 border rounded" style={{width: "fit-content"}} onClick={() => {
                        question.isEdit = false
                        setQuestions([...questions])
                      }}>
                        Cancel
                      </div>
                      <div className="d-flex align-items-center justify-content-center bg-danger text-white p-2 border rounded" style={{width: "fit-content"}} onClick={() => {
                        question.isEdit = false
                        setQuestions([...questions])
                      }}>
                        Update Question
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
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
                      question.choices.map(choice => (
                        <div key={choice._id} className="d-flex align-items-center gap-3 mx-3 py-2 border-top">
                          {
                            question.type !== 'Fill in the Blank' && <input className="form-check-input mt-0" type="radio" name={question._id + "-radio"} checked={choice.isCorrectAnswer} />
                          }
                          <div className="d-flex align-items-center gap-2">
                            {
                              question.type !== 'True/False' ? choice.value : (choice.value ? 'True' : 'False')
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
      <div className="d-flex align-items-center justify-content-center gap-3 p-3 border-top">
        <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => saveQuestions()}>Save</button>
      </div>
    </div>
  );
}
