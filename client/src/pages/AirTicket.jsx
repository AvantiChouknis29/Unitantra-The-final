import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import './AuxServices.css'
const AirTicketForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/airticket', data);
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            alert('Message not delivered');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Flight Ticket ✈️
                </Typography>
                <br></br>
                <h5>Fill in Details to request a flight Ticket</h5>
                <br></br>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Username is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="Username" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.username}
                                        helperText={errors.username ? errors.username.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ 
                                    required: 'Email is required', 
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email address'
                                    }
                                }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="Email" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Phone number is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="Phone Number" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.phone}
                                        helperText={errors.phone ? errors.phone.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="country"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Country is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="Country" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.country}
                                        helperText={errors.country ? errors.country.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="from"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'From location is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="From" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.from}
                                        helperText={errors.from ? errors.from.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="to"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'To location is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="To" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.to}
                                        helperText={errors.to ? errors.to.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Date is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        label="Date" 
                                        type="date" 
                                        fullWidth 
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined" 
                                        error={!!errors.date}
                                        helperText={errors.date ? errors.date.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default AirTicketForm;
