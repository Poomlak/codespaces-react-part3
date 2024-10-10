import './Shop.css'
import axios from 'axios';
import { useEffect, useState } from 'react'


function Item(props){
    return(<div key={props.id} onClick={()=>props.callback(props)} >
    <img src={props.img} width={200} height={200}/><br/>
    id:{props.id}<br/>
    name: {props.name}<br/>
    price:{props.price}<br/>
    </div>)
}




export default function Shop(){
    const[products,setProducts] = useState([]);
    const URL="https://miniature-space-adventure-w499q96j9px3gx74-5000.app.github.dev";
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error")
        })
    }
        ,[]);
        const [cart,setCart] =useState([]);
        function addCart(item){
            setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}]);
        }

        const productList=products.map(item=><Item {...item} callback={addCart}/>)
        const cartList = cart.map((item,index)=>(
        <li key={index}> {item.id} {item.name} {item.price}     
        <button onClick={() =>removeCart(index)}>  -</button></li>));
        
        const clearCart=()=>{
            setCart([]);
        }
        function removeCart(index){
            setCart(cart.filter((i,_index) => index != _index));
        }

        

       
        let total =0;
        for(let i=0;i<cart.length;i++){
            total+=cart[i].price;
        }

    
        
        return (<><div className='grid-container'>{productList}</div>
        <h1>Cart</h1>
        <button onClick={()=>clearCart()}>Clear All</button>
        
        <ol>{cartList}</ol>
        <h2>Total : {total}Bath</h2>
        </>);
}