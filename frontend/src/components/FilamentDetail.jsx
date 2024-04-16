import React, {useState} from 'react';
import axios from 'axios';
import {
    Button, Chip, IconButton,
    InputAdornment,
    OutlinedInput,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {PieChart} from '@mui/x-charts/PieChart';
import {blue, grey} from "@mui/material/colors";

const FilamentDetail = ({selectedPrinter,
                            filamentRemaining,
                            setFilamentRemaining,
                            filamentTotal,
                            setFilamentTotal,
                        openPopover,
                        setOpenPopover}) => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [showSave, setShowSave] = useState(false);

    const filamentData = [
        {value: filamentTotal - filamentRemaining, color: grey[800]},
        {value: filamentRemaining, color: blue[400]}]

    const handleRefill = (amount) => {
        setSelectedAmount(amount);
        setFilamentTotal(amount);
        setFilamentRemaining(amount);
        setShowSave(true);
    };

    const handleRemainingChange = (event) => {
        setFilamentRemaining(Number(event.target.value));
        setShowSave(true);
    }

    const handleKeyDown = (event) => {
        // Allow only numbers, backspace, tab, escape, enter
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' &&
            event.key !== 'Tab' && event.key !== 'Escape' && event.key !== 'Enter') {
            event.preventDefault();
        }
    };

    // close popover after saving
    const handleSave = async () => {
        const updatePrinter = {
            "id": selectedPrinter.id,
            "filament_total": filamentTotal,
            "filament_curr": filamentRemaining
        }
        try {
            const response =
                await axios.put(`http://localhost:8080/printers/${selectedPrinter.id}`, updatePrinter);
            console.log('Update successful:', response.data);
        } catch (error) {
            console.error('Error updating printer data:', error);
        }
        setOpenPopover(false);
    }

    return (
        <div className="flex flex-col p-4 border-gray-400">
            <div className="flex flex-row p-4 border-gray-400">
                <PieChart
                    series={[
                        {
                            data: filamentData,
                            innerRadius: 15,
                            outerRadius: 35,
                            cx: 30,
                            cy: 30
                        }
                    ]}
                    height={100}
                    width={100}
                />
                <div className="filament_remaining space-y-2">
                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>Filament Remaining</Typography>

                    <div className="change_filament flex flex-row items-center">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            sx={{
                                width: 100,
                                height: 40,
                            }}
                            value={filamentRemaining}
                            endAdornment={<InputAdornment position="end">g</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'max': {filamentTotal},
                            }}
                            onKeyDown={handleKeyDown}
                            onChange={handleRemainingChange}
                        />
                        <div className="flex items-center bg-gray-200 p-1 m-2 rounded space-x-2">
                            <Chip
                                label="Purple"
                                style={{backgroundColor: 'purple', fontWeight: 'bold', color: 'white'}}
                            />

                            <Chip
                                label="PLA"
                                variant="outlined"
                                style={{backgroundColor: 'black', fontWeight: 'bold', color: 'white'}}
                            />
                            <IconButton aria-label="edit">
                                <EditIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex space-x-2 items-center">
                <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>Refill</Typography>
                {[750, 1000, 5000, 10000].map((amount) => (
                    <Button
                        key={amount}
                        onClick={() => handleRefill(amount)}
                        style={{
                            fontWeight: 'bold',
                            backgroundColor: selectedAmount === amount ? 'black' : 'lightgrey',
                            color: selectedAmount === amount ? 'white' : 'black',
                        }}
                    >
                        {amount / 1000}kg
                    </Button>
                ))}
            </div>
            {showSave && (
                <Button
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    color="secondary"
                    onClick={handleSave}
                    style={{backgroundColor: blue[100], color: blue[900], marginTop: '1rem', paddingTop: '1rem'}}
                >
                    Save Changes
                </Button>
            )}
        </div>

    );
};

export default FilamentDetail;