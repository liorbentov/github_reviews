import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
    isLoading: boolean;
    text: string;
    onClick(): void;
    className?: string;
    disabled?: boolean;
}

const InteractiveButton: React.FC<Props> = (props: Props) => {
    if (props.isLoading) {
        return (
            <Button disabled={true} className={props.className}>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mx-1"
                />
                Loading..
            </Button>
        );
    }

    return <Button disabled={props.disabled} className={props.className} onClick={props.onClick}>{props.text}</Button>
};

export default InteractiveButton;