import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"

import styles from './PatientForm.module.css'

type Inputs = {
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
}

const PatientForm = () => {
    const {
        register, reset, handleSubmit, control, formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            gender: '',
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        alert(JSON.stringify(data))
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} >
            <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={3}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        type="First Name"
                        helperText={errors.firstName ? "Enter Aphapatic char" : ""}
                        {...register("firstName", { required: true })}
                        error={errors.firstName != null}
                        fullWidth

                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        type="Last Name"
                        helperText={errors.lastName ? "Enter Aphapatic char" : ""}
                        {...register("lastName", { required: true })}
                        error={errors.lastName != null}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={6} />

                <Grid item xs={2}>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""

                    >
                        <Stack direction={'row'}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" {...register('gender', { required: true })} />
                            <FormControlLabel value="male" control={<Radio />} label="Male" {...register('gender', { required: true })} />
                        </Stack>
                    </RadioGroup>
                    {errors.gender != null ? <Typography className={styles.errorMsg}>choose a gender</Typography> : ''}
                </Grid>

                <Grid item xs={10} />

                <Grid item xs={3}>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        rules={{ required: 'Date is required' }}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={'MM/DD/YYYY'}
                                    maxDate={dayjs(Date.now())}
                                    minDate={dayjs('1900-01-01')}
                                    onChange={date => field.onChange(date)}
                                    className={`${styles.dataPicker} ${field.value ? styles.notEmpty : ''} 
                            ${errors.dateOfBirth ? styles.errorDate : ''}`}
                                />
                            </LocalizationProvider>)} />
                    {errors.dateOfBirth != null ? <Typography className={styles.errorMsg}>Date is required</Typography> : ''}
                </Grid>

                <Grid item xs={9} />

                <Grid item xs={1}>
                    <Button color='primary' fullWidth={true} type="submit">Save</Button>
                </Grid>

                <Grid item xs={1}>
                    <Button color='secondary' fullWidth={true} onClick={() => { reset() }}>Cancel</Button>
                </Grid>

            </Grid>
        </Box>
    )
}

export default PatientForm