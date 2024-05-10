import { Typography, Grid } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import AppCheckbox from '../../app/components/AppCheckBox';

export default function AddressForm() {
    const { control, formState } = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Địa điểm giao hàng
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='fullName' label='Tên đầy đủ' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='address1' label='Địa chỉ 1' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='address2' label='Địa chỉ 2' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='city' label='Thành phố' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='state' label='State' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='zip' label='số nhà' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='country' label='Nước' />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <AppCheckbox 
                    disabled={!formState.isDirty}
                    name='saveAddress' 
                    label='Lưu thành địa chỉ mặc định' 
                    control={control} 
                />
            </Grid>
        </>
    );
}