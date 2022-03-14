import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function QuestionForm() {
  const questionSchma = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: ''
    },
    validationSchema: questionSchma,
    onSubmit: (data) => {
      console.log('working', data);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Question here"
            {...getFieldProps('firstName')}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <Typography variant="h6" color="textPrimary">
            Preferred Answer field
          </Typography>
          <Stack direction="row" spacing={1} sx={{ width: '60%' }}>
            <Box>
              <img src="/static/qus-type1.png" alt="question type img" />
            </Box>
            <Box>
              <img src="/static/mcq.png" alt="question type img" />
            </Box>
          </Stack>
          {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}
          <Stack sx={{ width: '30%' }} justifyContent="end" direction="row">
            <LoadingButton
              fullWidth
              sx={{ width: '20%' }}
              size="sm"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              save
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
