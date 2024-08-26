import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import InvoiceDialog from './invoice_dialog/InvoiceDialog';
import InvoiceRow from './InvoiceRow';
import {fetchInvoices} from "../../api/API";
import Pager from './../../components/pager/Pager';
import './Invoice.scss';

const Invoice = () => {
    const {id} = useParams();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAnimated, setAnimated] = useState(false);

    useEffect(() => {
        fetchInvoiceData();
    }, [isAuthenticated]);

    const summaries = [
        {status: "Paid", amount: '$ 76,940', invoices: 350, decoration: 'text-success bg-success-subtle'},
        {status: "Unpaid", amount: '$ 23,145', invoices: 64, decoration: 'text-info bg-info-subtle'},
        {status: "Pending", amount: '$ 7,431', invoices: 14, decoration: 'text-warning bg-warning-subtle'},
        {status: "Overdue", amount: '$ 2,510', invoices: 10, decoration: 'text-black bg-400'},
    ];

    const fields = [
        {name: 'quotation', label: 'Quotation'},
        {name: 'client', label: 'Client'},
        {name: 'email', label: 'Email'},
        {name: 'start_date', label: 'Start Date'},
        {name: 'end_date', label: 'End Date'},
        {name: 'amount', label: 'Amount'},
        {name: 'status', label: 'Status'},
    ];

    const fetchInvoiceData = async () => {
        try {
            let data = [];
            if (isAuthenticated) {
                data = await fetchInvoices();
            }
            setInvoiceData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setAnimated(true);
            }, 200);
        }
    };

    const onClickCreateInvoice = (page) => {
        navigate('/invoice/new')
    };

    const onSelectPage = (page) => {
        debugger;
    };

    const onEdit = (record) => {
        navigate(`/invoice/${record.id}`)
    };

    const onSavedRecord = async () => {
        setLoading(true);
        setError(null);
        setAnimated(false);
        await fetchInvoiceData();
    };

    if (loading) {
        return <div className="d-flex h-100 justify-content-center align-items-center py-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }

    return (
        <>
            <div className={`o_Invoice container-fluid ${isAnimated ? 'zoomed-in' : ''}`}>
                <div className="row">
                    <div className="col">
                        <h5 className="fw-bold">My Invoices</h5>
                    </div>
                </div>
                <div className="row">
                    {summaries.map(item =>
                        <div className="col-lg-3 col-md-6 py-2" key={item.status}>
                            <div className="card border bg-100 h-100 p-3">
                                <div><span className={'badge ' + item.decoration}>{item.status}</span></div>
                                <span className="fs-3 fw-bold">{item.amount}</span>
                                <span className="text-500">{item.invoices} Invoices</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="row o_filter_input py-3">
                    <div className="col-lg-5 d-flex gap-3 pb-3 pb-lg-0">
                        <div className="input-group m-0">
                            <input type="text" className="form-control" placeholder="Search" aria-describedby="search_data"/>
                            <span className="btn btn-primary input-group-text" id="search_data">Search</span>
                        </div>
                    </div>
                    <div className="col d-flex gap-3">
                        <div className="btn btn-outline-primary"><i className="fa fa-filter me-2"/> Filters</div>
                        <div className="btn btn-outline-secondary"><i className="fa fa-cog me-2"/> Configurations</div>
                        <div className="btn btn-primary ms-auto" onClick={onClickCreateInvoice}><i className="fa fa-plus me-2"/> Create Invoice</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex pt-2 pb-1 gap-3 border-top">
                        <span>Show only:</span>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="filter_status" id="filter_all" value="All"/>
                            <label className="form-check-label" htmlFor="filter_all">All</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="filter_status" id="filter_paid" value="Paid"/>
                            <label className="form-check-label" htmlFor="filter_paid">Paid</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="filter_status" id="filter_unpaid" value="Unpaid"/>
                            <label className="form-check-label" htmlFor="filter_unpaid">Unpaid</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="filter_status" id="filter_pending" value="Pending"/>
                            <label className="form-check-label" htmlFor="filter_pending">Pending</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    {fields.map(f => <th className="bg-200" key={f.label}>{f.label}</th>)}
                                    <th className="bg-200">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoiceData.map(record =>
                                    <InvoiceRow record={record} fields={fields} onEdit={onEdit} key={record.id}/>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex align-content-center">
                        <div><span className="me-2">Showing</span><b className="me-2">1 - 10</b>of <b className="me-2">1000</b></div>
                        <div className="ms-auto">
                            <Pager onSelect={onSelectPage}/>
                        </div>
                    </div>
                </div>
            </div>
            {id && <InvoiceDialog itemId={id} onSaved={onSavedRecord}/>}
        </>
    );
};

export default Invoice;
