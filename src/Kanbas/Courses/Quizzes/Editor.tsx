import { useParams } from "react-router-dom";
import { quizzes } from "../../Database";

export default function QuizzesEditor() {
  const { qid } = useParams();
  const quiz = quizzes.find((quiz) => quiz._id === qid);

  return (
    <div id="wd-quizzes-editor" className="container">
      <div>
        <label htmlFor="wd-name">Quiz Name</label>
        <input id="wd-name" className="form-control" value={quiz?.title} />
      </div>
      <textarea id="wd-description" className="form-control mt-3 mb-3">
        {quiz?.description}
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-quiz-type">Quiz Type</label>
          </td>
          <td>
            <select id="wd-quiz-type">
              <option value="graded-quiz">Graded Quiz</option>
              <option value="practice-quiz">Practice Quiz</option>
              <option value="graded-survey">Graded Survey</option>
              <option value="ungraded-survey">Ungraded Survey</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="quizzes">QUIZZES</option>
              <option value="exams">EXAMS</option>
              <option value="assignments">ASSIGNMENTS</option>
              <option value="project">PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-shuffle-answers">Shuffle Answers</label>
          </td>
          <td>
            {/* checkbox, default yes */}
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-time-limit">Time Limit</label>
          </td>
          <td>
            <input id="wd-time-limit" value={20} />
            <label>  minutes</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-attempts">Multiple Attempts</label>
          </td>
          <td>
            {/* checkbox, default no */}
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-allowed-attempts">Number of Attempts</label>
          </td>
          <td>
            <input id="wd-allowed-attempts" value={1} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-show-answers">Show Correct Answers</label>
          </td>
          <td>
            <select id="wd-show-answers">
              <option value="never">Never</option>
              <option value="immediately">Immediately</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-access-code">Access Code</label>
          </td>
          <td>
            <input id="wd-access-code" value="" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-one-question">One Question at a Time</label>
          </td>
          <td>
            {/* checkbox, default yes */}
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-webcam">Webcam Required</label>
          </td>
          <td>
            {/* checkbox, default no */}
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-lock-questions">Lock Questions After Answering</label>
          </td>
          <td>
            {/* checkbox, default no */}
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input type="date" id="wd-due-date" value="2024-05-13" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input type="date" id="wd-available-from" value="2024-05-06" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input type="date" id="wd-available-until" value="2024-05-20" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top"></td>
          <button id="wd-save-quiz">Save</button>
        </tr>
      </table>
    </div>
  );
}
