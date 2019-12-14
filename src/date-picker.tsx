import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Moment from "moment";

type Props = {
    startDate: string;
    onChange(newDate: string): void;
}

export const convertDate = (momentDate: Moment.Moment) => momentDate.format('YYYY-MM-DD');

const DatePicker: React.FC<Props> = ({startDate, onChange}) => {

    const maxDate = convertDate(Moment());
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="date-picker">
            <h4>Start Date:</h4>
            <FormControl value={startDate} onChange={handleChangeDate} max={maxDate} type="date"/>
        </div>
    )
};

export default DatePicker;