import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material"

import styles from './PatientForm.module.css'

type Inputs = {
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
    disorder: string[]
    workspace: (string | null)[]
}

const disorders = ['PD', 'ET', 'Dyst_NG', 'OCD', 'Tourette', 'Epilepsy', 'Other'];

const workspaces = ['Work1', 'Work2', 'Work3'];

const getMinYear = () => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setFullYear(currentDate.getFullYear() - 100);
    return pastDate;
}

const PatientForm = () => {
    const {
        register, reset, getValues, setValue, handleSubmit, control, formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            workspace: [null],
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        alert(JSON.stringify(data))
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} >
            <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item md={3} xs={12}>
                    <TextField
                        label={<Typography component="span">First Name <Typography component="span" className={styles.requiredField}>*</Typography></Typography>}
                        variant="outlined"
                        type="First Name"
                        helperText={errors.firstName ? errors.firstName.message : ""}
                        {...register("firstName", {
                            required: "This field is required", pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "Alphabetic characters only"
                            }
                        })}
                        error={errors.firstName != null}
                        fullWidth

                    />
                </Grid>

                <Grid item md={3} xs={12}>
                    <TextField
                        label={<Typography component="span">Last Name<Typography component="span" className={styles.requiredField}>*</Typography></Typography>}
                        variant="outlined"
                        type="Last Name"
                        helperText={errors.lastName ? errors.lastName.message : ""}
                        {...register("lastName", {
                            required: "This field is required", pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "Alphabetic characters only"
                            }
                        })}
                        error={errors.lastName != null}
                        fullWidth
                    />
                </Grid>

                <Grid item md={6} xs={0} />

                <Grid item xs={2} >
                    <FormLabel id="demo-radio-buttons-group-label">Gender <Typography component="span" className={styles.requiredField}>*</Typography></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                    >
                        <Stack direction={'row'}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" {...register('gender', { required: 'choose a gender' })} />
                            <FormControlLabel value="male" control={<Radio />} label="Male" {...register('gender', { required: 'choose a gender' })} />
                        </Stack>
                    </RadioGroup>
                    {errors.gender != null ? <Typography className={styles.errorMsg}>{errors.gender.message}</Typography> : ''}
                </Grid>

                <Grid item xs={10} />

                <Grid item md={3} xs={12}>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        rules={{
                            required: 'Date is required', validate: value => {
                                try {
                                    const selectedDate = new Date(value);
                                    if (isNaN(selectedDate.getTime())) {
                                        return 'Selected date is not valid';
                                    }
                                    const minDate = getMinYear();
                                    const maxDate = new Date(Date.now());
                                    if (selectedDate.getFullYear() < minDate.getFullYear() || selectedDate.getFullYear() > maxDate.getFullYear()) {
                                        return 'Selected date is out of range';
                                    }
                                } catch {
                                    return 'Selected date is out of range';
                                }
                            }
                        }}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <FormControl fullWidth >
                                    <InputLabel shrink focused={false}>
                                        <Typography component="span">Workspace template <Typography component="span" className={styles.requiredField}>*</Typography></Typography>
                                    </InputLabel>
                                    <DatePicker
                                        maxDate={dayjs(Date.now())}
                                        minDate={dayjs(getMinYear())}
                                        onChange={date => field.onChange(date)}
                                        className={`${styles.dataPicker} ${field.value ? styles.notEmpty : ''} 
                            ${errors.dateOfBirth ? styles.errorDate : ''}`}
                                    />
                                </FormControl>
                            </LocalizationProvider>)} />
                    {errors.dateOfBirth != null ? <Typography className={styles.errorMsg}>{errors.dateOfBirth.message}</Typography> : ''}
                </Grid>

                <Grid item md={9} xs={0} />

                <Grid item xs={12}>
                    <Stack >
                        <FormLabel id="demo-radio-buttons-group-label">Disorder <Typography component="span" className={styles.requiredField}>*</Typography></FormLabel>
                        <Box className={styles.checkBoxGroup}>
                            {disorders.map((value) => (
                                <Controller
                                    name="disorder"
                                    control={control}
                                    defaultValue={[]}

                                    rules={{ validate: (value) => value.length > 0 || 'At least one checkbox must be selected' }}
                                    render={({ field }) => (
                                        <FormControlLabel className={styles.inputBox}
                                            control={<Checkbox {...field} checked={field.value.includes(value)} onChange={(e) => {
                                                const newValue = e.target.checked ? [...field.value, value] : field.value.filter(v => v !== value);
                                                field.onChange(newValue);
                                            }} />}
                                            label={<Box className={styles.inputBoxLabel}>{value}</Box>}
                                        />
                                    )}
                                />
                            ))}
                        </Box>
                        {errors.disorder != null ? <Typography className={styles.errorMsg}>{errors.disorder.message}</Typography> : ''}
                    </Stack>
                </Grid>

                <Grid md={3.5} xs={12}>
                    <Stack className={styles.workspaceDropDown}>
                        <Controller
                            rules={{ validate: (value) => (value.filter(x => x === null).length == 0) || 'All WorkSpaces must be filled' }}
                            render={({ field }) => (<Stack spacing={2}>{
                                field.value.map((_value, index) => (
                                    <FormControl fullWidth>
                                        <InputLabel>
                                            <Typography component="span">Workspace template <Typography component="span" className={styles.requiredField}>*</Typography></Typography>
                                        </InputLabel>
                                        <Select{...field}
                                            label={<Typography component="span">Worspace template <Typography component="span" className={styles.requiredField}>*</Typography></Typography>}
                                            value={field.value[index]}
                                            onChange={(e) => {
                                                const tmpArr = (field.value)
                                                tmpArr[index] = e.target.value ? e.target.value.toString() : ''
                                                field.onChange(tmpArr);
                                            }}>{workspaces.map((value) => (<MenuItem value={value}>{value}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                ))
                            }</Stack>)}
                            name="workspace"
                            control={control}
                            defaultValue={[]}
                        />
                        {errors.workspace != null ? <Typography className={styles.errorMsg}>{errors.workspace.message}</Typography> : ''}
                    </Stack>
                </Grid>
                <Grid item md={1} xs={6} className={styles.addWorkspaceButton}>
                    <Button color='info' fullWidth={true}
                        onClick={() => { setValue('workspace', [...getValues('workspace'), null]) }} >add Workspace</Button>
                </Grid>
                <Grid item md={7.5} xs={0} />

                <Grid item md={1} xs={6}>
                    <Button color='primary' variant="contained" fullWidth={true} type="submit">Save</Button>
                </Grid>

                <Grid item md={1} xs={6}>
                    <Button color='secondary' variant="contained" fullWidth={true} onClick={() => { reset() }}>Cancel</Button>
                </Grid>

            </Grid>
        </Box>
    )
}

export default PatientForm