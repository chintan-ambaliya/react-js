import React from 'react';
import './Breadcrumb.scss';
import {useSelector} from "react-redux";

const Breadcrumb = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <>
            {isAuthenticated &&
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="o_Breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><i className="fa fa-home me-2"/> Home</li>
                                <li className="breadcrumb-item">Sales</li>
                                <li className="breadcrumb-item active" aria-current="page">Invoices</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default Breadcrumb;
