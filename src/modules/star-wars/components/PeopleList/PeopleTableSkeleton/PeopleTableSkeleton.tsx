import { Skeleton, TableCell, TableRow } from "@mui/material";


interface IPeopleTableSkeletonProps {
    numberOfRows: number
}

const PeopleTableSkeleton = ({ numberOfRows }: IPeopleTableSkeletonProps) => {
    return (
        <>
            {Array(numberOfRows).fill(null).map((_row, index) => (
                <TableRow key={index} >
                    <TableCell component="th" scope="row"><Skeleton height={25} /></TableCell>
                    <TableCell align="center"> <Skeleton height={25} /></TableCell>
                    <TableCell align="center"> <Skeleton height={25} /></TableCell>
                    <TableCell align="center"> <Skeleton height={25} /> </TableCell>
                    <TableCell align="center"> <Skeleton height={25} /> </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default PeopleTableSkeleton;