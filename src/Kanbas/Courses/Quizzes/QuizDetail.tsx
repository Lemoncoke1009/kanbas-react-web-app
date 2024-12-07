import {useNavigate} from "react-router-dom";
import * as client from "../client";
import {useParams} from "react-router";
import {useEffect, useState} from "react";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([])

  const navigate = useNavigate()
  const { cid } = useParams();

  useEffect(() => {
    getQuizzes()
  }, [])

  const getQuizzes = async () => {
    if (cid) {
      const quizzes = await client.getQuizzesForCourse(cid)
      setQuizzes(quizzes)
    }
  }

  return (
    <div className="d-flex flex-column" id="wd-home">
      <div className="flex-grow-1 d-flex align-content-center justify-content-between py-3 border-bottom mb-4">
        <input type="text" className="form-control w-auto" id="exampleFormControlInput1" placeholder="Search for Quiz" />

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-danger" onClick={() => navigate('New')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus"
                 viewBox="0 0 16 16">
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            Quiz
          </button>
          <button type="button" className="btn btn-light border">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="wd-title p-3 ps-2 bg-body-tertiary d-flex gap-2 align-items-center border border-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
        Assignment Quizzes
      </div>
      <ul className="wd-lessons list-group rounded-0">
        {
          quizzes.map((quiz: any) => (
            <li key={quiz._id} className="d-flex align-items-center justify-content-between wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-rocket-takeoff mx-3 fs-3 text-success" viewBox="0 0 16 16">
                  <path
                    d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"/>
                  <path
                    d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"/>
                  <path
                    d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                </svg>
                <div className="d-flex flex-column">
                  <div className="fs-6 fw-bold">{quiz.name}</div>
                  <div className="d-flex align-items-center fs-14 text-dark-emphasis">
                    <div className="fw-medium me-2">Closed</div>
                    <div className="me-2" style={{width: 1, height: 12, background: '#333'}}></div>
                    <div className="d-flex gap-1 me-2">
                      <div className="fw-medium">Due </div>
                      <div>Sep 21 at 1pm</div>
                    </div>
                    <div className="me-2" style={{width: 1, height: 12, background: '#333'}}></div>
                    <div className="fw-medium me-2">29 pts</div>
                    <div className="me-2" style={{width: 1, height: 12, background: '#333'}}></div>
                    <div className="fw-medium me-2">11 Questions</div>
                  </div>
                </div>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="fs-4"
                     height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" data-bs-toggle="dropdown">
                  <circle cx="256" cy="256" r="48"></circle>
                  <circle cx="256" cy="416" r="48"></circle>
                  <circle cx="256" cy="96" r="48"></circle>
                </svg>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Edit</a></li>
                  <li><a className="dropdown-item" href="#">Delete</a></li>
                  <li><a className="dropdown-item" href="#">Publish</a></li>
                  <li><a className="dropdown-item" href="#">Copy</a></li>
                  <li><a className="dropdown-item" href="#">Sort</a></li>
                </ul>
              </div>
            </li>
          ))
        }
      </ul>
    </div>

  );
}
