import React, {useEffect, useState} from 'react';
import './InvoiceDialog.scss';
import {useNavigate} from "react-router-dom";
import {createInvoice, fetchInvoice, updateInvoice} from "../../../api/API";
import {useAuth} from "../../../contexts/AuthContext";

const InvoiceDialog = (props) => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    // fields state
    const [quotation, setQuotation] = useState('');
    const [client, setClient] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const statusData = ["Paid", "Unpaid", "Pending", "Overdue"];

    useEffect(() => {
        const fetchInvoiceRecord = async () => {
            try {
                let data = {};
                if (isAuthenticated) {
                    data = await fetchInvoice(props.itemId);
                }
                if (data) {
                    setRecord(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (props.itemId !== 'new') {
            fetchInvoiceRecord();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, props.itemId]);

    useEffect(() => {
        setQuotation(record ? record.quotation : '');
        setClient(record ? record.client : '');
        setEmail(record ? record.email : '');
        setStartDate(record ? record.start_date : '');
        setEndDate(record ? record.end_date : '');
        setAmount(record ? record.amount : 0);
        setStatus(record ? record.status : statusData[0]);
    }, [record]);

    const getTitle = () => {
        return `Invoice: ${props.itemId === 'new' ? 'New' : record ? record.quotation : ''}`;
    }

    const closeDialog = () => {
        navigate('/invoice');
    };

    const handleCreateInvoice = async () => {
        if (updating) return;
        const values = {
            id: record ? record.id : 0,
            quotation,
            client,
            email,
            start_date: startDate,
            end_date: endDate,
            amount,
            status,
        };
        setUpdating(true);
        try {
            if (props.itemId === 'new') {
                await createInvoice(values);
            } else {
                await updateInvoice(values);
            }
        } catch (ex) {
            console.error(ex);
        } finally {
            setUpdating(false);
        }
        closeDialog();
        props.onSaved && props.onSaved();
    };

    return (
        <div className="o_InvoiceDialog">
            <div className="modal-backdrop fade show"/>
            <div id="exampleModalCenter" className="modal modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{getTitle()}</h5>
                        </div>
                        <div className="modal-body">
                            {loading &&
                            <div className="d-flex h-100 justify-content-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            {error && <div>Error: {error}</div>}
                            {!loading &&
                            <form>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="field_quotation">Quotation</label>
                                        <input type="text" className="form-control" id="field_quotation" placeholder="Quotation"
                                               value={quotation} onChange={(e) => setQuotation(e.target.value)}/>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="field_client">Client</label>
                                        <input type="text" className="form-control" id="field_client" placeholder="Client"
                                               value={client} onChange={(e) => setClient(e.target.value)}/>
                                    </div>
                                    <div className="mb-3 col-md-12">
                                        <label className="form-label" htmlFor="field_email">Email</label>
                                        <input type="email" className="form-control" id="field_email" placeholder="Email"
                                               value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="field_start_date">Start Date</label>
                                        <input type="date" className="form-control" id="field_start_date" placeholder="Start Date"
                                               value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="field_end_date">End Date</label>
                                        <input type="date" className="form-control" id="field_end_date" placeholder="End Date"
                                               value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="field_amount">Amount</label>
                                        <input type="number" className="form-control" id="field_amount" placeholder="Amount"
                                               value={amount} onChange={(e) => setAmount(e.target.value)}/>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="field_status">Status</label>
                                        <select className="form-control" id="field_status" value={status}
                                                onChange={(e) => setStatus(e.target.value)}>
                                            {statusData.map(s => <option value={s} key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </form>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeDialog}>Close</button>
                            <button type="button" className={'btn btn-primary ' + (updating && 'disabled')}
                                    onClick={handleCreateInvoice}>
                                {props.itemId === 'new' ? 'Create' : 'Save'}
                                {updating && <i className="fa fa-spinner fa-spin ms-2"/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDialog;
