/*
This is a React component named 'PeopleTable'. It displays a table of Star Wars characters fetched from the Star Wars API. The table includes pagination and a search feature.

The component uses several hooks for state management:
- 'useState' is used to manage the current page, search term, table data, API result data, and a boolean to indicate if data fetching is required.
- 'useEffect' is used to fetch data when the page number changes and to filter the table data when the search term changes.
- 'useNavigate' from 'react-router-dom' is used to navigate to different routes.

The 'StarWarsService.getCharactersAsync' function is used to fetch the data from the API. The fetched data is stored in 'apiResultData' and 'tableData'. 

The 'handlePageChange' function is used to handle page changes in the pagination. It sets the page number and indicates that data fetching is required.

The component returns a 'Stack' component from Material UI that includes a 'TextField' for the search feature and a 'TableContainer' for the table. The table includes a 'TableHead' for the headers and a 'TableBody' for the data. Each row in the table displays the name, gender, height, and eye color of a character, and includes a 'Details' button that navigates to the '/patient' route.

The 'TablePagination' component is used for the pagination. It displays the total count of characters and allows the user to navigate through the pages.
*/


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
