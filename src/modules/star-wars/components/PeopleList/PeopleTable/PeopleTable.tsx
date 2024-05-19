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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Stack, Button } from '@mui/material';

import PeopleTableSkeleton from '../PeopleTableSkeleton';
import StarWarsService from '../../../services/star-wars-service';
import StarWarsCharacter from '../../../interfaces/star-wars-character';
import StarWarsApiResult from '../../../interfaces/star-wars-api-result';

const PeopleTable = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFullSearch, setIsFullSearch] = useState(false);
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
        if (searchTerm == '')
            setIsFullSearch(false);
    }, [apiResultData?.results, searchTerm])

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage + 1)
        setRequireFetchData(true);

    }

    const handleFullSearch = async () => {
        if (isFullSearch) {
            setSearchTerm('');
            if (apiResultData != null) {
                setTableData(apiResultData.results);
            }
            setIsFullSearch(false);
        } else {
            setRequireFetchData(true);
            setIsFullSearch(true);

            let page = 1;
            let responseData: StarWarsApiResult;
            const tableData: StarWarsCharacter[] = [];

            try {
                do {
                    const response = await StarWarsService.getCharactersAsync(page);
                    responseData = response.data;
                    const filteredResults = responseData.results.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()));
                    tableData.push(...filteredResults);
                    page += 1;
                } while (responseData.next != null);

                setTableData(tableData);
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setRequireFetchData(false);
            }
        }
    };


    return (
        <Stack spacing={2}>
            <Stack direction={'row'}>
                <TextField
                    label="Search (name, gender, height, eye color)"
                    value={searchTerm}
                    onChange={(event) => { setSearchTerm(event.target.value) }}
                    variant="outlined"
                    fullWidth={true}
                />
                <Button disabled={requireFetchData} onClick={handleFullSearch}>{isFullSearch ? "Cancel" : "Full Search Name"}</Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="dessert table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Height</TableCell>
                            <TableCell align="center">Eye Color</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {apiResultData && !requireFetchData ?
                            tableData?.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="center">{row.gender}</TableCell>
                                    <TableCell align="center">{row.height}</TableCell>
                                    <TableCell align="center">{row.eye_color}</TableCell>
                                    <TableCell align="center">
                                        <Button color='primary' onClick={() => { navigate('/patient') }}>Details</Button>
                                    </TableCell>
                                </TableRow>
                            )) :
                            <PeopleTableSkeleton numberOfRows={10} />
                        }
                    </TableBody>



                </Table>

                <TablePagination
                    component="div"
                    count={tableData?.length == apiResultData?.results.length ? apiResultData?.count ?? 0 : 0}
                    rowsPerPage={tableData ? tableData.length : 10}
                    page={page - 1}
                    rowsPerPageOptions={[]}
                    onPageChange={handlePageChange}
                    disabled={requireFetchData || searchTerm !== ''}
                />
            </TableContainer>
        </Stack>
    );
};

export default PeopleTable;
