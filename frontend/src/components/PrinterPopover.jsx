import React, {useEffect, useState} from 'react';
import {Button, Popover} from '@mui/material';
import TopBar from "./TopBar";
import FilamentDetail from "./FilamentDetail";

const PrinterPopover = ({selectedPrinter, anchorEl, setAnchorEl, openPopover, setOpenPopover}) => {

    const [filamentRemaining, setFilamentRemaining] = useState(selectedPrinter.filament_curr);
    const [filamentTotal, setFilamentTotal] = useState(selectedPrinter.filament_total);
    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpenPopover(false);
    };
    const fetchPrinterData = () => {
        setFilamentTotal(selectedPrinter.filament_total);
        setFilamentRemaining(selectedPrinter.filament_curr);
    }
    useEffect(() => {
        fetchPrinterData();
    }, [openPopover]);

    return (
        <Popover
            open={openPopover}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            slotProps={{
                paper: {
                    style: {
                        maxWidth: '500px',
                        minWidth: '500px',
                        maxHeight: '400px',
                        minHeight: '300px',
                    },
                },
            }}
        >
            <div className="rounded-lg">
                <TopBar selectedPrinter={selectedPrinter}
                        filamentTotal={filamentTotal}
                        setFilamentTotal={setFilamentTotal}
                        filamentRemaining={filamentRemaining}
                        setFilamentRemaining={setFilamentRemaining}
                        openPopover={openPopover}
                        setOpenPopover={setOpenPopover}
                ></TopBar>
                <FilamentDetail selectedPrinter={selectedPrinter}
                                handlePoverClose={handlePopoverClose}
                                filamentTotal={filamentTotal}
                                setFilamentTotal={setFilamentTotal}
                                filamentRemaining={filamentRemaining}
                                setFilamentRemaining={setFilamentRemaining}
                                openPopover={openPopover}
                                setOpenPopover={setOpenPopover}>

                </FilamentDetail>
            </div>
        </Popover>
    );
};

export default PrinterPopover;





