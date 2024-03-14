import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import './Sidebar.css';
import axios from 'axios';

const Sidebar = () => {
    const [text, setText] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dynamicDropdowns, setDynamicDropdowns] = useState([]);
    const [formData, setFormData] = useState({ segment_name: "", dynamicDropdowns: [] })
    const handleChange = (event) => {
        const inputValue = event.target.value;
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setText(inputValue);
    };
    const handleDropChange = (event) => {
        const value = event.target.value;
        const label = value.charAt(0).toUpperCase() + value.slice(1);

        setSelectedOptions([...selectedOptions, value]);
        setLabels([...labels, label]);
    };

    const handleAddNewSchema = () => {
        const value = selectedOptions[selectedOptions.length - 1];
        const label = labels[selectedOptions.length - 1];

        const newSchema = { [value]: label };

        setFormData({ ...formData, dynamicDropdowns: [...formData.dynamicDropdowns, newSchema] });

        const newDropdown = (
            <div key={selectedOptions.length}>
                <select onChange={handleChange} value={text}>
                    <option value={value}>{label}</option>
                </select>
            </div>
        );

        setDynamicDropdowns([...dynamicDropdowns, newDropdown]);
    };
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const schema = dynamicDropdowns.map((dropdown) => {
                const value = dropdown?.props?.children?.props?.children?.props?.value;
                const label = dropdown?.props?.children?.props?.children?.props?.children;
                return { [value]: label };
            });

            const formDatas = {
                segment_name: formData.segment_name,
                schema: schema
            };

            const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, formDatas);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Grid item md={12} sm={12} lg={12} xs={12} className="sidebar">
            <Grid className="heading" item md={12} sm={12} lg={12} xs={12}>Saving Segment</Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
                <Typography className='sidebar-text'>Enter the Name of the Segment</Typography>
                <input type="text" name="segment_name" onChange={handleChange} value={formData.segment_name} />
            </Grid>
            <Grid item md={12} sm={12} lg={12} xs={12}>
                <Typography className='sidebar-text'>
                    To Save Your Segment, you need to add the schemas to build the query
                </Typography>
            </Grid>
            <Grid container item md={12} sm={12} lg={12} xs={12} display={"flex"} justifyContent={"end"}>
                <Grid item md={!2} display={"inline-flex"} pr={2}>
                    <Grid item className='dots' m="auto"></Grid>
                    <Grid item>
                        <Typography className='sidebar-user'>- User Traits</Typography>
                    </Grid>
                </Grid>
                <Grid item md={!2} display={"inline-flex"}>
                    <Grid item className='dots-1' m="auto"></Grid>
                    <Grid item>
                        <Typography className='sidebar-user'>- Group Traits</Typography>
                    </Grid>
                </Grid>
                <Grid container item md={!2} id="dynamicDropdownContainer" className="dropValues">
                    {selectedOptions.length > 0 && dynamicDropdowns}
                </Grid>
                <Grid item md={!2} lg={12} sm={12} xs={12}>
                    <select onChange={handleDropChange}>
                        <option value="">--Add Schema to segment--</option>
                        <option value="first_name" name="first_name">First Name</option>
                        <option value="last_name" name="last_name">Last Name</option>
                        <option value="gender" name="gender">Gender</option>
                        <option value="age" name="age">Age</option>
                        <option value="account_name" name="account_name">Account Name</option>
                        <option value="city" name="city">City</option>
                        <option value="state" name="state">State</option>
                    </select>
                </Grid>
                <Grid container pt={2} item md={!2} lg={12} sm={12} xs={12}>
                    <Typography className='addSchema' onClick={handleAddNewSchema}>+ Add New Schema</Typography>
                </Grid>
                <Grid container item md={!2} lg={12} sm={12} xs={12} display={"flex"} justifyContent={"left"} pt={5} className='buttonFoot'>
                    <Grid >
                        <button className='btnSge' onClick={handleClick} >
                            Save Segment
                        </button>
                    </Grid>
                    <Grid pl={2}>
                        <button className='cancel'>
                            Cancel
                        </button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default Sidebar;