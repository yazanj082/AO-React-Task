import { Box, Link, Stack, Typography } from "@mui/material"

import PatientForm from "../../components/AddPatient/PatientForm"

import styles from "./AddPatient.module.css"

const AddPatient = () => {
    return (
        <Stack className={`${styles.aadPatient} card`} spacing={10}>
            <Box>
                <Typography variant="h3" >
                    Add a patient
                </Typography>
                <Typography className={styles.peopleListHeader}>
                    This page contains a form to add a patient.
                    You can check the git repo <Link href="https://github.com/yazanj082/AO-React-Task">AO-React-Task</Link> for source code.
                </Typography>
            </Box>
            <PatientForm />
        </Stack>
    )
}

export default AddPatient