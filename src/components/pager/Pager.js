import React from 'react';
import './Pager.scss';

const Pager = (props) => {
    return (
        <div className="o_Pager">
            <ul className="pagination m-0">
                <li className="page-item">
                    <span className="page-link" onClick={props.onSelect} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </span>
                </li>
                <li className="page-item"><span className="page-link" onClick={props.onSelect}>1</span></li>
                <li className="page-item"><span className="page-link" onClick={props.onSelect}>2</span></li>
                <li className="page-item"><span className="page-link" onClick={props.onSelect}>3</span></li>
                <li className="page-item">
                    <span className="page-link" onClick={props.onSelect} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default Pager;
