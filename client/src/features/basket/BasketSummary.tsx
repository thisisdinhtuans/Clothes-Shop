import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { currencyFormat } from '../../app/util/util';
import { useAppSelector } from '../../app/store/configureStore';

interface Props {
    subtotal?: number;
}

export default function BasketSummary({subtotal}: Props) {
    const { basket } = useAppSelector(state=>state.basket);
    if (subtotal === undefined) 
        subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 1000000 ? 0 : 35000;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Gía sản phẩm</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Phí vận chuyển*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Tổng tiền</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Đơn hàng trên 1.000.000đ được miễn phí vận chuyển</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}