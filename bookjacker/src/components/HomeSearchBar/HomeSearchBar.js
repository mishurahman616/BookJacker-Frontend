import React, { Component, Fragment } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
class Homesearchbar extends Component {

    triggerSearch=(event)=>{
        this.props.parentCallback(event.target.searchName.value);
        event.preventDefault();
    }
    render() {
        return (
            <Fragment>
                <Form className="d-flex topSearchBar" onSubmit={this.triggerSearch}>
                    <FormControl
                        type="search"
                        name="searchName"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        
                    />
                    <Button variant="warning" type="submit">Search</Button>
                </Form>

            </Fragment>
        );
    }
}

export default Homesearchbar;
