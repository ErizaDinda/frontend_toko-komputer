import React from "react";
import '../style/home.css';
import Navbar from "../component/navbar";
// import Sidebar from "../components/sidebar";
import { FaUserAlt, FaProductHunt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { CgUserlane } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import axios from "axios";
export default class Home extends React.Component {
    constructor() {
        super() 
        this.state = {
            token: '',
            adminName: '',
            adminCount: 0,
            customerCount: 0,
            productCount:0,
            transaksiCount:0,
            currentDateTime: Date().toLocaleString()
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else{
            window.location = '/login'
        }
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getAdmin = () => {
        let admin = (localStorage.getItem('name'))
        let url = "http://localhost:8080/admin/"

        axios.get(url)
        .then(res => {
            this.setState({
                adminName : admin,
                adminCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    getCustomer = () => {
        let url = "http://localhost:8080/customer/";
    
        axios
          .get(url)
          .then((res) => {
            this.setState({
              customerCount: res.data.count,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

      getProduct = () => {
        let url = "http://localhost:8080/product/";
    
        axios
          .get(url,this.headerConfig())
          .then((res) => {
            this.setState({
              productCount: res.data.count,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

      getTransaksi = () => {
        let url = "http://localhost:8080/transaksi";
    
        axios
          .get(url)
          .then((res) => {
            this.setState({
              transaksiCount: res.data.count,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

    componentDidMount = () => {
        this.getAdmin();
        this.getCustomer();
        this.getProduct();
        this.getTransaksi();
    }

    
    render() {
        return(
            
            <div className="bg">
                <Navbar />
            <div className="container">
                <div className="row ">
                <h1 className="text-light mt-5">Toko Komputer</h1>
                    <div className="col-8">
                        <div className="card mt-5 adminName">
                            <div className="row">
                                <div className="card-body">
                                    <h3 className=" text-center text-dark ml-5 ">Halo, {this.state.adminName}!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card mt-5 adminName">
                            <div className="card-body">
                                <h4 className="text-center text-dark">Love You !</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card mt-5">
                            <div className="row">
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark mt-4"><RiAdminFill size={70}/></h4>
                                    </div>
                                 </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark ">Total Admin</h4>
                                    </div>
                                        <h2 className="text-center text-dark ">{this.state.adminCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mt-5">
                            <div className="row">
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark mt-4"><CgUserlane size={70}/></h4>
                                    </div>
                                 </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark ">Total Customer</h4>
                                    </div>
                                        <h2 className="text-center text-dark ">{this.state.customerCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mt-5">
                            <div className="row">
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark mt-4"><FaProductHunt size={70}/></h4>
                                    </div>
                                 </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark ">Total Product</h4>
                                    </div>
                                        <h2 className="text-center text-dark ">{this.state.productCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mt-5">
                            <div className="row">
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark mt-4"><MdShoppingCart size={70}/></h4>
                                    </div>
                                 </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h4 className="text-center text-dark ">Already Checkout</h4>
                                    </div>
                                        <h2 className="text-center text-dark ">{this.state.transaksiCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}