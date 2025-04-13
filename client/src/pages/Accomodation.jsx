import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

const AccomodationForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/accomodation', data);
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            alert('Message not delivered');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Book Your Accommodation
                </Typography>
                <h5>Fill in details to request accomodation</h5>
                <br></br>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
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
                                name="city"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'City is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="City" 
                                        fullWidth 
                                        variant="outlined" 
                                        error={!!errors.city}
                                        helperText={errors.city ? errors.city.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="fromDate"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'From date is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        placeholder="From Date" 
                                        type="date" 
                                        fullWidth 
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined" 
                                        error={!!errors.fromDate}
                                        helperText={errors.fromDate ? errors.fromDate.message : ''}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="toDate"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'To date is required' }}
                                render={({ field }) => 
                                    <TextField 
                                        {...field} 
                                        label="To Date" 
                                        type="date" 
                                        fullWidth 
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined" 
                                        error={!!errors.toDate}
                                        helperText={errors.toDate ? errors.toDate.message : ''}
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

export default AccomodationForm;
