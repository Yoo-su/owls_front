import { Fragment } from "react"
import Pagination from '@mui/material/Pagination';

interface Props {
    pageCount: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
    currentPage: number;
}
const Paginator = ({
    pageCount, onPageChange, currentPage,
}: Props) => {

    return (
        <Fragment>
            <Pagination
                count={pageCount}
                onChange={onPageChange}
                page={currentPage}
                color="primary"
                showFirstButton
                showLastButton

            />
        </Fragment>
    );
};

export default Paginator;