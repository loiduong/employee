import React, {memo} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
});
const circularProgress = makeStyles((them) => ({
    svg: {
        width: 25,
        height: 25,
    },
    colorPrimary: {
        color: '#ffffff'
    },
  
}));


const ButtonCpn = memo(({ type, variant, color, title, hasLink, onClick, isLoading }) => {
    const cssCircular = circularProgress();
    if (isLoading) return (
        <Button type={type || 'button'} variant={variant || 'contained'} color={color || 'primary'} onClick={onClick}>
            <CircularProgress style={{width: 25, height: 25}} classes={cssCircular} />
        </Button>
    )
    return (
        <Button type={type || 'button'} variant={variant || 'contained'} color={color || 'primary'} onClick={onClick}>
            {hasLink || title}
        </Button>
    )
})

export default ButtonCpn