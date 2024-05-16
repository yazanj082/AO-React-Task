import { Link, Stack, Typography } from "@mui/material";

import styles from './PeopleList.module.css'

const PeopleList = () => {
    return (
        <Stack className={`${styles.peopleList} card`}>
            <Typography className={styles.peopleListHeader}>
                This page contains the table that represent the names of starwars characters.
                The data of the table are retrived using from star war API <Link href="https://swapi.dev/api/people/">Api</Link>.
                You can check the git repo <Link href="https://github.com/yazanj082/AO-React-Task">AO-React-Task</Link> for source code.
            </Typography>

        </Stack>
    )
}

export default PeopleList;