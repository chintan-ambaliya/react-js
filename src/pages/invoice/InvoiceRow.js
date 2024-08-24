import React, {useEffect, useRef} from 'react';
import Dropdown from 'bootstrap/js/dist/dropdown';

const InvoiceRow = (props) => {
    const {record, fields} = props;
    const userDropdown = useRef(null);
    let dropdown = {};

    useEffect(() => {
        dropdown = new Dropdown(userDropdown.current, {autoClose: true, display: 'static', boundary: document.body});
    }, []);

    return (
        <tr>
            {fields.map(f => <td key={`${f.name}-${record.id}`}>{record[f.name]}</td>)}
            <td>
                <div className="dropdown" ref={userDropdown}>
                    <span className="d-block" data-toggle="dropdown" data-bs-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-ellipsis-v px-3 py-1"/>
                    </span>
                    <div className="dropdown-menu dropdown-menu-start">
                        <span className="dropdown-item" onClick={() => props.onEdit(record)}><i className="fa fa-edit me-2"/>Edit</span>
                        <span className="dropdown-item"><i className="fa fa-eye me-2"/>View</span>
                        <span className="dropdown-item"><i className="fa fa-archive me-2"/>Archive</span>
                        <span className="dropdown-item"><i className="fa fa-trash me-2 text-danger"/>Delete</span>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default InvoiceRow;
