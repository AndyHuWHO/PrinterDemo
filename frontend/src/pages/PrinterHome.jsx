import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import PrinterPopover from "../components/PrinterPopover";

const PrinterHome = () => {
    const [printerData, setPrinterData] = useState([]);
    const [selectedPrinter, setSelectedPrinter] = useState({
        id: null,
        filament_total: null,
        filament_curr: null
    });
    const [openPopover, setOpenPopover] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchPrinterData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/all');
            setPrinterData(response.data);
        } catch (error) {
            console.error('Error fetching printer data:', error);
        }
    };

    useEffect(() => {
        fetchPrinterData();
    }, [openPopover]);

    const handlePrinterCardClick = (printer) => (event) => { // Modify the function to accept the printer first
        setSelectedPrinter(printer);
        setAnchorEl(event.currentTarget);
        setOpenPopover(true);
    };


    return (
        <div className="h-screen p-4">
            <Grid container spacing={3}>
                {printerData.map((printer) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={printer.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Printer ID: {printer.id}
                                </Typography>
                                <Button
                                    color="primary"
                                    onClick={handlePrinterCardClick(printer)}
                                    style={{ marginTop: '10px' }}
                                >
                                    View/Update Printer
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <PrinterPopover
                openPopover = {openPopover}
                anchorEl={anchorEl}
                setAnchorEl = {setAnchorEl}
                setOpenPopover = {setOpenPopover}
                setSelectedPrinter = {setSelectedPrinter}
                selectedPrinter={selectedPrinter}
                 >
            </ PrinterPopover>
        </div>
    );
};

export default PrinterHome;



