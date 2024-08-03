import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    const [showScore, setShowScore] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let optionArray = [option1, option2, option3, option4];

    console.log(optionArray[question.ans - 1]);
    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(score + 1);
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                console.log(optionArray[question.ans - 1]);

                optionArray[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index])
            setLock(false);

            optionArray.map((op) => {
                op.current.classList.remove("wrong");
                op.current.classList.remove("correct");

                return null;
            })
        }

    }
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {
                result ? <>
                    <h3>Answers Submitted successfully</h3>

                    <button onClick={() => setShowScore(!showScore)}>{showScore ? "Hide Results" : "Show Results"}</button>
                    {
                        showScore && <p>You Scored {score} out of {data.length}</p>
                    }
                </> : <>
                    <h2>{index + 1} {question.question}</h2>
                    <ul>
                        <li onClick={(e) => checkAns(e, 1)} ref={option1}>{question.option1}</li>
                        <li onClick={(e) => checkAns(e, 2)} ref={option2}>{question.option2}</li>
                        <li onClick={(e) => checkAns(e, 3)} ref={option3}>{question.option3}</li>
                        <li onClick={(e) => checkAns(e, 4)} ref={option4}>{question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </>
            }

        </div>
        // <div className='quiz-container'>

        //     <h2>Quiz App</h2>

        //     <hr />
        //     <div className='question'>
        //         <h2>Which device is required for internet connection?</h2>
        //         <ul>
        //             <li>Modem</li>
        //             <li>Router</li>
        //             <li>LAN</li>
        //             <li>Pen Drive</li>
        //         </ul>
        //     </div>
        //     <div>
        //         <button>Next</button>
        //     </div>
        //     <div>
        //         <p>1 of 5 questions</p>
        //     </div>
        // </div>
    )
}

export default Quiz
