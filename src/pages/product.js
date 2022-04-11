import React from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import ProductList from "../component/productList";

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            products: [],
            token: "",
            action: "",
            name: "",
            price: 0,
            stock: 0,
            image: "",
            uploadFile: true,
            product_id: "",
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getProduct = () => {
        let url = "http://localhost:8080/product/"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({products: response.data.product})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    componentDidMount(){
        this.getProduct()
    }

    render(){
        return (
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">Product List</h3>
                   <div className="row">
                       { this.state.products.map( item => (
                           <ProductList
                           key = {item.product_id}
                           name = {item.name}
                           price = {item.price}
                           stock = {item.stock}
                           image = { "http://localhost:8080/image/product/" + item.image}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropProduct(item)}
                            />
                       )) }
                   </div>
                   <button className="btn btn-success" onClick={() => this.Add()}>
                       Add Product
                   </button>
                </div>
 
                 {/* modal product  */}
                 <div className="modal fade" id="modal_product">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Product</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveProduct(ev)}>
                                     Product Name
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.name}
                                     onChange={ev => this.setState({name: ev.target.value})}
                                     required
                                     />
 
                                    Product Stock
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.stock}
                                     onChange={ev => this.setState({stock: ev.target.value})}
                                     required
                                     />
 
                                    Product Price
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.price}
                                     onChange={ev => this.setState({price: ev.target.value})}
                                     required
                                     />
 
                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Product Image
                                        </button>
                                    ) : (
                                        <div>
                                            Product Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            
                                            required
                                            />
                                        </div>
                                    ) }
 
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }


}