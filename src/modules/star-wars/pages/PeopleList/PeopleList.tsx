import { Link, Stack, Typography } from "@mui/material";

import PeopleTable from "../../components/PeopleList/PeopleTable";

import styles from './PeopleList.module.css'

const PeopleList = () => {
    return (
        <Stack className={`${styles.peopleList} card`} spacing={10}>
            <Typography className={styles.peopleListHeader}>
                This page contains the table that represent the names of starwars characters.
                The data of the table are retrived using from star war API <Link href="https://swapi.dev/">Api</Link>.
                You can check the git repo <Link href="https://github.com/yazanj082/AO-React-Task">AO-React-Task</Link> for source code.
            </Typography>
            <PeopleTable />
        </Stack>
    )
}

export default PeopleList;