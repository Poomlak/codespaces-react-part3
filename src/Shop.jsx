import './Shop.css'
import axios from 'axios';
import { useEffect, useState ,useRef} from 'react'


function Item(props){
    return(<div key={props.id}>
    <img src={props.img} width={200} height={200}/><br/>
    id:{props.id}<br/>
    name: {props.name}<br/>
    price:{props.price}<br/>
    <button onClick={()=>props.callback(props)}>addCart</button>
    <button onClick={()=>props.del_callback(props.id)}>delete</button> 
    <button onClick={()=>props.upd_callback(props)}>update</button>
    </div>)
}




export default function Shop(){
    const name_ref=useRef(null);
    const price_ref=useRef(null);
    const img_ref=useRef(null);
    let id;

    const[products,setProducts] = useState([]);
    const URL="https://miniature-space-adventure-w499q96j9px3gx74-5001.app.github.dev";
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

        const productList=products.map(item=><Item {...item} callback={addCart} del_callback={delProduct} upd_callback={updateProduct}/>)
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
        function addProduct(){
            const name=name_ref.current.value;
            const price=price_ref.current.value;
            const img=img_ref.current.value;

            axios.post(URL+'/api/addproduct',{"name":name,"price":price,"img":img})
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error")
        })
        }
        function delProduct(id){
            axios.delete(URL+'/api/delproduct/'+id)
        .then(response=>{
            if(response.data.status=="ok") alert("Delet product successfully")
            setProducts(response.data.products);
        })
        .catch(error=>{
            console.log("error")
        })
        }

        function updateProductForm(item){
            id = item.id;
            name_ref.current.value = item.name;
            price_ref.current.value = item.price;
            img_ref.current.value = item.img;
        }
        function updateProduct(){ 
           const data={
            name:name_ref.current.value,
            price: price_ref.current.value,
            img:img_ref.current.value, 
        }
            axios.put(URL+'/api/updateproduct/'+id,data)
        .then(response=>{
            if(response.data.status=="ok") alert("Update product successfully")
            setProducts(response.data.products);
        })
        .catch(error=>{
            console.log("error")
        })
        }
                    
        

    
        
        return (<>
        name: <input type="text" ref={name_ref}/>
        price:<input type="text" ref={price_ref}/>
        img :<input type="text" ref={img_ref}/>
        <button onClick={addProduct}>add</button>


        <div className='grid-container'>{productList}</div>
        <h1>Cart</h1>
        <button onClick={()=>clearCart()}>Clear All</button>
        
        <ol>{cartList}</ol>
        <h2>Total : {total}Bath</h2>
        </>);
}