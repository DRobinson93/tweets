import React, {useState} from 'react';

const InlineTxtAreaAndSubmitBtn = props => {
    const [value, setValue] = useState('');

    React.useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className="form-row w-100">
            <label className="col-10 col-md-11 mb-0 pr-0">
                    <textarea onChange={handleChange} className="form-control w-100"
                              rows="1"
                              value={value}
                              data-testid={props.testIds.input} placeholder={props.placeholder}/>
            </label>
            <div className="col-2 col-md-1 px-0">
                <button onClick={() => props.handleSubmit(value)} type="button"
                        className="btn btn-primary rounded"
                        data-testid={props.testIds.btn}>
                    {props.btnTxt}
                </button>
            </div>
        </div>
    );
};
export default InlineTxtAreaAndSubmitBtn;
