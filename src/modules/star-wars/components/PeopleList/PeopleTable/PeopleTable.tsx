import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Skeleton, TextField, Stack, Button } from '@mui/material';

import StarWarsService from '../../../services/star-wars-service';
import StarWarsCharacter from '../../../interfaces/star-wars-character';
import StarWarsApiResult from '../../../interfaces/star-wars-api-result';

import styles from './PeopleTable.module.css';


const PeopleTable = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [tableData, setTableData] = useState<StarWarsCharacter[] | null>(null);
    const [apiResultData, setApiResultData] = useState<StarWarsApiResult | null>(null);
    const [requireFetchData, setRequireFetchData] = useState(true);

    useEffect(() => {
        StarWarsService.getCharactersAsync(page).then((response) => {
            setApiResultData(response.data);
            setTableData(response.data.results);
            setRequireFetchData(false);
        });
    }, [page]);

    useEffect(() => {
        const tempArray = apiResultData?.results.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x.gender.includes(searchTerm) || x.height.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x.eye_color.toLowerCase().includes(searchTerm.toLowerCase()))
        setTableData(tempArray ?? [])
    }, [apiResultData?.results, searchTerm])

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        if (!requireFetchData) {
            setPage(newPage + 1)
            setRequireFetchData(true);
        }
    }

    return (
        <Stack spacing={2}>
            <TextField
                label="Search"
                value={searchTerm}
                onChange={(event) => { setSearchTerm(event.target.value) }}
                variant="outlined"
            />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="dessert table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.tableHeaderCell}>Name</TableCell>
                            <TableCell className={styles.tableHeaderCell} align="center">Gender</TableCell>
                            <TableCell className={styles.tableHeaderCell} align="center">Height</TableCell>
                            <TableCell className={styles.tableHeaderCell} align="center">Eye Color</TableCell>
                            <TableCell className={styles.tableHeaderCell} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData && tableData.map((row) => (
                            <TableRow key={row.name} className={styles.tableRow}>
                                <TableCell className={styles.tableBodyCell} component="th" scope="row">
                                    {requireFetchData ? (<Skeleton height={20} />) : row.name}
                                </TableCell>
                                <TableCell className={styles.tableBodyCell} align="center"> {requireFetchData ? (<Skeleton height={20} />) : row.gender}</TableCell>
                                <TableCell className={styles.tableBodyCell} align="center"> {requireFetchData ? (<Skeleton height={20} />) : row.height}</TableCell>
                                <TableCell className={styles.tableBodyCell} align="center"> {requireFetchData ? (<Skeleton height={20} />) : row.eye_color}</TableCell>
                                <TableCell className={styles.tableBodyCell} align="center"> {requireFetchData ? (<Skeleton height={20} />) :
                                    (<Button color='primary' onClick={() => { navigate('/patient') }}>Details</Button>)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={tableData?.length == apiResultData?.results.length ? apiResultData?.count ?? 0 : 0}
                    rowsPerPage={10}
                    page={page - 1}
                    rowsPerPageOptions={[]}
                    onPageChange={handlePageChange}
                />
            </TableContainer>
        </Stack>
    );
};

export default PeopleTable;
