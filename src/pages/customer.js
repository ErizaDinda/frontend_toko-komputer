import React from "react";
import axios from "axios";
import CustomerList from "../component/customerList";
import Navbar from "../component/navbar";
import { Modal, Form, Button } from "react-bootstrap";

export default class Customer extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      isModalOpen: false,
      nama: "",
      phone: "",
      address: "",
      username: "",
      image: null,
      password: "",
      action: "insert",
    };
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/login";
    }
  }
  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama: "",
      phone: "",
      address: "",
      username: "",
      password: "",
      image: null,
      action: "insert",
    });
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      customer_id: selectedItem.customer_id,
      name: selectedItem.name,
      phone: selectedItem.phone,
      address: selectedItem.address,
      image: null,
      username: selectedItem.username,
      password: "",
      action: "update",
    });
  };

handleDrop = (customer_id) => {
  let url = "http://localhost:8080/customer/" + customer_id;

  if (window.confirm("Apakah kamu yakin menghapus data ini?")) {
    axios
      .delete(url)
      .then((res) => {
        console.log(res.data.message);
        this.getCustomer();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

 
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleSave = (e) => {
    e.preventDefault()
    let form = new FormData()
    form.append("name",this.state.name)
    form.append("phone",this.state.phone)
    form.append("address",this.state.address)
    form.append("username",this.state.username)
    form.append("password",this.state.password)
    form.append("image",this.state.image)
    
    let url = ""

    if (this.state.action === "insert") {
        url = "http://localhost:8080/customer"

        axios.post(url, form)
        .then(res => {
            this.getCustomer()
           this.handleClose()
        })
        .catch(err => {
           console.log(err.message)
        })
    }
    else if (this.state.action === "update"){
        url = "http://localhost:8080/customer/" + this.state.customer_id

        axios.put(url, form)
        .then(res => {
            this.getCustomer()
           this.handleClose()
        })
        .catch(err => {
           console.log(err.message)
        })
    }

}

  getCustomer = () => {
    let url = "http://localhost:8080/customer/";

    axios
      .get(url)
      .then((res) => {
        this.setState({
          customers: res.data.customer,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidMount = () => {
    this.getCustomer();
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-sm">
        <div className="mb-4 mt-4">
          <h4>Customer Data</h4>
        </div>
        <div className="row">
          {this.state.customers.map((item, index) => {
            return (
              <CustomerList
                key={index}
                nameImage={item.image}
                image={"http://localhost:8080/image/customer/" + item.image}
                name={item.name}
                phone={item.phone}
                address={item.address}
                onEdit={() => this.handleEdit(item)}
                onDrop={() => this.handleDrop(item.customer_id)}
              />
            );
          })}
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Customer</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Enter Phone" value={this.state.phone} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" placeholder="Enter Image" onChange={this.handleFile} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <br />
        <br />
        <button className="btn btn-primary" onClick={() => this.handleAdd()}>
          Tambah Customer
        </button>
        </div>
        
      </div>
    );
  }
}