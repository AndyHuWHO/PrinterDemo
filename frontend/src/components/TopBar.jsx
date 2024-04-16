import React from 'react';
import {IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const TopBar = ({ selectedPrinter,filamentTotal,filamentRemaining, openPopover,setOpenPopover }) => {
        const handleClose = () => {
        setOpenPopover(false);
    };
    return (
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-400 w-full">
            <Typography variant="h6" style={{ fontWeight: 'bold'}}>
                Filament Quick Controls
            </Typography>
            <Typography variant="h6">
                {filamentRemaining}g / {filamentTotal}g
            </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </div>
    );
};

export default TopBar;

